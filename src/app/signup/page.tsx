"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

// useRouter is router which is used in next js for navigation

export default function SignupPage() {
  //once the user signed up I need to send him to login page
  //fir that we will be using the router
  const router = useRouter();
  //values that we will require to work with the sign
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  //A couple of more state that will be helpful
  //to change the cutton
  const [buttonDisabled, setButtonDisabled] = useState(false);
  //for loading
  const [loading, setLoading] = useState(false);

  // currently I dont know what this function will do
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-center text-white text-2xl">
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 rounded-lg text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 rounded-lg text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 rounded-lg text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onSignup}
        className="p-1 bg-white text-black rounded-lg my-2"
        type="submit"
      >
        {buttonDisabled ? "No signup" : "Signup"}
      </button>
      <Link href="/login">Visit Login page</Link>
    </div>
  );
}
