/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";
import cookie from "js-cookie";

const languageSubstitute = [
    {
        name: "English",
        number: 12
    },
    {
        name: "Spanish",
        number: 19,       
    },
    {
        name: "Chinese",
        number: 6       
    },
    {
        name: "Korean",
        number: 5       
    },
    {
        name: "Japanese",
        number: 6       
    },
    {
        name: "Russian",
        number: 5       
    }
]

export const fetchAllLanguages = () => {
    // return axios.get("/api/v1/languages");
    return languageSubstitute;
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


// **** Authenticated API Endpoints ****

// CONSIDER can we store the csrf_token globally somewhere?
// https://docs.djangoproject.com/en/2.2/ref/csrf/#ajax
export const getCSRFToken = () => {
    return axios.get("/api-csrf/").then( ({data}) => {
        return data.csrf_token;
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

export const fetchUserProfile = () => {
    return axios.get("/api/v1/profile/");
}


