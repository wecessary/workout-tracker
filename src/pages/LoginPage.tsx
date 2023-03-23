import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button, { AuthButton, AuthRouterLink } from "../components/ui/Button";
import { AppIcon, Google, Mail, Pencil } from "../components/ui/Icons";
import { getErrorMsgCode } from "../lib/error";
import { auth, loginEmailPassword, provider } from "../lib/firebase";

const LoginPage = () => {
  const [error, setError] = useState("");
  async function handleGoogle() {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setError(
        `Cannot login with Google. Error code: ${
          getErrorMsgCode(error).code
        }. Please login with email.`
      );
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-mobile-bg md:bg-desktop-bg bg-cover bg-center">
        <div className="min-h-[85vh] flex flex-col justify-center items-center gap-8">
          <Link to="/">
            <AppIcon className=" w-40 h-40" />
          </Link>
          <AuthButton
            logo={<Google />}
            text="Continue with Google"
            callback={handleGoogle}
          />
          <div className="h-1 w-72 bg-gray-300" />
          <AuthRouterLink
            logo={<Mail className="stroke-gray-300" />}
            text="Login with email"
            to="/login-email"
          />
          <AuthRouterLink
            logo={<Pencil className="stroke-gray-300" />}
            text="Register"
            to="/register"
          />
          <div className="flex justify-center">
            <div className="px-2 text-justify w-72 ">
              <p className="text-gray-300 text-sm">
                We value your privacy and only use your workout data to help you
                track your progress. Your data is secure and never shared with
                any third parties.
              </p>
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
