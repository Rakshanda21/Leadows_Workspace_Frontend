import axios from "axios";
import { VITE_APP_API_URL } from "./axiosInstance";
export const logger = {
    // _active_: import.meta.env.VITE_APP_LOGGER_ACTIVE,

    // work on arguments
    clientLog: function () {
        this._active_ ?? console.log(...arguments);
    },

    serverLog: async function () {
        // this._active_ ?? (await axios.post(`${REACT_APP_SECONDARY1ERP_API_URL}/logger/log`, { messages: arguments }));
        this._active_ ?? (await axios.post(`${VITE_APP_API_URL}/logger/log`, { messages: arguments }));
    },
};
