import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors },
  //   } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || username === "" || password === "") {
      console.log("Please enter information");
      return;
    }
    if (password.length < 6) {
      console.log("Please text min 6 password");
    }

    try {
      const res = await fetch(`/api/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      console.log(await res.json());
      if (res.ok) {
        console.log("Success");
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      <form onSubmit={handleSubmit}>
        <div className="bg-red-300 px-10 py-10 flex flex-col items-center border border-grey-400 rounded-lg  ">
          <h1 className="mb-2">Register</h1>
          <input
            placeHolder="Kullanıcı Adı"
            className="text-center border border-black-500 rounded-md mb-2"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeHolder="E-Mail"
            className="text-center border border-black-500 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeHolder="Şifre"
            className="text-center border border-black-500 rounded-md mt-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-row">
            {" "}
            <button
              type="submit"
              className="border border-black-500 rounded-md mt-3 px-5 py-1 mb-1 mr-2"
            >
              Üye Ol
            </button>
            <Link
              href="/login"
              className="border border-black-500 rounded-md mt-3 px-5 py-1 mb-1"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
