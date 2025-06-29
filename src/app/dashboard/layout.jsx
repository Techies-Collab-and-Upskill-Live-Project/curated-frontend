"use client";

import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/Toast";
import SearchBar from "@/app/dashboard/_components/SearchBar";
import  { React, useEffect, useRef } from "react";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user } = useAuthStore();
  const { addToast } = useToast();
  const hasShownToast = useRef(false);

  // Add routes where you don't want to show the navbar
  const noNavbarRoutes = [
    "/dashboard/change-password",
    // Add more routes here
  ];

  useEffect(() => {
    if (!isLoggedIn && !hasShownToast.current) {
      addToast("You need to be logged in to access this page", "error");
      hasShownToast.current = true;
      setTimeout(() => {
        router.push("/auth/login");
      }, 100);
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
