import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Decode URI component to handle special characters (e.g., é -> %C3%A9)
            const id = decodeURIComponent(hash.replace('#', ''));

            // Function to attempt scrolling to the element
            // We retry a few times because dynamic content (like Parcours) 
            // might not be rendered immediately
            const attemptScroll = (retries = 0) => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return true;
                }

                if (retries < 20) { // Try for 2 seconds total (20 * 100ms)
                    setTimeout(() => attemptScroll(retries + 1), 100);
                }
                return false;
            };

            // Start attempting scroll after a small initial delay
            const timer = setTimeout(() => {
                attemptScroll();
            }, 100);

            return () => clearTimeout(timer);
        } else {
            // No hash, scroll to top as normal
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}
