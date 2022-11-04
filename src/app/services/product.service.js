import httpService from "./http.service";

const productFetch = {
  getList: async (productData) => {
    const categoryQueryParam = productData.category ? `&category_id=${productData.category}` : ''

    const { data } = await httpService.get(
      `products/compilation?type=${productData.type}${categoryQueryParam}`
    );

    return data.result;
  },
};

export default productFetch;
