"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import signUp, {signUpWithGoogle } from "./(firebase)/signup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./(firebase)/firebase";
import { updateProfile } from "firebase/auth";
export default function SignUp() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
  });
  const router = useRouter();
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signUp(input.email, input.password);

    if (error) {
      return console.log(error);
    }

    await updateProfile(result.user.auth.currentUser, {
      displayName: input.name,
    }).then(() => {
        setDoc(doc(db, "/users", result.user.email), {
        name: result.user.displayName,
        email: result.user.email,
        friends: [],
      });    
      router.push("/LandingPage");

    });
 
    // else successful
    console.log(result);
/*      router.push("/LandingPage");
 */  };
  const handleGoogle = async () => {
    const {result,error} = await signUpWithGoogle();
    if (error) {
      return console.log(error);
    }
    console.log('result',result);
    await setDoc(doc(db, "/users", result.email), {
      name: result.displayName,
      email: input.email,
      friends: [],
    });
    router.push("/LandingPage");


  }
  return (
    <div className="h-screen w-screen flex  flex-col justify-center items-center text-black gap-10">
      <h1 className="text-3xl text-bold text-black">Create Your Account</h1>
      <div className="flex-col bg-white flex justify-center items-center  ">
        <div onClick={handleGoogle} className=" px-6 py-2 mb-4 text-2xl flex justify-center items-center gap-2 border-2 border-blue-500 rounded-lg shadow-sm ">Sign up with <Image src={'/images/numerosogral.png'} width={20} height={20} alt={'google'}></Image></div>
        <form
          className=" flex justify-center items-center flex-col gap-10 "
          onSubmit={handleForm}
        >
          <div className="flex justify-between items-center gap-4">
            <input
              type="name"
              className="py-3 px-4 rounded-md border-2 border-gray-600 basis-1/3 hover:border-blue-500 focus:outline-none focus:border-blue-500"
              placeholder="Username"
              onChange={(e) => {
                setInput({ ...input, name: e.target.value });
              }}
            />
            <input
              type="password"
              className="py-3 px-4 rounded-md border-2 border-gray-600 basis-1/3 hover:border-blue-500 focus:outline-none focus:border-blue-500"
              placeholder="Password"
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
            />
          </div>
              <input
                type="email"
                className="py-3 px-4 rounded-md border-2 border-gray-600 basis-1/3 hover:border-blue-500 focus:outline-none focus:border-blue-500 relative  " 
                placeholder="E-mail"
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                }}
              />
          <input
            className="py-2 px-4 rounded w-fit bg-blue-600 text-white"
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
