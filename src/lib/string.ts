import * as EmailValidator from "email-validator";

export function noEmptyStrings(...strings: string[]) {
  return strings.every((string) => string.length > 0);
}

