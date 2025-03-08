import interceptorInstance from "../../../middleware/interceptors";
import { signUpTypes } from "../types/types";

/**
 * Handles user sign-up by sending form data to the authentication API.
 *
 * @param {signUpTypes} formData - The user sign-up details.
 * @returns {Promise<unknown>} - The response data from the API.
 * @throws {Error} - Throws an error if the sign-up request fails.
 */
export const signUpUser = async (formData: signUpTypes) => {
  console.log({formData});
  
  const reqBody = {
    name: formData?.name,
    email:formData?.email,
    mobile: formData?.mobile,
    user_type:formData?.user_type,
    password: formData?.password,
    tag: "regular"
};
  try {
    const response = await interceptorInstance.post("/users/register", reqBody);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

