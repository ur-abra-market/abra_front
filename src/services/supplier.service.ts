import httpService from './http.service';

const supplierFetch = {
  getProductProperties: async (categoryId: any) => {
    const { data } = await httpService.get(
      `/suppliers/get_product_properties/${categoryId}`,
    );

    return data;
  },
  getProductVariations: async (categoryId: any) => {
    const { data } = await httpService.get(
      `suppliers/get_product_variations/${categoryId}`,
    );

    return data;
  },
  getSupplierCompanyInfo: async () => {
    const { data } = await httpService.get(`suppliers/company_info/`);

    return data;
  },
  addProduct: async (product: any) => {
    const { data } = await httpService.post(`suppliers/add_product/`, product);

    return data;
  },
  uploadImage: async (img: any, prodId: any, index: any) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await httpService.post(`suppliers/upload_image/`, formData, {
      params: {
        product_id: prodId,
        serial_number: index,
      },
    });

    return data;
  },
};

export default supplierFetch;
