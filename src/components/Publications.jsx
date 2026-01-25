import React from 'react';

const Publications = () => {
    // Separate lists
    const peerReviewed = [
        {
            title: "Fulminant Immune Checkpoint Inhibitor-Induced Myocarditis and Complete Heart Block in Advanced Melanoma: A Case Report",
            citation: "Cureus. 2025 Nov; 17(11).",
            role: "First Author",
            link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12746792/",
            doi: "10.7759/cureus.98075"
        },
        {
            title: "Mixed-Phenotype Acute Leukemia Transforming Into Acute Myelomonocytic Leukemia (AML M4): A Case Report and Therapeutic Challenges",
            citation: "Cureus. 2025 Nov; 17(11).",
            role: "Co-Author",
            link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12697381/",
            doi: "10.7759/cureus.96576"
        },
        {
            title: "A Rare, Potentially Fatal Complication of a Common Virus: Epstein-Barr Virus-Induced Hemophagocytic Lymphohistiocytosis in Adolescence",
            citation: "Cureus. 2025 Oct; 17(10).",
            role: "Co-Author",
            link: "https://assets.cureus.com/uploads/case_report/pdf/406974/20251019-140586-dbpxty.pdf",
            doi: "10.7759/cureus.94918"
        },
        {
            title: "Impact of Intensive Multimodal Treatment on the Outcomes of Patients With Anaplastic Thyroid Cancer",
            citation: "Am J Clin Oncol. 2025 Aug.",
            role: "Co-Author",
            link: "https://link.springer.com/article/10.1007/s00432-025-06403-7",
            doi: "10.1097/COC.0000000000001246"
        },
        {
            title: "Radiation-induced temporal lobe necrosis in a nasopharyngeal cancer patient after external beam radiotherapy: a case report and review of literature",
            citation: "J Med Case Reports. 2025 Jul; 19(1): 200.",
            role: "Co-Author",
            link: "https://link.springer.com/article/10.1186/s13256-025-05368-y",
            doi: "10.1186/s13256-025-05368-y"
        },
        {
            title: "Pancreatic Plasmacytoma Presenting as Acute Pancreatitis: An Unusual Extramedullary Onset of Multiple Myeloma",
            citation: "Cureus. 2025 Jun.",
            role: "Co-Author",
            link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12228989/",
            doi: "10.7759/cureus.85455"
        },
        {
            title: "Impact of Sequencing of Treatment Modalities on Survival in Nonmetastatic Hepatocellular Carcinoma",
            citation: "Am J Clin Oncol. 2025 Jun.",
            role: "Co-Author",
            doi: "10.1097/COC.0000000000001221"
        },
        {
            title: "A Case of Spontaneous Tumor Lysis Syndrome With Acute Kidney Injury and the Timing of Chemotherapy",
            citation: "Cureus. 2025 Jun.",
            role: "Co-Author",
            link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12227330/",
            doi: "10.7759/cureus.85342"
        },
        {
            title: "Atypical distal tracheal fibrous bridge and bronchial stenosis in an adult patient with bronchopulmonary dysplasia",
            citation: "Respirology Case Reports. 2023 Aug.",
            role: "Co-Author",
            link: "https://www.citedrive.com/en/discovery/atypical-distal-tracheal-fibrous-bridge-and-bronchial-stenosis-in-an-adult-patient-with-bronchopulmonary-dysplasia/",
            doi: "10.1002/rcr2.1203"
        }
    ];

    const submitted = [
        {
            title: "Electrophysiologic Phenotype Outperforms LVEF for Mortality Risk Stratification in ICI-Myocarditis",
            citation: "Submitted to JACC: CardioOncology.",
            role: "First Author"
        }
    ];

    const abstracts = [
        {
            title: "Educational Interventions to Improve Cancer Pain Management",
            citation: "JNCCN 2024. (Abstract)",
            role: "Lead Author"
        },
        {
            title: "Fulminant Immune Checkpoint Inhibitor-Induced Myocarditis",
            citation: "JNCCN 2024. (Abstract)",
            role: "Co-Author"
        },
        {
            title: "Implementing an HPV Vaccination Program in a Resident Clinic",
            citation: "JNCCN 2024. (Abstract)",
            role: "Co-Author"
        },
        {
            title: "Rare Case of Metastatic Lung Cancer Presentation",
            citation: "JNCCN 2024. (Abstract)",
            role: "Co-Author"
        },
        {
            title: "Unusual Hepatic Mucinous Cystic Neoplasm Causing Biliary Obstruction",
            citation: "ACG 2023. (Case Report)",
            role: "Co-Author"
        },
        {
            title: "Primary Squamous Cell Carcinoma of the Small Intestine: A Population-Based Study",
            citation: "ASCO GI 2026. (Abstract)",
            role: "Presenting Author"
        },
        {
            title: "Early Peripheral Blood Neutrophil-to-Lymphocyte Ratio (NLR) Dynamics in mUC",
            citation: "GU ASCO 2025. Poster Presentation.",
            role: "Co-Author"
        }
    ];

    const styles = {
        container: {
            padding: '80px 20px',
            background: 'var(--bg-secondary)', // Alternating background
        },
        wrapper: {
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
        },
        sectionHeader: {
            fontSize: '2rem',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
        },
        subHeader: {
            fontSize: '1.5rem',
            color: 'var(--accent-primary)',
            marginTop: '2rem',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '0.5rem',
        },
        pubItem: {
            marginBottom: '1.2rem',
            paddingLeft: '1rem',
            borderLeft: '2px solid transparent',
            transition: 'border-color 0.3s ease',
        },
        pubTitle: {
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontWeight: '600',
            marginBottom: '4px',
            display: 'block',
        },
        citation: {
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
        },
        badge: {
            display: 'inline-block',
            fontSize: '0.75rem',
            padding: '2px 6px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            marginLeft: '8px',
        },
        firstAuthorBadge: {
            borderColor: 'var(--accent-primary)',
            color: 'var(--accent-primary)',
            backgroundColor: 'rgba(100, 255, 218, 0.05)',
        },
        linkBtn: {
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--accent-primary)',
            marginLeft: '10px',
            textDecoration: 'none',
        }
    };

    const renderList = (items) => (
        <div>
            {items.map((item, index) => (
                <div key={index} style={styles.pubItem}>
                    <span style={styles.pubTitle}>
                        {item.title}
                        {item.role === "First Author" ?
                            <span style={{ ...styles.badge, ...styles.firstAuthorBadge }}>First Author</span> :
                            <span style={styles.badge}>{item.role}</span>
                        }
                    </span>
                    <span style={styles.citation}>{item.citation}</span>
                    {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={styles.linkBtn}>
                            [PubMed] ↗
                        </a>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <section id="publications" style={styles.container}>
            <div style={styles.wrapper}>
                <h2 className="section-title">Publications</h2>

                <h3 style={styles.subHeader}>Peer-Reviewed Publications</h3>
                {renderList(peerReviewed)}

                <h3 style={styles.subHeader}>Submitted / Under Review</h3>
                {renderList(submitted)}

                <h3 style={styles.subHeader}>Abstracts & Presentations</h3>
                {renderList(abstracts)}
            </div>
        </section>
    );
};

export default Publications;
