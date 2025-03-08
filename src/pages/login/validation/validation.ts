import { isValidEmail, isValidPassword } from "../../../validation/formValidation";

interface FormData {
  email: string;
  password: string;
}

interface ErrorState {
  email?: boolean;
  password?: boolean;
}

export const loginValidation = (
  formData: FormData,
  setError: React.Dispatch<React.SetStateAction<ErrorState>>
) => {
  const newErrorMsg: ErrorState = {};
  newErrorMsg["email"] = !isValidEmail(formData["email"]);
  newErrorMsg["password"] = !isValidPassword(formData["password"]);
  const isValid = Object.values(newErrorMsg).every(error => !error);
  setError((prevErrorMsg) => ({ ...prevErrorMsg, ...newErrorMsg }));
  return isValid
};