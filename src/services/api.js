import axios from "axios";
// URL base da api: https://api.themoviedb.org/3/
// https://api.themoviedb.org/3/movie/157336?api_key=5a0a706bcc63dc0ebce7b51f06ce384c

const Api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default Api;