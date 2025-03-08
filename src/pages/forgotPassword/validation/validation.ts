import { isValidEmail } from "../../../validation/formValidation";

interface FormData {
  email: string;
}

interface ErrorState {
  email?: boolean;
}

export const forgotPasswordValidation = (
  formData: FormData,
  setError: React.Dispatch<React.SetStateAction<ErrorState>>
) => {
  const newErrorMsg: ErrorState = {};
  newErrorMsg["email"] = !isValidEmail(formData["email"]);
  const isValid = Object.values(newErrorMsg).every(error => !error);
  setError((prevErrorMsg) => ({ ...prevErrorMsg, ...newErrorMsg }));
  return isValid
};