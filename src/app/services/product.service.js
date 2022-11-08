import httpService from "./http.service";

const productFetch = {
  getList: async (productData) => {

    const { data } = await httpService.get(
      `products/compilation/`,
      {
        params: {
          type: productData.type,
          category_id: productData.category_id || 0,
        },
      }
    );

    return data.result;
  },
};

export default productFetch;
