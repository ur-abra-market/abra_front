import httpService from './http.service'

export const productFetch = {
  getList: async (productData) => {
    const { data } = await httpService.get(
      `products/compilation/?type=${productData.type}&category=${productData.category}`
    )

    return data.result
  },

  getProductByIdAndSellerId: async ({product_id, seller_id }) => {
    const { data } = await httpService.get(
        `products/product_card_p1/`, {params: {
            product_id,
            seller_id,
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