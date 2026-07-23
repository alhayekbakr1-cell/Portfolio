import json
import urllib.request

url_search = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=Alhayek+B%5BAuthor%5D&retmode=json"
req = urllib.request.urlopen(url_search)
data_search = json.loads(req.read().decode("utf-8"))
id_list = data_search["esearchresult"]["idlist"]

id_str = ",".join(id_list)
url_summary = f"https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id={id_str}&retmode=json"
req_sum = urllib.request.urlopen(url_summary)
data_sum = json.loads(req_sum.read().decode("utf-8"))["result"]

peer_items_js = []
for pmid in id_list:
    item = data_sum.get(pmid, {})
    title = item.get("title", "").rstrip(".")
    authors = [a.get("name", "") for a in item.get("authors", [])]
    source = item.get("source", "")
    fulljournal = item.get("fulljournalname", "")
    pubdate = item.get("pubdate", "")
    volume = item.get("volume", "")
    issue = item.get("issue", "")
    pages = item.get("pages", "")
    
    year = 2026
    month = "Jan"
    parts = pubdate.split()
    if len(parts) > 0 and parts[0].isdigit():
        year = int(parts[0])
    if len(parts) > 1:
        month = parts[1]
        
    doi = ""
    for aid in item.get("articleids", []):
        if aid.get("idtype") == "doi":
            doi = aid.get("value", "")
            
    is_first = len(authors) > 0 and "Alhayek" in authors[0]
    your_role = "First Author" if is_first else "Co-Author"
    featured = "true" if pmid in ["41473611", "40772694", "40476702", "41990810"] else "false"
    
    citation_str = f"{source}. {pubdate}; {volume}({issue}): {pages}."
    
    entry = f"""    {{
        id: 'pub-pmid-{pmid}',
        title: {json.dumps(title)},
        authors: {json.dumps(authors)},
        journal: {json.dumps(fulljournal or source)},
        journalAbbrev: {json.dumps(source)},
        citation: {json.dumps(citation_str)},
        year: {year},
        month: {json.dumps(month)},
        volume: {json.dumps(volume)},
        issue: {json.dumps(issue)},
        pages: {json.dumps(pages)},
        yourRole: {json.dumps(your_role)},
        type: 'peer-reviewed',
        category: 'General Oncology',
        link: "https://pubmed.ncbi.nlm.nih.gov/{pmid}/",
        doi: {json.dumps(doi)},
        pmid: "{pmid}",
        pmc: "",
        tags: autoTag({json.dumps(title)}, {json.dumps(source)}),
        featured: {featured},
    }}"""
    peer_items_js.append(entry)

