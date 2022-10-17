import httpService from "./http.service";


const categoryFetch = {
    getAllCategories: async () => {
        const {data} = await httpService.get(`/categories/all`);
        return data;
    },
};

export default categoryFetch;
