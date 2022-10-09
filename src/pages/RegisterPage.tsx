import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerEmailPassword } from "../firebae/firebase";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await registerEmailPassword(email, password, name);
    navigate("/tracker-page");
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="h-screen flex flex-col justify-center items-center gap-2"
      >
        <h1>Register an account to record your 💪</h1>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="border-2 rounded-md"
          required
        />
        <span>What should we call you?</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter you name"
          className="border-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
