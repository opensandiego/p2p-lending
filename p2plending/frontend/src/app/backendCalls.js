import axios from "axios";

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
    // return axios.get("/api/languages");
    console.log(languageSubstitute);
    return languageSubstitute;
}