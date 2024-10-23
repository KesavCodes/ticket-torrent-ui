import { useState } from "react";
import Modal from "./../UI/Modal";
import { useNavigate } from "react-router-dom";

import googleLogo from "../../assets/google.svg";
import { AuthenticateUserLocal } from "../../utils/https";
import { useMutation } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock";
import { useAuthStore } from "../../store/auth.store";

const Auth = () => {
  const [authMode, setAuthMode] = useState<"signUp" | "logIn">("logIn");
  const capitalizedLabel = authMode.charAt(0).toUpperCase() + authMode.slice(1);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: AuthenticateUserLocal,
    onSuccess: (data) => {
      if (authMode === "signUp") {
        setAuthMode("logIn");
      } else {
        console.log(data, '---> from form submit')
        login(data?.user);
        navigate("/");
      }
    },
  });

  console.log(error);

  const labelClass = "text-xl";
  const inputClass = "outline-none p-2 rounded-md";

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userInput = Object.fromEntries(formData) as {
      email: string;
      password: string;
      username?: string;
    };
    mutate({
      ...userInput,
      mode: authMode === "logIn" ? "login" : "register",
    });
  };

  return (
    <Modal onClose={() => navigate("/")}>
      <section className="flex flex-col gap-4 w-4/5 m-auto">
        <header className="p-2">
          <h2 className="text-2xl font-bold text-center">
            {authMode === "logIn" ? "Welcome Back" : "Create your Account"}
          </h2>
        </header>
        <form className="flex flex-col gap-2" onSubmit={submitHandler}>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            className={inputClass}
            required
          />
          {authMode === "signUp" && (
            <>
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                id="username"
                className={inputClass}
                required
              />
            </>
          )}
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            id="password"
            minLength={8}
            className={inputClass}
            required
          />
          {isError && (
            <ErrorBlock
              title="Failed to authenticate"
              message={error.message}
            />
          )}
          <button
            type="submit"
            className="text-xl my-2 bg-gray-300  p-2 rounded-md hover:bg-gray-400 disabled:bg-gray-500"
            disabled={isPending}
          >
            {isPending
              ? authMode === "logIn"
                ? "Logging you in..."
                : "Registering User..."
              : capitalizedLabel}
          </button>
          <div className="flex justify-center items-center gap-4 text-lg mt-2">
            <p>
              {authMode === "logIn" ? "Want to register? " : "Already a user? "}
            </p>
            <button
              onClick={() =>
                setAuthMode((prevAuthMode) =>
                  prevAuthMode === "logIn" ? "signUp" : "logIn"
                )
              }
              type="button"
              className="px-4 py-1 bg-black text-white rounded-md"
            >
              {authMode === "logIn" ? "SignUp" : "LogIn"}
            </button>
          </div>
        </form>
        <span className="self-center font-bold">OR</span>
        <button
          type="button"
          className="flex gap-2 text-xl justify-center items-center w-1/5 self-center bg-black text-white px-4 py-1 rounded-md"
        >
          <img src={googleLogo} alt="google logo" className="w-6" />
          Google
        </button>
      </section>
    </Modal>
  );
};

export default Auth;
