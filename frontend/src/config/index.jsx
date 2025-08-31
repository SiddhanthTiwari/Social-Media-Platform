import axios from "axios";


export const BASE_URL= "https://social-media-platform-tvsx.onrender.com/"

export const clientServer=axios.create({
    baseURL:BASE_URL,
});