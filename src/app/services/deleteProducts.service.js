import httpService from "./http.service";

const deleteProducts = {
  deleteList: async ([...id]) => {
    const { data } = await httpService.delete(
      `suppliers/delete_products/${[...id]}`
    );

    return data.result;
  },
};

export default deleteProducts;
