/**
 * Citation Export Utilities
 * Generate citations in multiple formats for publications
 */

/**
 * Generate BibTeX citation
 * @param {Object} publication - Publication object
 * @returns {string} BibTeX formatted citation
 */
export const generateBibTeX = (publication) => {
    const firstAuthor = publication.authors?.[0]?.split(' ').pop() || 'Author';
    const year = publication.year || new Date().getFullYear();
    const key = `${firstAuthor}${year}`;

    let bibtex = `@article{${key},\n`;
    bibtex += `  author = {${publication.authors?.join(' and ') || 'Unknown'}},\n`;
    bibtex += `  title = {${publication.title}},\n`;
    bibtex += `  journal = {${publication.journal}},\n`;
    bibtex += `  year = {${year}},\n`;

    if (publication.volume) bibtex += `  volume = {${publication.volume}},\n`;
    if (publication.issue) bibtex += `  number = {${publication.issue}},\n`;
    if (publication.pages) bibtex += `  pages = {${publication.pages}},\n`;
    if (publication.doi) bibtex += `  doi = {${publication.doi}},\n`;
    if (publication.pmid) bibtex += `  pmid = {${publication.pmid}},\n`;

    bibtex += `}\n`;
    return bibtex;
};

/**
 * Generate RIS citation (for EndNote, Mendeley)
 * @param {Object} publication - Publication object
 * @returns {string} RIS formatted citation
 */
export const generateRIS = (publication) => {
    let ris = 'TY  - JOUR\n';

    publication.authors?.forEach(author => {
        ris += `AU  - ${author}\n`;
    });

    ris += `TI  - ${publication.title}\n`;
    ris += `JO  - ${publication.journal}\n`;
    ris += `PY  - ${publication.year}\n`;

    if (publication.volume) ris += `VL  - ${publication.volume}\n`;
    if (publication.issue) ris += `IS  - ${publication.issue}\n`;
    if (publication.pages) ris += `SP  - ${publication.pages}\n`;
    if (publication.doi) ris += `DO  - ${publication.doi}\n`;
    if (publication.pmid) ris += `PM  - ${publication.pmid}\n`;
    if (publication.link) ris += `UR  - ${publication.link}\n`;

    ris += 'ER  - \n';
    return ris;
};

/**
 * Generate APA citation
 * @param {Object} publication - Publication object
 * @returns {string} APA formatted citation
 */
export const generateAPA = (publication) => {
    const authors = formatAuthorsAPA(publication.authors);
    const year = publication.year;
    const title = publication.title;
    const journal = publication.journal;

    let citation = `${authors} (${year}). ${title}. `;
    citation += `*${journal}*`;

    if (publication.volume) {
        citation += `, *${publication.volume}*`;
        if (publication.issue) citation += `(${publication.issue})`;
    }

    if (publication.pages) citation += `, ${publication.pages}`;
    if (publication.doi) citation += `. https://doi.org/${publication.doi}`;

    return citation;
};

/**
 * Generate Chicago citation
 * @param {Object} publication - Publication object
 * @returns {string} Chicago formatted citation
 */
export const generateChicago = (publication) => {
    const authors = formatAuthorsChicago(publication.authors);
    const year = publication.year;
    const title = publication.title;
    const journal = publication.journal;

    let citation = `${authors}. "${title}." `;
    citation += `*${journal}*`;

    if (publication.volume) {
        citation += ` ${publication.volume}`;
        if (publication.issue) citation += `, no. ${publication.issue}`;
    }

    citation += ` (${year})`;
    if (publication.pages) citation += `: ${publication.pages}`;
    if (publication.doi) citation += `. https://doi.org/${publication.doi}`;

    return citation;
};

/**
 * Generate MLA citation
 * @param {Object} publication - Publication object
 * @returns {string} MLA formatted citation
 */
export const generateMLA = (publication) => {
    const authors = formatAuthorsMLA(publication.authors);
    const title = publication.title;
    const journal = publication.journal;
    const year = publication.year;

    let citation = `${authors}. "${title}." `;
    citation += `*${journal}*`;

    if (publication.volume) {
        citation += `, vol. ${publication.volume}`;
        if (publication.issue) citation += `, no. ${publication.issue}`;
    }

    citation += `, ${year}`;
    if (publication.pages) citation += `, pp. ${publication.pages}`;
    if (publication.doi) citation += `, doi:${publication.doi}`;

    return citation + '.';
};

/**
 * Helper: Format authors for APA
 */
const formatAuthorsAPA = (authors) => {
    if (!authors || authors.length === 0) return 'Author, A.';

    if (authors.length === 1) return formatAuthorAPA(authors[0]);
    if (authors.length === 2) return `${formatAuthorAPA(authors[0])} & ${formatAuthorAPA(authors[1])}`;

    // 3+ authors: First author et al.
    return `${formatAuthorAPA(authors[0])} et al.`;
};

const formatAuthorAPA = (name) => {
    const parts = name.split(' ');
    if (parts.length < 2) return name;

    const lastName = parts[parts.length - 1];
    const initials = parts.slice(0, -1).map(n => n[0] + '.').join(' ');
    return `${lastName}, ${initials}`;
};

/**
 * Helper: Format authors for Chicago
 */
const formatAuthorsChicago = (authors) => {
    if (!authors || authors.length === 0) return 'Author';

    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;

    return `${authors[0]} et al.`;
};

/**
 * Helper: Format authors for MLA
 */
const formatAuthorsMLA = (authors) => {
    if (!authors || authors.length === 0) return 'Author';

    if (authors.length === 1) {
        const parts = authors[0].split(' ');
        if (parts.length < 2) return authors[0];
        const lastName = parts[parts.length - 1];
        const firstName = parts.slice(0, -1).join(' ');
        return `${lastName}, ${firstName}`;
    }

    // Multiple authors: Last, First, et al.
    const parts = authors[0].split(' ');
    const lastName = parts[parts.length - 1];
    const firstName = parts.slice(0, -1).join(' ');
    return `${lastName}, ${firstName}, et al.`;
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
};

/**
 * Download citation as file
 * @param {string} content - Citation content
 * @param {string} filename - File name
 * @param {string} mimeType - MIME type
 */
export const downloadCitation = (content, filename, mimeType = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Export all publications in selected format
 * @param {Array} publications - Array of publications
 * @param {string} format - Citation format
 * @returns {string} Combined citations
 */
export const exportAllCitations = (publications, format = 'bibtex') => {
    const generators = {
        bibtex: generateBibTeX,
        ris: generateRIS,
        apa: generateAPA,
        chicago: generateChicago,
        mla: generateMLA,
    };

    const generator = generators[format];
    if (!generator) return '';

    return publications.map(pub => generator(pub)).join('\n\n');
};
