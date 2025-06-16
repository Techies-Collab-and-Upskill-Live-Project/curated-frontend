import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Toast from "@/components/Toast/Toast";

test("renders toast message", () => {
  render(<Toast message="Test message" type="success" />);
  expect(screen.getByText(/test message/i)).toBeInTheDocument();
});
