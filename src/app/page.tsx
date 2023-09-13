"use client";
import Image from "next/image";
import { useState } from "react";
import signUp, { signUpWithGoogle } from "./(firebase)/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./(firebase)/firebase";
import {  updateProfile } from "firebase/auth";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
  name: z.string().nonempty({ message: "Username required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

interface formValues {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const { formState, register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const [firebaseError, setFirebaseError] = useState<String>('');

  const { errors } = formState;


  const handleForm = async (formValues:FieldValue) => {
    const { name, email, password } = formValues;
    const { result, error} = await signUp(email, password);
    if (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          return setFirebaseError("Email already in use");
        case "auth/invalid-email":
          return setFirebaseError("Invalid email");
        case "auth/weak-password":
          return setFirebaseError("Password must be at least 8 characters");
          default:
          }
          return;
        }
        
        const { user } = result;
        try {
      await updateProfile(user.auth.currentUser, {
        displayName: name,
      });

      await setDoc(doc(db, "/users", user.email), {
        name: user.displayName,
        email: user.email,
        friends: [],
      });

      router.push("/LandingPage");
    } catch (updateError) {
      console.error("Error updating profile:", updateError);
    }

    // else successful
    console.log(result);
    router.push("/LandingPage");
  };
  const handleGoogle = async () => {
    const { result, error } = await signUpWithGoogle();
    if (error) {
      return console.log(error.code);
    }
    console.log("result", result);
    const { email } = result;
    const docRef = 
    doc(db, "/users", email);
    try {
      await setDoc(docRef, {
        name: result.displayName,
        email: email,
        friends: [],
      });
    }
    catch (error) {
      console.log(error) 
    }

    router.push("/LandingPage");
  };

  return (
    <div className="h-screen w-screen flex  flex-col justify-center items-center text-black gap-10">
      <h1 className="text-3xl text-bold text-black">Create Your Account</h1>
      <div className="flex-col bg-white flex justify-center items-center  ">
        <div
          onClick={handleGoogle}
          className=" px-6 py-2 mb-4 text-2xl flex justify-center items-center gap-2 border-2 border-blue-500 rounded-lg shadow-sm "
        >
          Sign up with{" "}
          <Image
            src={"/images/numerosogral.png"}
            width={20}
            height={20}
            alt={"google"}
          ></Image>
        </div>
        <form
          className=" flex justify-center items-center flex-col gap-10 "
          onSubmit={handleSubmit(handleForm)}
        >
          <div className="flex justify-between items-center gap-4">
            <div className="relative">
              <input
                className="py-3 px-4 rounded-md border-2 border-gray-600 basis-1/3 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                placeholder="Username"
                {...register("name")}
              />
              <div className={`absolute text-sm text-red-600 font-semibold `}>
                {errors.name?.message}
              </div>
            </div>
            <div className="relative">
              <input
                type="password"
                className="py-3 px-4 rounded-md border-2 border-gray-600 basis-1/3 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                placeholder="Password"
                {...register("password")}
              />
              <div
                className={`absolute text-red-600 text-sm font-semibold w-fit `}
              >
                {errors.password?.message }
              </div>
            </div>
          </div>
          <div className="Relative">
            <input
              className="py-3 px-4 rounded-md border-2 border-gray-600 basis-1/3 hover:border-blue-500 focus:outline-none focus:border-blue-500 relative  "
              placeholder="E-mail"
              {...register("email")}
            />
            <div
              className={`
              absolute text-sm text-red-600 font-semibold `}
            >
              {errors.email?.message || firebaseError}
            </div>
          </div>
          <input
            className="py-2 px-4 rounded w-fit bg-blue-600 text-white active:scale-90"
            type="submit"
            value="Sign Up"
          />
          <Link className="py-2 px-4 rounded bg-white w-fit" href={"/LogIn"}>
            Already have an account? Log In.
          </Link>
        </form>
      </div>
    </div>
  );
}
