import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace("#", ""));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        } else {
            // Optional: Scroll to top if no hash
            // window.scrollTo(0, 0); 
        }
    }, [location]);

    return null;
};

export default ScrollToHashElement;
