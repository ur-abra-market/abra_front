import httpService from "./http.service";

const productPaginateFetch = {
  getProductPaginateList: async (props) => {
    const { data } = await httpService.get(`products/pagination/?page_num=${props.page_num}&page_size=${props.page_size}&category=${props.category}`);    
    return data;
  },  
};

export default productPaginateFetch;
