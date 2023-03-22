import { FirebaseError } from "firebase/app";

export function getErrorMsgCode(error: unknown) {
  if (error instanceof FirebaseError) {
    return { message: error.message, code: error.code };
  }
  return { message: "Unknown error", code: "unknown" };
}
