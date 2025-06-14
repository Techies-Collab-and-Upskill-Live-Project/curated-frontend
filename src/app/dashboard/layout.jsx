"use client";

import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
