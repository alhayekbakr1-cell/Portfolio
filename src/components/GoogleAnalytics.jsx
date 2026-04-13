import { useEffect } from 'react';
import { GA_CONFIG, isGAConfigured } from '../config/analyticsConfig';

const GoogleAnalytics = () => {
    useEffect(() => {
        if (!isGAConfigured()) {
            console.log('Google Analytics not configured');
            return;
        }

        // Load Google Analytics script
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_CONFIG.measurementId}`;
        document.head.appendChild(script1);

        // Initialize Google Analytics
        const script2 = document.createElement('script');
        script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_CONFIG.measurementId}', {
        page_title: 'Portfolio - Bakr Alhayek, MD',
        send_page_view: true
      });
    `;
        document.head.appendChild(script2);

        // Cleanup
        return () => {
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default GoogleAnalytics;
