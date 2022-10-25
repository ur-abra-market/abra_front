import httpService from "./http.service";

const productFetch = {
  getList: async (productData) => {
    const { data } = await httpService.get(
      `products/compilation/?type=${productData.type}&category=${productData.category}`
    );

    return data.result;
  },
};

export default productFetch;
