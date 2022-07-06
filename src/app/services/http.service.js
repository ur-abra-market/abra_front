import axios from "axios";


const httpService = axios.create({
    baseURL: "http://wbplt-env.eba-qxbp72mz.eu-central-1.elasticbeanstalk.com/",
});

export default httpService;