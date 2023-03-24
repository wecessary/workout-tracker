import * as EmailValidator from "email-validator";

export function noEmptyStrings(...strings: string[]) {
  return strings.every((string) => string.length > 0);
}

export function areStringsEqual(...strings: string[]) {
  return strings.every((string) => string === strings[0]);
}

export function shouldDisplayEmailWarning(email: string) {
  return email.length > 4 && !EmailValidator.validate(email);
}

export function shouldDisplayPwWarning(password: string, confirmPw: string) {
  if (!noEmptyStrings(password, confirmPw)) {
    return false;
  }
  return !areStringsEqual(password, confirmPw);
}

export function validRegForm(
  email: string,
  password: string,
  confirmPw: string
) {
  const completeForm = noEmptyStrings(email, password, confirmPw);
  const emailValid = EmailValidator.validate(email);
  const passwordsMatch = areStringsEqual(password, confirmPw);
  return completeForm && emailValid && passwordsMatch;
}

export function validLoginForm(email: string, password: string) {
  const completeForm = noEmptyStrings(email, password);
  const emailValid = EmailValidator.validate(email);
  return completeForm && emailValid;
}
