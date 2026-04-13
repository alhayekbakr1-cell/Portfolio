// Google Analytics Configuration
// Get your Measurement ID from: https://analytics.google.com/

export const GA_CONFIG = {
    measurementId: 'G-VWWSZNLY0P',
};

// To use this:
// 1. Create Google Analytics 4 property
// 2. Get your Measurement ID (format: G-XXXXXXXXXX)
// 3. Add to .env.local:
//    VITE_GA_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID
// 4. Or replace the value above directly

export const isGAConfigured = () => {
    return GA_CONFIG.measurementId !== 'G-XXXXXXXXXX';
};

// Custom event tracking
export const trackEvent = (eventName, parameters = {}) => {
    if (typeof window.gtag === 'function' && isGAConfigured()) {
        window.gtag('event', eventName, parameters);
    }
};

// Track page views
export const trackPageView = (path) => {
    if (typeof window.gtag === 'function' && isGAConfigured()) {
        window.gtag('config', GA_CONFIG.measurementId, {
            page_path: path,
        });
    }
};

// Track custom events
export const trackCVDownload = () => {
    trackEvent('cv_download', {
        event_category: 'engagement',
        event_label: 'CV Downloaded',
    });
};

export const trackScholarClick = () => {
    trackEvent('scholar_click', {
        event_category: 'engagement',
        event_label: 'Google Scholar Clicked',
    });
};

export const trackPublicationClick = (publicationTitle) => {
    trackEvent('publication_click', {
        event_category: 'engagement',
        event_label: publicationTitle,
    });
};

export const trackContactFormSubmit = () => {
    trackEvent('contact_form_submit', {
        event_category: 'engagement',
        event_label: 'Contact Form Submitted',
    });
};
