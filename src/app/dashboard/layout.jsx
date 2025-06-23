"use client";

import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "@/app/dashboard/_components/SearchBar";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuthStore();

  // Add routes where you don't want to show the navbar
  const noNavbarRoutes = [
    "/dashboard/change-password",
    // Add more routes here
  ];

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      {!noNavbarRoutes.includes(pathname) && <Navbar />}
      {!noNavbarRoutes.includes(pathname) && <SearchBar />}
      {children}
    </div>
  );
};

export default DashboardLayout;
