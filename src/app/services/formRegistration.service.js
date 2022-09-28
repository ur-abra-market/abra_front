import httpService from "./http.service";

const formRegistration = {
    suppliers: async ({ path, rest }) => {
        const { data } = await httpService.post(`suppliers/${path}/`, {...rest},
        );
        return data;
    }
};

export default formRegistration;