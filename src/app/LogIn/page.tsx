"use client";
import React from "react";
import { useState } from "react";
import signIn from "../(firebase)/signin";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signUpWithGoogle } from "../(firebase)/signup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
function LogIn() {
  const Router = useRouter();
  const [firebaseError, setFirebaseError] = useState('');
  const { formState, register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const handleForm = async (formValues) => {
    const { email, password } = formValues;
    const { result, error } = await signIn(email, password);
    if (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setFirebaseError('User not found');
          break;
        case 'auth/wrong-password':
          setFirebaseError('Wrong password');
          break;
        default:
    }
    return;
  }
    // else successful
    Router.push("/LandingPage");
    console.log(result);
  };
  const handleGoogle = async () => {
    const { result, error } = await signUpWithGoogle();
    if (error) {
      return console.log(error);
    }

    Router.push("/LandingPage");
  };

  return (
    <div className="h-screen w-screen flex  flex-col justify-center items-center text-black gap-10">
      <h1 className="text-3xl text-bold text-black">Log In Your Account</h1>
      <div className="flex-col bg-white flex justify-center items-center  ">
        <div
          onClick={handleGoogle}
          className=" px-6 py-2 mb-4 text-2xl flex justify-center items-center gap-2 border-2 border-blue-500 rounded-lg shadow-sm active:scale-90 transition-all duration-150"
        >
          Log in with{" "}
          <Image
            src={"/images/numerosogral.png"}
            width={20}
            height={20}
            alt={"google"}
          ></Image>
        </div>
        <form
          className=" flex justify-center items-center flex-col gap-12 "
          onSubmit={handleSubmit(handleForm)}
        >
          <div className=" flex justify-center items-center flex-col gap-10">
            <div className="relative">
              <input
                className="py-3 px-4 rounded-md border-2 border-gray-600 basis-1/3 hover:border-blue-500 focus:outline-none focus:border-blue-500 relative  "
                placeholder="E-mail"
                {...register("email")}
              />

              <div className={`absolute text-sm text-red-600 font-semibold `}>
              {errors.email?.message || (firebaseError === 'User not found' && firebaseError)}
              </div>
            </div>
            <div className="relative">
              <div className="">
                <input
                  type="password"
                  className="py-3 px-4 rounded-md border-2 border-gray-600 basis-1/3 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                  placeholder="Password"
                  {...register("password")}
                />
              </div>
              <div className={` absolute text-sm text-red-600 font-semibold `}>
                {errors.password?.message || (firebaseError === 'Wrong password' && firebaseError)}
              </div>
            </div>
          </div>

          <input
            className="py-2 px-4 text-xl rounded w-fit bg-blue-600 hover:bg-blue-500 active:bg-blue-500 active:scale-75 transition-all  text-white"
            type="submit"
            value="Sign Up"
          />
          <Link
            className="py-2 px-4 rounded bg-white w-fit hover:outline-2 outline-black"
            href={"/"}
          >
            Don't have an account? Sign up.
          </Link>
        </form>
      </div>
    </div>
  );
}
export default LogIn;
