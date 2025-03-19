import axios from "axios";
import { VITE_APP_HTTP_PROTOCOL, VITE_APP_ORGANIZATION_BACKEND_PORT } from "../config";

export let ORGID = "";
export let VITE_APP_API_URL = "";
export let VITE_APP_ORGANIZATION_NAME = "";
export let VITE_APP_ORGANIZATION_LOGO_URL = "";
export let VITE_APP_FRONTEND_URL = "";

export let domain = window.location.hostname;

const response = await axios.get(`${VITE_APP_HTTP_PROTOCOL}api.${domain}:${VITE_APP_ORGANIZATION_BACKEND_PORT}/organization/env-variables`, {
    params: { domain },
});

ORGID = response.data.orgId;
VITE_APP_API_URL = response.data.organizationAPIURL;
VITE_APP_FRONTEND_URL = response.data.organizationFrontendURL;
VITE_APP_ORGANIZATION_NAME = response.data.organizationName;
VITE_APP_ORGANIZATION_LOGO_URL = response.data.organizationLogo;

const axiosInstance = axios.create({
    baseURL: VITE_APP_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error || "Something went wrong"),
);

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
