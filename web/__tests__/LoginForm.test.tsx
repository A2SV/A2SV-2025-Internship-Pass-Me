import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../src/app/components/auth/forms/LoginForm'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock the necessary modules

jest.mock('next-auth/react', () => ({
    signIn: jest.fn(() => Promise.resolve({ 
      error: null,
      status: 200,
      ok: true,
      url: '/dashboard'
    })),
  }));
  

  const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
      useRouter: () => ({
          push: mockPush,
        }),

}),
}));

describe('LoginForm', () => {
  const mockSignIn = signIn as jest.Mock;
  const mockRouterPush = useRouter().push as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Successful Login
  it('should submit form and redirect on successful login', async () => {
    render(<LoginForm />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('CONTINUE'));

    await waitFor(() => {
      // Verify signIn was called with correct credentials
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password123',
      });

      // Verify router redirect
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  // Test 2: Failed Login
  it('should display error message on failed login', async () => {
    // Mock a failed login response
    mockSignIn.mockResolvedValueOnce({ error: 'Invalid credentials' });

    render(<LoginForm />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('CONTINUE'));

    await waitFor(() => {
      // Verify error message is displayed
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      expect(screen.getByText('Invalid credentials')).toHaveClass('text-red-600');
      
      // Verify no redirect occurred
      expect(mockRouterPush).not.toHaveBeenCalled();
    });
  });
});