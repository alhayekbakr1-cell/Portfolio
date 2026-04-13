import React from 'react';
import { Activity, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import redFlagImage from '../assets/red_flag_abstract.png';
import atcImage from '../assets/atc_abstract.png';
import ProjectSpotlight from './ProjectSpotlight';

const FeaturedProjects = () => {
    return (
        <section style={{ padding: '60px 0' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>Flagship Investigations</h2>

            <ProjectSpotlight
                title="Red-Flag Score vs. LVEF in ICI-Myocarditis"
                type="Cardio-Oncology"
                icon={Activity}
                color="#e53e3e" // Red accent
                summary="Immune checkpoint inhibitor (ICI)-associated myocarditis has a high fatality rate. This multinational study validated a bedside 'Red-Flag' score (RF) to stratify mortality risk, demonstrating that specific clinical presentations outperform traditional LVEF for prognosis."
                highlights={[]}
                image={redFlagImage}
            />

            <ProjectSpotlight
                title="Immunotherapy in Anaplastic Thyroid Carcinoma"
                type="Endocrine Oncology"
                icon={ShieldCheck}
                color="#3182ce" // Blue accent
                summary="Anaplastic Thyroid Carcinoma (ATC) is historically lethal. This NCDB analysis (2004–2023) quantified the survival benefit of immunotherapy adoption, revealing a significant reduction in mortality risk after correcting for immortal time bias."
                highlights={[]}
                image={atcImage}
            />
        </section>
    );
};

export default FeaturedProjects;
