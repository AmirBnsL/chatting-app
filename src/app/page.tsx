"use client";
import { FormEvent, useState } from "react";
import signUp from "./(firebase)/singup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc} from "firebase/firestore";
import { db } from "./(firebase)/firebase";
export default function SignUp() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const { result, error } = await signUp(input.email, input.password);

    if (error) {
      return console.log(error);
    }
    await setDoc(doc(db, "/users",input.email),{
      name:input.email,
      email:input.email,
      friends:[]});
    

    // else successful
    console.log(result);
    router.push("/LandingPage");
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
          <Link className="py-2 px-4 rounded bg-white w-fit" href={"/LogIn"}>
            Already have an account? Log In.
          </Link>
        </form>
      </div>
    </div>
  );
}
