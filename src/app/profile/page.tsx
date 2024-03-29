"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <h2 className="bg-green-500 rounded p-2 m-2">
        {data == "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <p className="text-4xl">Profile page</p>
      <hr />
      <button
        className="p-1 bg-white text-black rounded-lg my-2"
        type="submit"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="p-1 bg-white text-black rounded-lg my-2"
        type="submit"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}
