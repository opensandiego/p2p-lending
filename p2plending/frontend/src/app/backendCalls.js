/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";
import cookie from "js-cookie";
import * as localStorage from "../components/componentUtils/localStorage";

export const fetchAllLanguages = () => {
    return axios.get("/api/v1/available-languages/");
}

export const fetchAllTitles = () => {
    return axios.get("/api/v1/titles");
}

export const fetchContentTitle = id => {
    return axios.get(`/api/v1/titles/?${queryString.stringify({ id })}`);
};

export const searchContentTitles = search => {
    return axios.get(`/api/v1/titles/?${queryString.stringify({ search })}`);
};

export const getLanguageTitles = language => {
    return axios.get(`/api/v1/titles/?${queryString.stringify({ language })}`);
};

// **** Authenticated API Endpoints ****

// CONSIDER can we store the csrf_token globally somewhere?
// https://docs.djangoproject.com/en/2.2/ref/csrf/#ajax
export const getCSRFToken = () => {
    return axios.get("/api-csrf/").then( ({data}) => {
        return data.csrf_token;
    });
};

export const storeCSRFToken = () => {
    return axios.get("/api-csrf/").then( ({data}) => {
        localStorage.setCSRFToken(data.csrf_token);
    });
};

export const submitLogin = (username,password,csrf) => {
    return axios.post("/api-auth/login/", 
        {username:username,password:password},
        {
            headers: {"X-CSRFToken": csrf}
        }
    );
}

export const fetchUserProfile = ( username ) => {
    console.log("TODO: Return User Data ");
    // return axios.get(`/api/v1/current-profile/?${queryString.stringify({ username })}`);
    // return axios.get(`/api/v1/current-profile/`);
}

export const getUserName = () => {
    console.log("backend call to get User Data")
    const user = {
      username : "test-username"
    }
    return user;
};

export const deleteUserProfile = () => {
    console.log("delete User Profile from database");
};
export const updateUserProfile = (profile) => {
    console.log("backend call update User Data");
    console.log(profile);
};
