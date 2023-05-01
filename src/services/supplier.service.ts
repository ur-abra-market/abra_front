import httpService from './http.service';

const supplierFetch = {
  getProductProperties: async (categoryId: any) => {
    const { data } = await httpService.get(
      `/suppliers/getCategoryProperties/${categoryId}`,
    );

    return data;
  },
  getProductVariations: async (categoryId: any) => {
    const { data } = await httpService.get(
      `suppliers/getCategoryVariations/${categoryId}/`,
    );

    return data;
  },
  getSupplierCompanyInfo: async () => {
    const { data } = await httpService.get(`suppliers/companyInfo/`);

    return data;
  },
  addProduct: async (product: any) => {
    const { data } = await httpService.post(`suppliers/addProduct/`, product);

    return data;
  },
  uploadImage: async (img: any, prodId: any, index: any) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await httpService.post(`suppliers/uploadProductImage/`, formData, {
      params: {
        product_id: prodId,
        order: index,
      },
    });

    return data;
  },
};

export default supplierFetch;
