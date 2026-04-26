import fs from 'node:fs/promises';
import path from 'node:path';

const OUTPUT_PATH = path.join(process.cwd(), 'public', 'clinical-updates.json');
const PUBMED_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
const MAX_PER_SPECIALTY = 4;

const SPECIALTIES = [
  {
    name: 'Oncology',
    query: '((oncology OR cancer OR neoplasm) AND (randomized controlled trial OR phase 3 OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Hematology',
    query: '((hematology OR leukemia OR lymphoma OR myeloma OR thrombosis OR anticoagulation) AND (randomized controlled trial OR phase 3 OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Cardiology',
    query: '((cardiology OR heart failure OR myocardial infarction OR atrial fibrillation OR hypertension) AND (randomized controlled trial OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Infectious Disease',
    query: '((infectious disease OR sepsis OR pneumonia OR antimicrobial OR antibiotic OR COVID-19) AND (randomized controlled trial OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Pulmonary/Critical Care',
    query: '((critical care OR intensive care OR ARDS OR COPD OR pulmonary embolism OR mechanical ventilation) AND (randomized controlled trial OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Gastroenterology',
    query: '((gastroenterology OR cirrhosis OR inflammatory bowel disease OR hepatology OR gastrointestinal bleeding) AND (randomized controlled trial OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Nephrology',
    query: '((nephrology OR chronic kidney disease OR acute kidney injury OR dialysis OR glomerulonephritis) AND (randomized controlled trial OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Endocrinology',
    query: '((endocrinology OR diabetes OR obesity OR thyroid OR GLP-1) AND (randomized controlled trial OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Neurology',
    query: '((neurology OR stroke OR seizure OR dementia OR multiple sclerosis) AND (randomized controlled trial OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  },
  {
    name: 'Hospital Medicine',
    query: '((hospital medicine OR inpatient OR readmission OR diagnostic stewardship OR venous thromboembolism prophylaxis) AND (randomized controlled trial OR guideline OR practice guideline OR clinical trial))[Title/Abstract]'
  }
];

const buildDateFilter = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 90);
  const fmt = (date) => date.toISOString().slice(0, 10).replaceAll('-', '/');
  return ` AND (${fmt(start)}:${fmt(end)}[pdat])`;
};

const cleanText = (value = '') => value
  .replace(/<[^>]*>/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/\s+/g, ' ')
  .trim();

const inferType = (title = '', pubTypes = []) => {
  const haystack = `${title} ${pubTypes.join(' ')}`.toLowerCase();
  if (haystack.includes('guideline') || haystack.includes('practice guideline')) return 'Guideline';
  if (haystack.includes('randomized') || haystack.includes('trial') || haystack.includes('phase 3')) return 'Trial';
  if (haystack.includes('systematic review') || haystack.includes('meta-analysis')) return 'Review';
  return 'Hot topic';
};

const fetchPubMedForSpecialty = async (specialty) => {
  const query = `${specialty.query}${buildDateFilter()}`;
  const searchUrl = `${PUBMED_BASE}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${MAX_PER_SPECIALTY}&retmode=json&sort=date`;
  const searchResponse = await fetch(searchUrl, { headers: { 'User-Agent': 'BakrAlhayekClinicalUpdates/1.0' } });
  if (!searchResponse.ok) throw new Error(`${specialty.name} PubMed search failed: ${searchResponse.status}`);
  const searchData = await searchResponse.json();
  const ids = searchData?.esearchresult?.idlist || [];
  if (ids.length === 0) return [];

  const summaryUrl = `${PUBMED_BASE}/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
  const summaryResponse = await fetch(summaryUrl, { headers: { 'User-Agent': 'BakrAlhayekClinicalUpdates/1.0' } });
  if (!summaryResponse.ok) throw new Error(`${specialty.name} PubMed summary failed: ${summaryResponse.status}`);
  const summaryData = await summaryResponse.json();

  return ids.map((id) => {
    const item = summaryData.result[id];
    const authors = Array.isArray(item.authors) ? item.authors.slice(0, 3).map((author) => author.name).join(', ') : '';
    const pubTypes = Array.isArray(item.pubtype) ? item.pubtype : [];
    const date = (item.sortpubdate || item.pubdate || new Date().toISOString()).slice(0, 10);
    return {
      id: `pubmed-${id}`,
      title: cleanText(item.title || 'Untitled clinical update'),
      description: authors ? `Authors: ${authors}${item.authors?.length > 3 ? ' et al.' : ''}` : 'Recent PubMed-indexed clinical update.',
      source: item.fulljournalname || item.source || 'PubMed',
      specialty: specialty.name,
      type: inferType(item.title || '', pubTypes),
      date,
      link: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
    };
  });
};

const main = async () => {
  const settled = await Promise.allSettled(SPECIALTIES.map(fetchPubMedForSpecialty));
  const failedSpecialties = settled
    .map((result, index) => result.status === 'rejected' ? `${SPECIALTIES[index].name}: ${result.reason.message}` : null)
    .filter(Boolean);

  const items = settled
    .flatMap((result) => result.status === 'fulfilled' ? result.value : [])
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const payload = {
    generatedAt: new Date().toISOString(),
    summary: `Recent clinical updates from PubMed across ${SPECIALTIES.length - failedSpecialties.length} specialty groups, refreshed automatically by GitHub Actions.`,
    specialties: SPECIALTIES.map((specialty) => specialty.name),
    failedSpecialties,
    items
  };

  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${items.length} clinical update items to ${OUTPUT_PATH}`);

  if (items.length === 0) {
    throw new Error('No clinical update items were collected.');
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
