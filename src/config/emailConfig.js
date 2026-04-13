// EmailJS Configuration
// Retrieved from user's dashboard

export const EMAIL_CONFIG = {
    serviceId: 'service_jrw2h6t',
    templateId: 'zl26cek',
    publicKey: 'QhfjakPl9vWoe65R8',
};

// To use this:
// 1. Create .env.local file in project root
// 2. Add your EmailJS credentials:
//    VITE_EMAILJS_SERVICE_ID=your_service_id
//    VITE_EMAILJS_TEMPLATE_ID=your_template_id
//    VITE_EMAILJS_PUBLIC_KEY=your_public_key
// 3. Or replace the values above directly (less secure)

export const isEmailConfigured = () => {
    return (
        EMAIL_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
        EMAIL_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
        EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY'
    );
};
