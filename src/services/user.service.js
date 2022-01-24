import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://orv6bsgo49.execute-api.us-east-1.amazonaws.com/dev/users";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
}

const getUsers = () => {
    return axios.get(API_URL, {headers: authHeader() });
}

export const createUserQuote = (body) => {
    return axios.post(API_URL,body,{headers: authHeader()});
}

export default  {
    getPublicContent,
    getUsers,
    createUserQuote
}
