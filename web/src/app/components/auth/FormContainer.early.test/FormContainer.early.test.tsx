import React from "react";
import FormContainer from "../FormContainer";

// src/app/components/auth/__tests__/FormContainer.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// src/app/components/auth/__tests__/FormContainer.test.tsx
// Mocking nested components
jest.mock("../../forms/LoginForm", () => () => <div>Login Form</div>);
jest.mock("../../forms/SignupForm", () => () => <div>Signup Form</div>);

// Main describe block for FormContainer tests
describe("FormContainer() FormContainer method", () => {
  // Happy path tests
  describe("Happy Paths", () => {
    it("should render the login form by default", () => {
      // Test to ensure the login form is displayed by default
      render(<FormContainer />);
      expect(screen.getByText("Login Form")).toBeInTheDocument();
    });

    it('should render the signup form when initialType is "signup"', () => {
      // Test to ensure the signup form is displayed when initialType is "signup"
      render(<FormContainer initialType="signup" />);
      expect(screen.getByText("Signup Form")).toBeInTheDocument();
    });

    it("should toggle to signup form when SIGNUP HERE is clicked", () => {
      // Test to ensure the form toggles to signup when SIGNUP HERE is clicked
      render(<FormContainer />);
      fireEvent.click(screen.getByText("SIGNUP HERE"));
      expect(screen.getByText("Signup Form")).toBeInTheDocument();
    });

    it("should toggle to login form when LOGIN HERE is clicked", () => {
      // Test to ensure the form toggles to login when LOGIN HERE is clicked
      render(<FormContainer initialType="signup" />);
      fireEvent.click(screen.getByText("LOGIN HERE"));
      expect(screen.getByText("Login Form")).toBeInTheDocument();
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should handle unexpected initialType gracefully", () => {
      // Test to ensure the component defaults to login form for unexpected initialType
      render(<FormContainer initialType={"unexpected" as "login"} />);
      expect(screen.getByText("Login Form")).toBeInTheDocument();
    });

    it("should render social login buttons", () => {
      // Test to ensure social login buttons are rendered
      render(<FormContainer />);
      expect(screen.getByAltText("Facebook")).toBeInTheDocument();
      expect(screen.getByAltText("Google")).toBeInTheDocument();
      expect(screen.getByAltText("Apple")).toBeInTheDocument();
    });

    it("should not crash when toggleForm is called multiple times", () => {
      // Test to ensure the component does not crash when toggleForm is called multiple times
      render(<FormContainer />);
      fireEvent.click(screen.getByText("SIGNUP HERE"));
      fireEvent.click(screen.getByText("LOGIN HERE"));
      fireEvent.click(screen.getByText("SIGNUP HERE"));
      expect(screen.getByText("Signup Form")).toBeInTheDocument();
    });
  });
});
