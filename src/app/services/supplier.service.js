import httpService from "./http.service";
import cookieService from "./cookie.service";
const access = cookieService.getAccesToken();

const supplierService = {
  getProductProperties: async (categoryId) => {
    const { data } = await httpService.get(
      `/suppliers/get_product_properties/?category_id=${categoryId}`
    );
    return data;
  },
  getProductVariations: async (categoryId) => {
    const { data } = await httpService.get(
      `suppliers/get_product_variations/?category_id=${categoryId}`
    );
    return data;
  },
  addProduct: async (product) => {
    const { data } = await httpService.post(`suppliers/add_product`, product, {
      headers: { "X-CSRF-TOKEN": access },
    });
    return data;
  },
};

export default supplierService;
