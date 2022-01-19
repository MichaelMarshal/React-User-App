import axios from "axios";

const API_URL = "http:localhost:8000/api/auth";

const register = (username, email, password) => {
    return axios.post(API_URL+"register", {
        username,
        email,
        password
    });
};

const login = (username, password) => {
    return axios.post(API_URL+"login", {
        username,
        password
    }).then((response) => {
        if(response.data) {
            console.log('user logged in successfully : ', response);
        }
        return response.data;
    })
}

const logout = () => {
    localStorage.clear();
}

export default {
    register,
    login,
    logout
}
