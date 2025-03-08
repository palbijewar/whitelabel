import { isValidEmail, isValidPassword } from "../../../validation/formValidation";

interface FormData {
  email: string;
  password: string;
  name: string;
  mobile: string;
  user_type:string;
}

interface ErrorState {
  email?: boolean;
  password?: boolean;
  name?: boolean;
  mobile?: boolean;
  user_type?:string;
}

export const signUpValidation = (
  formData: FormData,
  setError: React.Dispatch<React.SetStateAction<ErrorState>>
) => {
  const newErrorMsg: ErrorState = {};
  
  newErrorMsg["email"] = !isValidEmail(formData["email"]);
  newErrorMsg["password"] = !isValidPassword(formData["password"]);
  newErrorMsg["name"] = formData["name"].trim().length === 0;
  newErrorMsg["mobile"] = !/^\d{10}$/.test(formData["mobile"]);
  console.log({newErrorMsg});
  
  const isValid = Object.values(newErrorMsg).every(error => !error);
  setError((prevErrorMsg) => ({ ...prevErrorMsg, ...newErrorMsg }));
  
  return isValid;
};