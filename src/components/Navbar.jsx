import Link from "next/link";
import { routes } from "../config/constant";

export default function Navbar() {
  return (
    <nav className="flex items-center flex-column justify-between border p-6 shadow-md">
      <Link href={routes.home}>
        <h1 className="md:text-2xl font-bold text-primary md:ml-20">CuratED</h1>
      </Link>
      <div className="flex items-center gap-2">
        <Link
          href={routes.login}
          className="px-4 py-2 border rounded-[10px] md:px-6 md:py-3"
        >
          Login
        </Link>
        <Link
          href={routes.signUp}
          className="border px-4 py-2 bg-primary text-white font-bold rounded-[10px] md:mr-20 md:px-6 md:py-3"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}
