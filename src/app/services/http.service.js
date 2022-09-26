import axios from "axios";


const httpService = axios.create({
    baseURL: "http://" + process.env.REACT_APP_SERVER_URL + "/",
});

export default httpService;