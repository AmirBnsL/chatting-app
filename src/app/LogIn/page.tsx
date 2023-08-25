"use client";
import React from "react";
import { useState } from "react";
import signIn from "../(firebase)/signin";
import { useRouter } from "next/navigation";

function LogIn() {
  const Router = useRouter();
  const [input, setInput] = useState({ email: "", password: "" });
  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signIn(input.email, input.password);
    if (error) {
      return console.log(error);
    }
    // else successful
    Router.push("/LandingPage");
    console.log(result);
  
  };
  
  return (
    <div className="h-screen w-screen flex justify-center items-center text-black">
      <div className="h-[450px] w-[400px] bg-blue-900 flex justify-center items-center  ">
        <form
          className=" flex justify-center items-center flex-col gap-10 focus:outline-none"
          onSubmit={handleForm}
        >
          <input
            type="email"
            className="py-2 px-4 rounded-md"
            placeholder="email"
            onChange={(e) => {
              setInput({ ...input, email: e.target.value });
            }}
          />
          <input
            type="password"
            className="py-2 px-4 rounded-md"
            placeholder="Password"
            onChange={(e) => {
              setInput({ ...input, password: e.target.value });
            }}
          />
          <input
            className="py-2 px-4 rounded bg-white w-fit "
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
}

export default LogIn;
