import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../src/app/components/auth/forms/LoginForm'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// 1. Properly mock next-auth with complete response
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(() => Promise.resolve({ 
    error: null,
    status: 200,
    ok: true,
    url: 'http://localhost:3000/dashboard'
  })),
}));

// 2. Create a mock router with tracking
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to default mock implementation
    (signIn as jest.Mock).mockImplementation(() => Promise.resolve({
      error: null,
      status: 200,
      ok: true,
      url: 'http://localhost:3000/dashboard'
    }));
  });

  it('should submit form and redirect on successful login', async () => {
    render(<LoginForm />);

    // Fill form
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' }
    });

    // Submit form
    fireEvent.click(screen.getByText('CONTINUE'));

    await waitFor(() => {
      // Verify signIn was called correctly
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password123'
      });

      // Verify redirect occurred
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });


  it('should display validation errors for empty fields', async () => {
    render(<LoginForm />);
    
    // Submit empty form
    fireEvent.click(screen.getByText('CONTINUE'));
  
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(signIn).not.toHaveBeenCalled();
    });
  });
});