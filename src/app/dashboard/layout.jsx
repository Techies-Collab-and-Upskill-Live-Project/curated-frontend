"use client";

import Navbar from "@/components/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/Toast";
import SearchBar from "@/app/dashboard/_components/SearchBar";
import { routes } from "@/config/constant";
import { React, useEffect, useState } from "react";
import { IconCircleDotted } from "@tabler/icons-react";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();

  const { isLoggedIn, user } = useAuthStore((state) => !!state.token);
  const justLoggedOut = useAuthStore((state) => state.justLoggedOut);
  const shouldRedirect = useAuthStore(
    (state) => state.shouldRedirectAfterLogout
  );
  const clearLogoutFlag = useAuthStore((state) => state.clearLogoutFlag);

  const [isHydrated, setIsHydrated] = useState(false);

  // Add routes where you don't want to show the navbar
  const noNavbarRoutes = [
    "/dashboard/change-password",
    // Add more routes here
  ];

  useEffect(() => {
    // Hydrate the component after the first render
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isLoggedIn) {
      if (shouldRedirect) {
        setTimeout(() => {
          router.replace(routes.home);
          clearLogoutFlag();
        }, 300);
      } else {
        addToast("You need to be logged in to access this page.", "error");
        setTimeout(() => {
          router.replace(routes.home);
        }, 100);
      }
    }
  }, [isHydrated, isLoggedIn, shouldRedirect]);

  if (!isHydrated || (!isLoggedIn && !shouldRedirect)) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4">
        <span className="text-xl text-black font-semibold">Checking authentication...</span>
        <IconCircleDotted className="animate-spin text-primary" size={30} />
      </div>
    );
  }

  return (
    <div>
      {!noNavbarRoutes.includes(pathname) && <Navbar />}
      {!noNavbarRoutes.includes(pathname) && <SearchBar />}
      {children}
    </div>
  );
};

export default DashboardLayout;
