import { isValidEmail, isValidPassword } from "../../../validation/formValidation";

interface FormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

interface ErrorState {
  email?: boolean;
  password?: boolean;
  name?: boolean;
  phoneNumber?: boolean;
}

export const signUpValidation = (
  formData: FormData,
  setError: React.Dispatch<React.SetStateAction<ErrorState>>
) => {
  const newErrorMsg: ErrorState = {};
  
  newErrorMsg["email"] = !isValidEmail(formData["email"]);
  newErrorMsg["password"] = !isValidPassword(formData["password"]);
  newErrorMsg["name"] = formData["name"].trim().length === 0;
  newErrorMsg["phoneNumber"] = !/^\d{10}$/.test(formData["phoneNumber"]);
  
  const isValid = Object.values(newErrorMsg).every(error => !error);
  setError((prevErrorMsg) => ({ ...prevErrorMsg, ...newErrorMsg }));
  
  return isValid;
};