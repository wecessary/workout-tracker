import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthInput } from "../components/ui/AuthInput";
import Button from "../components/ui/Button";
import { AppIcon } from "../components/ui/Icons";
import { registerEmailPassword } from "../lib/firebase";
import * as EmailValidator from "email-validator";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await registerEmailPassword(email, password);
    navigate("/tracker-page");
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (email.length > 4) {
      !EmailValidator.validate(email)
        ? setEmailMsg("Email is not valid")
        : setEmailMsg("");
    }
  }

  function handleEmailOnLeave() {
    if (email.length > 4) {
      !EmailValidator.validate(email)
        ? setEmailMsg("Email is not valid")
        : setEmailMsg("");
    }
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleConfirmPwChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPw(e.target.value);
  }

  const pwNotMatch = !!(password && confirmPw && password !== confirmPw);
  return (
    <>
      <Link to="/">
        <AppIcon className="absolute top-2 left-2 w-20 h-20" />
      </Link>
      <div className="flex justify-center items-center h-screen w-screen bg-mobile-bg md:bg-desktop-bg bg-cover bg-center">
        <form onSubmit={handleSubmit} className="w-[280px] flex flex-col gap-2">
          <AuthInput
            placeholder="enter email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <AuthInput
            placeholder="enter password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <AuthInput
            placeholder="confirm password"
            type="password"
            value={confirmPw}
            onChange={handleConfirmPwChange}
          />
          <p className={`font-bold h-16 w-72 text-red-500 text-xs px-2`}>
            {pwNotMatch ? "Password does not match" : ""}
          </p>
          <Button variant="outline" disabled={pwNotMatch} type="submit">
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
