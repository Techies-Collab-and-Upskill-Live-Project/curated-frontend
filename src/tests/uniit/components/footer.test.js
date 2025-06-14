import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { FaAppStore, FaGooglePlay } from "react-icons/fa";
import { routes } from "@/config/constant";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByText("CurateD")).toBeInTheDocument();
  });

  it("includes app download buttons", () => {
    render(<Footer />);

    expect(screen.getByText("Google Play")).toBeInTheDocument();
    expect(screen.getByText("App Store")).toBeInTheDocument();
  });

  it("renders copyright year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} All rights Reserved`)
    ).toBeInTheDocument();
  });

  it("has correct link for Home page", () => {
    render(<Footer />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", routes.home); // routes.home should be '/'
  });
});
