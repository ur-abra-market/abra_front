import httpService from './http.service';

const productPaginateFetch = {
  getProductPaginateList: async (props: any) => {
    const bottom_price = props.price_from > 0 ? `bottom_price=${props.price_to}&` : '';
    const top_price = props.price_to > 0 ? `top_price=${props.price_to}&` : '';
    const category = props.category !== '' ? `category_id=${props.category}&` : '';

    const url = `products/pagination/?page_num=${props.page_num}&page_size=${props.page_size}&${category}with_discount=${props.discount}&sort_type=${props.sort_type}&${bottom_price}${top_price}ascending=${props.ascending}`;
    const body = {
      sizes: props.sizes,
      brands: props.brands,
      materials: props.materials,
    };
    const { data } = await httpService.post(url, body);

    return data;
  },
};

export default productPaginateFetch;

// import httpService from './http.service';
//
// const productPaginateFetch = {
//   getProductPaginateList: async props => {
//     const url = `products/pagination/?page_num=${props.page_num}&page_size=${props.page_size}&category=${props.category}&bottom_price=${props.price_from}&top_price=${props.price_to}&with_discount=${props.discount}&sort_type=${props.sort_type}&ascending=${props.ascending}`;
//     const { data } = await httpService.get(url);
//
//     return data;
//   },
// };
//
// export default productPaginateFetch;
