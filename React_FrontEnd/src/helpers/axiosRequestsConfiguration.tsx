// Axios
import axios from "axios";

/**
 * Sets the configuration options needed for some Axios HTTP requests to be sent.
 */
const axiosRequestsConfiguration = (): void => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers["Content-Type"] = "application/json";
    axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
};

export { axiosRequestsConfiguration };
