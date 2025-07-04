import { render, screen, waitFor } from "@testing-library/react";
import Notification from "@/app/notifications/page"; // Adjust if your file is in a different place
import * as mockApi from "@/api/mock"; // Mock API
import React from "react";

// Mock reusable components
jest.mock("@/components/Navbar", () => () => <nav data-testid="navbar" />);
jest.mock("@/components/LoadingSpinner", () => () => <div data-testid="spinner">Loading...</div>);

// Sample notification mock (today's date)
const mockNotifications = [
    {
        id: 1,
        type: "New Video",
        message: "React Hooks Crash Course is live!",
        timestamp: new Date().toISOString(), // Today
        image: "https://placehold.co/100x70?text=Video",
        source: "React Academy",
        duration: "10:30",
    },
    ];

    describe("Notification Component", () => {
    beforeEach(() => {
        jest.spyOn(mockApi, "getuserNotifications");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading spinner initially", () => {
        mockApi.getuserNotifications.mockResolvedValue([]);
        render(<Notification />);
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("displays empty state when no notifications exist", async () => {
        mockApi.getuserNotifications.mockResolvedValue([]);
        render(<Notification />);
        await waitFor(() =>
        expect(screen.getByText("No notifications yet!")).toBeInTheDocument()
        );
    });

    it("renders grouped notifications when data is available", async () => {
        mockApi.getuserNotifications.mockResolvedValue(mockNotifications);
        render(<Notification />);
        await waitFor(() =>
        expect(screen.getByText("Today")).toBeInTheDocument()
        );
        expect(
        screen.getByText("React Hooks Crash Course is live!")
        ).toBeInTheDocument();
        expect(screen.getByText("React Academy")).toBeInTheDocument();
        expect(screen.getByText("10:30")).toBeInTheDocument();
    });
});
