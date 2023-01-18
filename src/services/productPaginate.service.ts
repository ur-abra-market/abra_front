import httpService from './http.service';

const productPaginateFetch = {
  getProductPaginateList: async props => {
    const url = `products/pagination/?page_num=${props.page_num}&page_size=${props.page_size}&category=${props.category}&bottom_price=${props.price_from}&top_price=${props.price_to}&with_discount=${props.discount}&sort_type=${props.sort_type}&ascending=${props.ascending}`;
    const { data } = await httpService.get(url);

    return data;
  },
};

export default productPaginateFetch;
