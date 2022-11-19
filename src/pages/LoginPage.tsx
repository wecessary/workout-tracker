import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Google } from "../components/Icons";
import { loginEmailPassword } from "../firebae/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await loginEmailPassword(email, password);
    navigate("/tracker");
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-[280px] flex flex-col">
          <h1 className="text-3xl">Muscle Department</h1>
          <p className="opacity-50 ">The all in one workout tracker</p>
          <Button
            variant="outline"
            localStyling="flex items-center px-2"
            disabled={true}
          >
            <Google />
            <span className="ml-2">Continue with Google</span>
          </Button>
          <div className="flex gap-6 items-center">
            <span className="border-t w-[40%] border-slate-400"></span>
            <span>OR</span>
            <span className="border-t w-[40%] border-slate-400"></span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-[280px] gap-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 rounded-3xl py-2 px-2"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="border-2 rounded-3xl py-2 px-2"
            required
          />
          <Button
            type="submit"
            variant="outline"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Login
          </Button>
          <div>
            Don't have an account?
            <Link to="/register" className="ml-2 hover:underline">
              Register
            </Link>
          </div>
          <span className="opacity-50">closed alpha</span>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
