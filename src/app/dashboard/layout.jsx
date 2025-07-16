"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { IconCircleDotted } from "@tabler/icons-react";

import Navbar from "@/components/Navbar";
import SearchBar from "@/app/dashboard/_components/SearchBar";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/components/Toast";
import { routes } from "@/config/constant";
import { useSearchStore } from "@/store/useSearchStore";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { addToast } = useToast();

  // Zustand state
  const accessToken = useAuthStore((state) => state.accessToken);
  const shouldRedirect = useAuthStore(
    (state) => state.shouldRedirectAfterLogout
  );
  const clearLogoutFlag = useAuthStore((state) => state.clearLogoutFlag);

  // Derived state
  const isLoggedIn = !!accessToken;

  // Hydration guard and redirect guard
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);

  // Routes where Navbar + SearchBar should be hidden
  const noNavbarRoutes = [
    "/dashboard/change-password",
    // Add more as needed
  ];

  // Hydration state to prevent SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isHydrated || hasRedirected) return;

    if (!isLoggedIn) {
      setHasRedirected(true); // prevent future re-entry

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
  }, [
    isHydrated,
    isLoggedIn,
    shouldRedirect,
    clearLogoutFlag,
    addToast,
    router,
    hasRedirected,
  ]);

  const { setResults, setLoading } = useSearchStore();

  const handleSearch = async (query) => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        q: query,
        max_results: '25',
        educational_focus: 'true',
        content_filter: 'moderate',
        sort_by: 'viewCount',
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/?${params.toString()}`);

      if (!res.ok) {
        alert("Failed to fetch search results. Please try again later.");
      }
      const data = await res.json();
      if (data) {
        router.push(`/results`);
      }
      console.log("Search results:", data);

      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // While checking auth or before hydration
  if (!isHydrated || (!isLoggedIn && !shouldRedirect)) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-4 bg-transparent">
        <span className="text-xl text-black font-semibold">
          Checking authentication...
        </span>
        <IconCircleDotted className="animate-spin text-primary" size={30} />
      </div>
    );
  }

  return (
    <div>
      {!noNavbarRoutes.includes(pathname) && <Navbar />}
      {!noNavbarRoutes.includes(pathname) && <SearchBar onSearch={handleSearch} />}
      {children}
    </div>
  );
};

export default DashboardLayout;
