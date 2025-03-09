import interceptorInstance from "../../../middleware/interceptors";

export const getUserDetails= async () => {
  try {
    const response = await interceptorInstance.get(`/users/me`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export const getUserTheme= async (host_id:string) => {
  try {
    const response = await interceptorInstance.get(`/hosts/${host_id}/template`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

