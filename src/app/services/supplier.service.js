import httpService from "./http.service";


const supplierService = {
    getProductProperties: async (categoryId) => {
        const {data} = await httpService.get(`/suppliers/get_product_properties/?category_id=${categoryId}`);
        return data;
    },
    getProductVariations: async (categoryId) => {
        const {data} = await httpService.get(`suppliers/get_product_variations/?category_id=${categoryId}`);
        return data;
    }
};

export default supplierService;
