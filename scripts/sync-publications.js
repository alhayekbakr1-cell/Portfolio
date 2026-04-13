import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../src/utils/publicationData.js');

const AUTHOR_NAME = 'Alhayek B[Author]';
// NCBI politely requests an email in API calls for automated scripts
const ESEARCH_URL = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(AUTHOR_NAME)}&retmode=json&retmax=50&email=noreply@bakralhayek.com&tool=portfolio-sync`;
const ESUMMARY_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&email=noreply@bakralhayek.com&tool=portfolio-sync&id=';

async function syncPublications() {
    console.log('[1/4] Fetching PMIDs for Author from PubMed...');
    
    // Add artificial delay to respect NCBI rate limits (max 3 per sec without API key)
    const searchRes = await fetch(ESEARCH_URL);
    const searchData = await searchRes.json();
    const pmids = searchData?.esearchresult?.idlist || [];
    
    if (pmids.length === 0) {
        console.log('No publications found in public NCBI database.');
        return;
    }
    
    console.log(`[2/4] Retrieved ${pmids.length} PMIDs. Checking against local database...`);
    const currentCode = fs.readFileSync(DATA_FILE, 'utf8');
    
    // Check if the PMID already exists in the file (to avoid duplicates)
    const newPmids = pmids.filter(pmid => !currentCode.includes(`"${pmid}"`) && !currentCode.includes(`'${pmid}'`));
    
    if (newPmids.length === 0) {
        console.log('No new publications to sync. System is strictly up to date.');
        return;
    }
    
    console.log(`[3/4] Found ${newPmids.length} NEW publications! Fetching metadata...`);
    // Wait 1 second before calling esummary to absolutely ensure we don't trip NCBI DDOS protections
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const summaryRes = await fetch(ESUMMARY_URL + newPmids.join(','));
    const summaryData = await summaryRes.json();
    const results = summaryData?.result || {};
    
    let replacementBlock = '';
    
    for (const pmid of newPmids) {
        const item = results[pmid];
        if (!item || item.uid !== pmid) continue;
        
        const title = item.title ? item.title.replace(/"/g, '\\"') : '';
        const journal = item.fulljournalname || item.source;
        const journalAbbrev = item.source;
        const authors = (item.authors || []).map(a => `"${a.name}"`).join(', ');
        
        // Dynamic Role Recognition
        let yourRole = "Co-Author";
        if (item.authors && item.authors.length > 0 && item.authors[0].name.includes("Alhayek B")) {
            yourRole = "First Author";
        }
        
        // Date parsing
        const pubDate = item.pubdate || '';
        const yearMatch = pubDate.match(/20\d{2}/);
        const year = yearMatch ? yearMatch[0] : new Date().getFullYear();
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = 'Jan'; 
        for (const m of months) {
            if (pubDate.includes(m)) {
                month = m;
                break;
            }
        }
        
        // Identifiers
        const doiEntry = (item.articleids || []).find(id => id.idtype === 'doi');
        const doi = doiEntry ? doiEntry.value : '';
        
        const pmcEntry = (item.articleids || []).find(id => id.idtype === 'pmc');
        const pmc = pmcEntry ? pmcEntry.value : '';
        
        // AMA Citation styling compilation
        let citationStr = `${journalAbbrev}. ${year} ${month}`;
        if (item.volume) citationStr += `; ${item.volume}`;
        if (item.issue) citationStr += `(${item.issue})`;
        if (item.pages) citationStr += `: ${item.pages}`;
        citationStr += '.';

        // Formulate the raw Javascript object syntax securely
        replacementBlock += `
    {
        id: 'pub-auto-${pmid}',
        title: "${title}",
        authors: [${authors}],
        journal: "${journal}",
        journalAbbrev: "${journalAbbrev}",
        citation: "${citationStr}",
        year: ${year},
        month: "${month}",
        volume: "${item.volume || ''}",
        issue: "${item.issue || ''}",
        pages: "${item.pages || ''}",
        yourRole: "${yourRole}",
        type: "peer-reviewed",
        category: "General Oncology",
        link: "https://pubmed.ncbi.nlm.nih.gov/${pmid}/",
        doi: "${doi}",
        pmid: "${pmid}",
        pmc: "${pmc}",
        tags: autoTag("${title}", "${journalAbbrev}"),
        featured: false,
    },`;
    }
    
    console.log(`[4/4] Writing ${newPmids.length} new structural entries to SRC...`);
    const anchor = "// AUTO-SYNC-ANCHOR-DO-NOT-DELETE";
    const newCode = currentCode.replace(anchor, replacementBlock.trimEnd() + "\\n    " + anchor);
    
    fs.writeFileSync(DATA_FILE, newCode, 'utf8');
    console.log('✅ Synchronization Protocol Complete!');
}

syncPublications().catch(err => {
    console.error("❌ Synchronization Failed:", err);
    process.exit(1);
});