file_content = """/**
 * Publication Data - Centralized Source (Verified PubMed API Sync)
 */

const autoTag = (title, journal = '') => {
    const tags = [];
    const text = (title + ' ' + journal).toLowerCase();

    if (text.match(/checkpoint inhibitor|ici|immune|immunotherapy|pembrolizumab|nivolumab/i)) {
        tags.push('Immunotherapy');
    }
    if (text.match(/leukemia|myeloma|lymphoma|hematologic|neutropenia|anc/i)) {
        tags.push('Hematology');
    }
    if (text.match(/pancreatic|hepatocellular|hcc|biliary|colorectal|gi |gastro/i)) {
        tags.push('GI Oncology');
    }
    if (text.match(/myocarditis|cardio|cardiac/i)) {
        tags.push('Cardio-Oncology');
    }
    if (text.match(/case report|rare case/i)) {
        tags.push('Case Report');
    }
    if (text.match(/population|ncdb|seer|database/i)) {
        tags.push('Population Study');
    }
    if (text.match(/radiation|radiotherapy|ebrt/i)) {
        tags.push('Radiation Oncology');
    }
    if (text.match(/thyroid|anaplastic/i)) {
        tags.push('Head & Neck');
    }

    return tags.length > 0 ? tags : ['General Oncology'];
};

// Peer-Reviewed Publications (Verified from PubMed E-utilities API)
export const peerReviewed = [\n""" + ",\n".join(peer_items_js) + """\n];

// Submitted Publications
export const submitted = [
    {
        id: 'sub-001',
        title: "Electrophysiologic Phenotype Outperforms LVEF for Mortality Risk Stratification in ICI-Myocarditis",
        authors: ["Alhayek B", "Collaborators et al"],
        journal: "JACC: CardioOncology",
        journalAbbrev: "JACC CardioOncol",
        citation: "Submitted to JACC: CardioOncology.",
        year: 2025,
        yourRole: "First Author",
        type: "submitted",
        category: "Cardio-Oncology & Immune Toxicities",
        tags: autoTag("Electrophysiologic Phenotype LVEF Mortality ICI-Myocarditis", "JACC CardioOncology"),
        featured: true,
    },
];

// Preprints
export const preprints = [
    {
        id: 'pre-001',
        title: "Impact of peri-operative chemotherapy on outcomes in non-metastatic biliary tract cancer",
        authors: ["Wilson D", "Alhayek B"],
        journal: "Preprint",
        journalAbbrev: "Preprint",
        citation: "Preprint (Aug 2025).",
        year: 2025,
        month: "Aug",
        yourRole: "Co-Author",
        type: "preprint",
        category: "Gastrointestinal Oncology",
        tags: autoTag("biliary tract cancer chemotherapy"),
    },
];

// Abstracts & Presentations (Deduplicated vs Peer-Reviewed)
export const abstracts = [
    {
        id: 'abs-004',
        title: "Rare Case of Metastatic Lung Cancer Presentation",
        authors: ["Thompson N", "Alhayek B"],
        journal: "JNCCN",
        journalAbbrev: "JNCCN",
        citation: "JNCCN 2024. (Abstract)",
        year: 2024,
        yourRole: "Co-Author",
        type: "abstract",
        category: "Thoracic Oncology",
        tags: ['Thoracic Oncology', 'Case Report'],
    },
    {
        id: 'abs-005',
        title: "Unusual Hepatic Mucinous Cystic Neoplasm Causing Biliary Obstruction",
        authors: ["Clark R", "Alhayek B"],
        journal: "ACG",
        journalAbbrev: "ACG",
        citation: "ACG 2023. (Case Report)",
        year: 2023,
        yourRole: "Co-Author",
        type: "abstract",
        category: "Gastrointestinal Oncology",
        tags: autoTag("Hepatic Biliary"),
    },
    {
        id: 'abs-006',
        title: "Primary Squamous Cell Carcinoma of the Small Intestine: A Population-Based Study",
        authors: ["Alhayek B", "Research Team"],
        journal: "ASCO GI",
        journalAbbrev: "ASCO GI",
        citation: "ASCO GI 2026. (Abstract)",
        year: 2026,
        yourRole: "Presenting Author",
        type: "abstract",
        category: "Gastrointestinal Oncology",
        tags: autoTag("Small Intestine population study"),
        featured: true,
    },
    {
        id: 'abs-007',
        title: "Early Peripheral Blood Neutrophil-to-Lymphocyte Ratio (NLR) Dynamics in mUC",
        authors: ["White J", "Alhayek B"],
        journal: "GU ASCO",
        journalAbbrev: "GU ASCO",
        citation: "GU ASCO 2025. Poster Presentation.",
        year: 2025,
        yourRole: "Co-Author",
        type: "abstract",
        category: "Genitourinary Oncology",
        tags: ['GU Oncology', 'Biomarkers'],
    },
];

export const allPublications = [
    ...peerReviewed,
    ...submitted,
    ...preprints,
    ...abstracts,
];

export const getFilterOptions = () => {
    const years = [...new Set(allPublications.map(p => p.year))].sort((a, b) => b - a);
    const types = [...new Set(allPublications.map(p => p.type))];
    const roles = [...new Set(allPublications.map(p => p.yourRole))];
    const allTags = allPublications.flatMap(p => p.tags || []);
    const topics = [...new Set(allTags)].sort();

    return { years, types, roles, topics };
};

export const getPublicationStats = (publications = allPublications) => {
    const currentYear = new Date().getFullYear();

    return {
        total: publications.length,
        firstAuthor: publications.filter(p => p.yourRole === 'First Author' || p.yourRole === 'Lead Author').length,
        peerReviewed: publications.filter(p => p.type === 'peer-reviewed').length,
        thisYear: publications.filter(p => p.year === currentYear).length,
        byYear: publications.reduce((acc, p) => {
            acc[p.year] = (acc[p.year] || 0) + 1;
            return acc;
        }, {}),
        byType: publications.reduce((acc, p) => {
            acc[p.type] = (acc[p.type] || 0) + 1;
            return acc;
        }, {}),
        byTopic: publications.flatMap(p => p.tags || []).reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {}),
    };
};

export default allPublications;
"""

with open("src/utils/publicationData.js", "w") as f:
    f.write(file_content)

print("Successfully wrote sync_pubmed.py and updated publicationData.js!")
