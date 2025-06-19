
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const hiddenPaths = ["/auth/login", "/auth/signup", "/otp", "/verification", "/forgot-password"];

export default function NavbarWrapper() {
    const pathname = usePathname();

    const shouldHideNavbar = hiddenPaths.includes(pathname);

    if (shouldHideNavbar) return null;

    return <Navbar />;
}
