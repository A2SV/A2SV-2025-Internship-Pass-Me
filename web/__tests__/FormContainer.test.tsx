

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormContainer from "../src/app/components/auth/FormContainer"
import LoginForm from "../src/app/components/auth/forms/LoginForm"
import SignupForm from "../src/app/components/auth/forms/SignupForm"

// Mock the child forms to avoid implementation details in this test
jest.mock("../src/app/components/auth/forms/LoginForm",()=>({
  __esModule: true,
  default: jest.fn(() => <div data-testid="login-form">Login Form</div>),
}));

jest.mock("../src/app/components/auth/forms/SignupForm",()=>({  
  __esModule: true,
  default: jest.fn(() => <div data-testid="signup-form">Signup Form</div>),
}));

describe("FormContainer Component", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    (LoginForm as jest.Mock).mockClear();
    (SignupForm as jest.Mock).mockClear();
  });

 

  it("renders the 'Or' divider and social login buttons", () => {
    render(<FormContainer />);
    expect(screen.getByText("Or")).toBeInTheDocument();
    expect(screen.getByText(/Log in with Google/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in with Facebook/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in with Apple/i)).toBeInTheDocument();
  });

  it("renders the correct social login text when on the signup form", () => {
    render(<FormContainer initialType="signup" />);
    expect(screen.getByText(/Sign up with Google/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up with Facebook/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up with Apple/i)).toBeInTheDocument();
  });

  it("renders the 'New User?' link when on the login form", () => {
    render(<FormContainer />);
    expect(screen.getByText(/New User?/i)).toBeInTheDocument();
    expect(screen.getByText("SIGNUP HERE")).toBeInTheDocument();
  });

  it("renders the 'Already have an account?' link when on the signup form", () => {
    render(<FormContainer initialType="signup" />);
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
    expect(screen.getByText("LOGIN HERE")).toBeInTheDocument();
  });
});