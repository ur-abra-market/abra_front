import cookieService from './cookie.service';
import httpService from './http.service';

const access = cookieService.getAccesToken();

const supplierFetch = {
  getProductProperties: async categoryId => {
    const { data } = await httpService.get(`/suppliers/get_product_properties/`, {
      params: {
        category_id: categoryId,
      },
    });

    return data;
  },
  getProductVariations: async categoryId => {
    const { data } = await httpService.get(`suppliers/get_product_variations/`, {
      params: {
        category_id: categoryId,
      },
    });

    return data;
  },
  getSupplierCompanyInfo: async () => {
    const { data } = await httpService.get(`suppliers/company_info/`);

    return data;
  },
  addProduct: async product => {
    const { data } = await httpService.post(`suppliers/add_product/`, product, {
      headers: { 'X-CSRF-TOKEN': access },
    });

    return data;
  },
  uploadImage: async (img, prodId, index) => {
    const formData = new FormData();

    formData.append('file', img);

    const { data } = await httpService.post(`suppliers/upload_image/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': access,
      },
      params: {
        product_id: prodId,
        serial_number: index,
      },
    });

    return data;
  },
};

export default supplierFetch;
