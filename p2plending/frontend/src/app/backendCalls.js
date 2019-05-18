import axios from "axios";
import queryString from "query-string";

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

export const searchContent = search => {
    // return axios.get(`/api/search?${queryString.stringify({ text: search })}`);
    console.log("this is where we would search the backend")
};