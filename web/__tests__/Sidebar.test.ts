import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Sidebar from "../src/app/components/sidebar/sidebar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  useGetFlightsQuery,
  useDeleteFlightMutation,
} from "../src/app/services/flightsApi";

import { useGetProfileQuery } from "../src/app/services/profileApi";
// Mock next-auth and next/router
jest.mock("next-auth/react");
jest.mock("next/navigation");

// Mock API hooks
jest.mock("../../services/flightsApi", () => ({
  useGetFlightsQuery: jest.fn(),
  useDeleteFlightMutation: jest.fn(),
  useGetProfileQuery: jest.fn(),
}));

// Mock image imports
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock child components
jest.mock("../../components/modals/ChangePasswordModal", () => ({
  __esModule: true,
  default: () => <div data-testid="change-password-modal" />,
}));

jest.mock("../../components/modals/ChangeUsernameModal", () => ({
  __esModule: true,
  default: () => <div data-testid="change-username-modal" />,
}));

describe("Sidebar Component", () => {
  const mockPush = jest.fn();
  const mockSignOut = signOut as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;

  const mockFlights = [
    {
      id: "1",
      title: "Flight to Paris",
      from_country: "USA",
      to_country: "France",
      date: "2023-12-25",
    },
    {
      id: "2",
      title: "Business Trip",
      from_country: "UK",
      to_country: "Germany",
      date: "2023-11-15",
    },
  ];

  const mockProfile = {
    username: "testuser",
    email: "test@example.com",
    about: "Test user profile",
  };

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    mockSignOut.mockResolvedValue({});

    (useGetFlightsQuery as jest.Mock).mockReturnValue({
      data: mockFlights,
      isLoading: false,
    });

    (useDeleteFlightMutation as jest.Mock).mockReturnValue([
      jest.fn().mockImplementation((id) => Promise.resolve({ data: id })),
      { isLoading: false },
    ]);

    (useGetProfileQuery as jest.Mock).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with flights", () => {
    render(React.createElement(Sidebar));

    expect(screen.getByText("New chat")).toBeInTheDocument();
    expect(screen.getByText("Flight to Paris")).toBeInTheDocument();
    expect(screen.getByText("Business Trip")).toBeInTheDocument();
  });

  it("renders empty state when no flights", () => {
    (useGetFlightsQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(React.createElement(Sidebar));

    expect(screen.getByText("No Flight Details Yet")).toBeInTheDocument();
    expect(
      screen.getByText(/Start by adding your travel info/)
    ).toBeInTheDocument();
  });

  it("shows loading state when flights are loading", () => {
    (useGetFlightsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(React.createElement(Sidebar));

    expect(screen.queryByText("No Flight Details Yet")).not.toBeInTheDocument();
    expect(screen.queryByText("Flight to Paris")).not.toBeInTheDocument();
  });

  it("handles flight selection", () => {
    render(React.createElement(Sidebar));

    fireEvent.click(screen.getByText("Flight to Paris"));
    expect(mockPush).toHaveBeenCalledWith("/dashboard/flight/1");
  });

  it("handles new chat button click", () => {
    render(React.createElement(Sidebar));

    fireEvent.click(screen.getByText("New chat"));
    expect(mockPush).toHaveBeenCalledWith("/dashboard/newflight");
  });

  it("handles flight deletion", async () => {
    const mockDeleteFlight = jest.fn().mockResolvedValue({});
    (useDeleteFlightMutation as jest.Mock).mockReturnValue([
      mockDeleteFlight,
      { isLoading: false },
    ]);

    render(React.createElement(Sidebar));

    const deleteButtons = screen.getAllByLabelText("Delete flight");
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(mockDeleteFlight).toHaveBeenCalledWith("1");
    });
  });

  it("handles logout", async () => {
    render(React.createElement(Sidebar));

    fireEvent.click(screen.getByText("Log out"));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledWith({ redirect: false });
      expect(mockPush).toHaveBeenCalledWith("/home");
    });
  });

  it("toggles account modal", () => {
    render(React.createElement(Sidebar));

    fireEvent.click(screen.getByText("My account"));
    expect(screen.getByText(mockProfile.username)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close"));
    expect(screen.queryByText(mockProfile.username)).not.toBeInTheDocument();
  });

  it("opens change password modal", () => {
    render(React.createElement(Sidebar));

    fireEvent.click(screen.getByText("My account"));
    fireEvent.click(screen.getAllByRole("button", { name: /Edit/i })[0]);

    expect(screen.getByTestId("change-password-modal")).toBeInTheDocument();
  });

  it("opens change username modal", () => {
    render(React.createElement(Sidebar));

    fireEvent.click(screen.getByText("My account"));
    fireEvent.click(screen.getAllByRole("button", { name: /Edit/i })[1]);

    expect(screen.getByTestId("change-username-modal")).toBeInTheDocument();
  });

  it("handles mobile view and sidebar toggle", () => {
    // Set mobile view
    global.innerWidth = 500;
    global.dispatchEvent(new Event("resize"));

    render(React.createElement(Sidebar));

    // Sidebar should be closed initially on mobile
    expect(screen.queryByText("New chat")).not.toBeInTheDocument();

    // Open sidebar
    const toggleButton = screen.getByLabelText("Open sidebar");
    fireEvent.click(toggleButton);

    expect(screen.getByText("New chat")).toBeInTheDocument();

    // Close sidebar
    const closeButton = screen.getByLabelText("Close sidebar");
    fireEvent.click(closeButton);

    expect(screen.queryByText("New chat")).not.toBeInTheDocument();
  });

  it("handles profile loading state", () => {
    (useGetProfileQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(React.createElement(Sidebar));

    fireEvent.click(screen.getByText("My account"));
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles profile error state", () => {
    (useGetProfileQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 401, data: "Unauthorized" },
    });

    render(React.createElement(Sidebar));

    // Error should be logged but component should still render
    expect(screen.getByText("New chat")).toBeInTheDocument();
  });
});
