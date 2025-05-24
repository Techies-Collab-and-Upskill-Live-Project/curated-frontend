"use client";

import Image from "next/image";
import Google from "../../../../public/assets/images/google.png";

export default function SignUp() {
  return (
    <div className="flex items-center flex-col justify-center mt-20">
      <div className="flex flex-col items-center">
        <h6 className="font-[600] text-xl">Sign Up</h6>
        <p className="">with</p>
      </div>

      <button className="flex items-center justify-center gap-2 border px-4 py-2 bg-white text-[#262323] font-bold rounded-[10px] mt-4">
        <Image
          src={Google}
          alt="Google Logo"
          width={20}
          height={20}
          className="w-5 h-5 mr-2"
        />
        Google
      </button>
    </div>
  );
}
