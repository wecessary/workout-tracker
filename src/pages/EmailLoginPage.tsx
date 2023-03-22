import { useState } from "react";
import { AppIcon } from "../components/ui/Icons";
import * as EmailValidator from "email-validator";
import { loginEmailPassword } from "../lib/firebase";
import { AuthInput } from "../components/ui/AuthInput";
import { getErrorMsgCode } from "../lib/error";
import { Link } from "react-router-dom";
import { noEmptyStrings } from "../lib/string";

export const EmailLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [error, setError] = useState("");

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (email.length > 4) {
      !EmailValidator.validate(email)
        ? setEmailMsg("Email is not valid")
        : setEmailMsg("");
    }
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleEmailOnLeave() {
    if (email.length > 4) {
      !EmailValidator.validate(email)
        ? setEmailMsg("Email is not valid")
        : setEmailMsg("");
    }
  }

  async function handleOnSumbit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const passwordOrEmailEmpty = noEmptyStrings(email, password);
    const emailInValid = !EmailValidator.validate(email);
    if (passwordOrEmailEmpty || emailInValid) {
      setError("Please enter valid email and password.");
    } else {
      await loginEmailPassword(email, password, (error) =>
        setError(`Login failed. Error code: ${getErrorMsgCode(error).code}`)
      );
    }
  }
  return (
    <>
      <Link to="/">
        <AppIcon className="absolute top-2 left-2 w-20 h-20" />
      </Link>
      <div className="flex justify-center items-center h-screen w-screen bg-mobile-bg md:bg-desktop-bg bg-cover bg-center">
        <form
          onSubmit={handleOnSumbit}
          className="h-[85vh] flex flex-col justify-center items-center gap-8"
        >
          <div className="">
            <AuthInput
              onChange={handleEmailChange}
              onMouseLeave={handleEmailOnLeave}
              placeholder="Enter your email"
              type="text"
              value={email}
            />
            <p
              className={`font-bold w-72 text-red-500 text-xs px-2 mt-2 absolute`}
            >
              {emailMsg}
            </p>
          </div>
          <AuthInput
            onChange={handlePasswordChange}
            onMouseLeave={handleEmailOnLeave}
            placeholder="Enter your password"
            type="password"
            value={password}
          />
          <div>
            <button
              type="submit"
              className="text-gray-300 w-72 py-6 px-8 bg-zinc-800 rounded-xl "
            >
              Continue
            </button>
            <p
              className={`text-red-500 w-72 text-xs px-2 mt-2 absolute font-bold`}
            >
              {error}
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
