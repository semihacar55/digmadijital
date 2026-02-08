import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const hash = location.hash.replace("#", "");

            // Retry logic to handle delayed DOM rendering
            const scrollToElement = (attempt = 0) => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                } else if (attempt < 10) {
                    // Retry up to 10 times with increasing delays
                    setTimeout(() => scrollToElement(attempt + 1), 100 + attempt * 50);
                }
            };

            // Initial delay to allow page render
            setTimeout(() => scrollToElement(), 300);
        }
    }, [location]);

    return null;
};

export default ScrollToHashElement;
