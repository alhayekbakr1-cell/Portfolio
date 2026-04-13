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
    
    // Normalization helper to catch title matches across manual/auto boundaries
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Extract existing titles and DOIs from the file for deep matching
    const existingTitles = [...currentCode.matchAll(/title:\s*["'](.+?)["']/g)].map(m => normalize(m[1]));
    const existingDois = [...currentCode.matchAll(/doi:\s*["'](.+?)["']/g)].map(m => m[1]).filter(d => d);
    const existingPmids = [...currentCode.matchAll(/pmid:\s*["'](.+?)["']/g)].map(m => m[1]);

    const newPmids = pmids.filter(pmid => {
        // 1. Direct PMID Check
        if (existingPmids.includes(pmid) || currentCode.includes(`'pub-auto-${pmid}'`)) return false;
        
        return true; 
    });
    
    // We will perform DOI and Title checks AFTER fetching summaries for the "candidate" PMIDs
    // to ensure we have the metadata to compare.
    
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
    let addedCount = 0;
    
    for (const pmid of newPmids) {
        const item = results[pmid];
        if (!item || item.uid !== pmid) continue;
        
        const title = item.title ? item.title.replace(/"/g, '\\"') : '';
        const doiEntry = (item.articleids || []).find(id => id.idtype === 'doi');
        const doi = doiEntry ? doiEntry.value : '';

        // Performance secondary check: Normalized Title & DOI
        if (existingTitles.includes(normalize(title))) {
            console.log(`- Skipping "${title.substring(0, 40)}..." (Title match)`);
            continue;
        }
        if (doi && existingDois.includes(doi)) {
            console.log(`- Skipping ID ${pmid} (DOI match: ${doi})`);
            continue;
        }

        const journal = item.fulljournalname || item.source;
        const journalAbbrev = item.source;
        const authors = (item.authors || []).map(a => `"${a.name}"`).join(', ');
        
        // ... rest of logic for formatting object ...
        // [Existing role and date parsing logic continues here]
        let yourRole = "Co-Author";
        if (item.authors && item.authors.length > 0 && item.authors[0].name.includes("Alhayek B")) {
            yourRole = "First Author";
        }
        
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

        const pmcEntry = (item.articleids || []).find(id => id.idtype === 'pmc');
        const pmc = pmcEntry ? pmcEntry.value : '';
        
        let citationStr = `${journalAbbrev}. ${year} ${month}`;
        if (item.volume) citationStr += `; ${item.volume}`;
        if (item.issue) citationStr += `(${item.issue})`;
        if (item.pages) citationStr += `: ${item.pages}`;
        citationStr += '.';

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
        addedCount++;
    }
    
    if (addedCount === 0) {
        console.log('Deep sync resolved all candidates as existing duplicates. Nothing to add.');
        return;
    }

    console.log(`[4/4] Writing ${addedCount} new structural entries to SRC...`);
    const anchor = "// AUTO-SYNC-ANCHOR-DO-NOT-DELETE";
    const newCode = currentCode.replace(anchor, replacementBlock.trimEnd() + "\n    " + anchor);
    
    fs.writeFileSync(DATA_FILE, newCode, 'utf8');
    console.log('✅ Synchronization Protocol Complete!');
}

syncPublications().catch(err => {
    console.error("❌ Synchronization Failed:", err);
    process.exit(1);
});
