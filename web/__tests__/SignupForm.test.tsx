import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '@/app/components/auth/forms/SignupForm';

// 1. Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() })
}));

// 2. Mock the register mutation
jest.mock('@/app/services/authApi', () => {
  // Create a mock function for the mutation
  const mockRegister = jest.fn(() => ({
    unwrap: jest.fn().mockResolvedValue({ id: 1 })
  }));

  return {
    useRegisterMutation: jest.fn(() => [
      mockRegister,
      { isLoading: false }
    ])
  };
});

// 3. Mock Next-Auth signIn
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(() => Promise.resolve({ error: null }))
}));

describe('SignupForm - Core Functionalities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Form Validation
  it('should validate required fields', async () => {
    render(<SignupForm />);
    
    fireEvent.click(screen.getByText('GET STARTED'));
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  // Test 2: Successful Registration Flow
  
  describe('Successful Registration Flow', () => {
    beforeEach(() => {
      // Proper mock with unwrap()
      (require('@/app/services/authApi').useRegisterMutation as jest.Mock)
        .mockReturnValue([
          jest.fn().mockReturnValue({
            unwrap: jest.fn().mockResolvedValue({ id: 1 })
          }),
          { isLoading: false }
        ]);
        
      // Clear previous calls
      (require('next-auth/react').signIn as jest.Mock).mockClear();
    });
  
    it('should complete registration and sign-in', async () => {
      render(<SignupForm />);
  
      // Fill form
      fireEvent.change(screen.getByPlaceholderText('John Doe'), {
        target: { value: 'Test User' }
      });
      fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText('••••••••'), {
        target: { value: 'password123' }
      });
  
      // Submit
      fireEvent.click(screen.getByText('GET STARTED'));
  
      await waitFor(() => {
        // Verify registration API call
        expect(require('@/app/services/authApi').useRegisterMutation)
          .toHaveBeenCalled();
        
        // Verify sign-in attempt
        expect(require('next-auth/react').signIn).toHaveBeenCalledWith(
          'credentials',
          {
            email: 'test@example.com',
            password: 'password123',
            redirect: false
          }
        );
      });
    });
  });
});