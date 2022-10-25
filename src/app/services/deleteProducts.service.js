import cookieService from "./cookie.service";
import httpService from "./http.service";

const access = cookieService.getAccesToken();

const fetchDeleteProducts = {
  deleteList: async (id) => {
    const { data } = await httpService.patch(
      `suppliers/delete_products/`,
      [...id],
      { headers: { "X-CSRF-TOKEN": access } }
    );
    console.log(id);
    return data.result;
  },
};

export default fetchDeleteProducts;
