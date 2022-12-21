import httpService from './http.service'

export const productFetch = {
  getList: async (productData) => {
    const { data } = await httpService.get(`products/compilation/`, {
      params: {
        type: productData.type,
        category_id: productData.category_id || 0
      }
    })

    return data.result
  },

  getProductById: async ({product_id }) => {
    const { data } = await httpService.post(
        `products/product_card_p1/`, {},{params: {
            product_id,
          }}
    )
    return data.result
  },

    getProductImagesById: async ({product_id }) => {
        const { data } = await httpService.get(
            `products/images/`, {params: {
                    product_id,
                }}
        )
        return data.result
    },

    getPopularProductById: async ({product_id }) => {
        const { data } = await httpService.get(
            `products/popular/`, {params: {
                    product_id
                }}
        )
        return data.result
    }
}

// export default productFetch