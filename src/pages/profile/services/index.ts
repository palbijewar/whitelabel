import interceptorInstance from "../../../middleware/interceptors";
import { updateProfileTypes } from "../types/types";

/**
 * Handles user sign-up by sending form data to the authentication API.
 *
 * @param {signUpTypes} formData - The user sign-up details.
 * @returns {Promise<unknown>} - The response data from the API.
 * @throws {Error} - Throws an error if the sign-up request fails.
 */
export const profileUpdateDetails = async (userId:string,formData: updateProfileTypes) => {
  const reqBody = JSON.stringify({
    name: formData.name,
    mobile: formData.mobile,
    tag: "premium",
});

  try {
    const response = await interceptorInstance.patch(`/users/${userId}`, reqBody);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

