import { isValidEmail, isValidPassword } from "../../../validation/formValidation";

interface FormData {
  username: string;
  password: string;
}

interface ErrorState {
  username?: boolean;
  password?: boolean;
}

export const loginValidation = (
  formData: FormData,
  setError: React.Dispatch<React.SetStateAction<ErrorState>>
) => {
  const newErrorMsg: ErrorState = {};
  newErrorMsg["username"] = !isValidEmail(formData["username"]);
  newErrorMsg["password"] = !isValidPassword(formData["password"]);
  const isValid = Object.values(newErrorMsg).every(error => !error);
  setError((prevErrorMsg) => ({ ...prevErrorMsg, ...newErrorMsg }));
  return isValid
};