import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { registerEmailPassword } from "../firebae/firebase";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await registerEmailPassword(email, password, name);
    navigate("/tracker-page");
  }

  const pwNotMatch =
    password && confirmPw && password !== confirmPw ? true : false;
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="w-[280px] flex flex-col gap-2">
          <h1 className="text-xl">Register at Muscle Department</h1>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-3xl px-1 py-2"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border-2 rounded-3xl px-1 py-2"
            required
          />
          <input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="Confirm password"
            className="border-2 w-full rounded-3xl px-1 py-2"
            required
          />
          {pwNotMatch && (
            <span className=" text-red-300 ">Password does not match</span>
          )}

          <span>What should we call you?</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter you name"
            className="border-2 rounded-3xl px-1 py-2"
            required
          />
          <Button variant="outline" disabled={pwNotMatch} type="submit">
            Register
          </Button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
