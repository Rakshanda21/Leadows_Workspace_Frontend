import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NetworkStatus = () => {
    const navigate = useNavigate();
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
            if (navigator.onLine) {
                navigate("/my-apps");
            }
        };

        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);

        // Clean up the event listeners on component unmount
        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    const netWorkErrorPage = () => {
        navigate("/network-error");
    };

    if (!isOnline) {
        netWorkErrorPage();
    }

    return null;
};

export default NetworkStatus;
