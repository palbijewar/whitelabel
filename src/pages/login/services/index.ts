import interceptorInstance from "../../../middleware/interceptors";
import { loginTypes } from "../types/types";

/**
 * Handles user login by sending credentials to the authentication API.
 *
 * @param {loginTypes} formData - The user login details (username and password).
 * @returns {Promise<unknown>} - The response data from the API.
 * @throws {Error} - Throws an error if the login request fails.
 */
export const loginService = async (formData: loginTypes) => {
  try {
    const formBody = new URLSearchParams(); // Convert to URL-encoded format
    formBody.append("username", formData.username);
    formBody.append("password", formData.password);

    const response = await interceptorInstance.post("/users/token", formBody.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response?.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
