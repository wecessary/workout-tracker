import { useState } from "react";
import { Link } from "react-router-dom";
import { getErrorMsgCode } from "../../lib/error";
import { loginEmailPassword, registerEmailPassword } from "../../lib/firebase";
import {
  validLoginForm,
  validRegForm,
  shouldDisplayPwWarning,
  shouldDisplayEmailWarning,
} from "../../lib/auth";
import { AuthInput } from "./AuthInput";
import { AppIcon } from "./Icons";

export const AuthForm = ({
  forRegisteration,
}: {
  forRegisteration?: boolean;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleConfirmPwChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPw(e.target.value);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validLoginForm(email, password)) {
      setError("Please enter valid email and password.");
    } else {
      await loginEmailPassword(email, password, (error) =>
        setError(`Login failed. Error code: ${getErrorMsgCode(error).code}`)
      );
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validRegForm(email, password, confirmPw)) {
      setError("Please enter valid details.");
    } else {
      await registerEmailPassword(email, password, (error) =>
        setError(
          `Registration failed. Error code: ${getErrorMsgCode(error).code}`
        )
      );
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-mobile-bg md:bg-desktop-bg bg-cover bg-center">
        <form
          onSubmit={forRegisteration ? handleRegister : handleLogin}
          className="h-[85vh] flex flex-col justify-center items-center gap-8"
        >
          <Link to="/">
            <AppIcon className=" w-52 h-52" />
          </Link>
          <div>
            <AuthInput
              onChange={handleEmailChange}
              placeholder="Enter your email"
              type="text"
              value={email}
            />
            <p
              className={`font-bold w-72 text-red-500 text-xs px-2 mt-2 absolute`}
            >
              {shouldDisplayEmailWarning(email) && "Email is not valid"}
            </p>
          </div>
          <AuthInput
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            type="password"
            value={password}
          />
          {forRegisteration && (
            <div>
              <AuthInput
                placeholder="Confirm password"
                type="password"
                value={confirmPw}
                onChange={handleConfirmPwChange}
              />
              {shouldDisplayPwWarning(password, confirmPw) ? (
                <p
                  className={`absolute mt-2 font-bold w-72 text-red-500 text-xs px-2`}
                >
                  Password does not match
                </p>
              ) : null}
            </div>
          )}
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
