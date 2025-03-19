import axiosInstance from "./axiosInstance";

export const setSession = accessToken => {
    if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
        localStorage.setItem("1", "1");
        axiosInstance.defaults.headers.common.Authorization = `${accessToken}`;
    } else {
        sessionStorage.removeItem("accessToken");
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};
