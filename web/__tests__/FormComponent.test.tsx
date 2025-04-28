
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { useSession } from 'next-auth/react';
import { useCreateFlightMutation } from '@/app/services/flightsApi';
import FormComponent from '../src/app/components/formchat/FormComponent';
import flight, { Translations } from '../flight';
import questions from '../question';
import questionsAmharic from '../amharic';
import turkishquestions from '../turkish';

// Mock the necessary modules and hooks
jest.mock('react-hook-form');
jest.mock('react-datepicker', () => ({
  __esModule: true,
  default: jest.fn(() => <input type="date" data-testid="date-picker" />),
}));
jest.mock('next-auth/react');
jest.mock('@/app/services/flightsApi');


global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

// Mock the necessary modules and hooks
jest.mock('react-hook-form');
jest.mock('react-datepicker', () => ({
  __esModule: true,
  default: jest.fn(() => <input type="date" data-testid="date-picker" />),
}));
jest.mock('next-auth/react');
jest.mock('@/app/services/flightsApi');


const mockUseForm = useForm as jest.Mock;
const mockUseSession = useSession as jest.Mock;
const mockUseCreateFlightMutation = useCreateFlightMutation as jest.Mock;

describe('FormComponent', () => {
  const mockHandleEdit = jest.fn();
  const mockHandleThePop = jest.fn();
  const mockSetPopup = jest.fn();
  const mockSetFlightName = jest.fn();
  const mockSetFlightFrom = jest.fn();
  const mockSetFlightTo = jest.fn();
  const mockSetTime = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    

    // Mock the useForm hook's return values
    mockUseForm.mockReturnValue({
      control: {
        register: jest.fn(),
        unregister: jest.fn(),
        setValue: jest.fn(),
      },
      handleSubmit: jest.fn((callback) => callback), // Simulate handleSubmit
      reset: jest.fn(),
      formState: { errors: {} },
    });

    // Mock the useSession hook's return value
    mockUseSession.mockReturnValue({ data: { user: { id: 'test-user-id' } }, status: 'authenticated' });

    // Mock the useCreateFlightMutation hook's return values
    const mockCreateFlight = jest.fn(() => ({
      unwrap: jest.fn().mockResolvedValue({}),
    }));
    mockUseCreateFlightMutation.mockReturnValue([mockCreateFlight, { isLoading: false }]);
  });

  const renderComponent = (language: 'en' | 'am' | 'tr' = 'en', popup = false) => {
    render(
      <FormComponent
        lanaguage={language}
        questions={questions}
        questionsAmharic={questionsAmharic}
        popup={popup}
        setPopup={mockSetPopup}
        handleedit={mockHandleEdit}
        handlethepop={mockHandleThePop}
        flightName=""
        setFlightName={mockSetFlightName}
        flightFrom=""
        setFlightFrom={mockSetFlightFrom}
        flightTo=""
        setFlightTo={mockSetFlightTo}
        time=""
        setTime={mockSetTime}
      />
    );
  };

  it('renders common questions based on the selected language (Amharic)', () => {
    renderComponent('am');
    Object.values(questionsAmharic).forEach((questionText) => {
      expect(screen.getByText(questionText)).toBeInTheDocument();
    });
  });

  it('renders common questions based on the selected language (Turkish)', () => {
    renderComponent('tr');
    Object.values(turkishquestions).forEach((questionText) => {
      expect(screen.getByText(questionText)).toBeInTheDocument();
    });
  });

  it('calls handlethepop when the submit button is clicked', () => {
    renderComponent('en');
    const currentLang = (flight as Translations)['en'];
    const submitButton = screen.getByText(currentLang.submitButton);
    fireEvent.click(submitButton);
    expect(mockHandleThePop).toHaveBeenCalledTimes(1);
  });

  it('renders the confirmation popup with translated text when popup prop is true (English)', () => {
    renderComponent('en', true);
    const currentLang = (flight as Translations)['en'];
    expect(screen.getByText(currentLang.confirmationQuestion)).toBeInTheDocument();
    expect(screen.getByText(currentLang.backToEdit)).toBeInTheDocument();
    expect(screen.getByText(currentLang.confirmYes)).toBeInTheDocument();
  });

  it('renders the confirmation popup with translated text when popup prop is true (Amharic)', () => {
    renderComponent('am', true);
    const currentLang = (flight as Translations)['am'];
    expect(screen.getByText(currentLang.confirmationQuestion)).toBeInTheDocument();
    expect(screen.getByText(currentLang.backToEdit)).toBeInTheDocument();
    expect(screen.getByText(currentLang.confirmYes)).toBeInTheDocument();
  });

  it('renders the confirmation popup with translated text when popup prop is true (Turkish)', () => {
    renderComponent('tr', true);
    const currentLang = (flight as Translations)['tr'];
    expect(screen.getByText(currentLang.confirmationQuestion)).toBeInTheDocument();
    expect(screen.getByText(currentLang.backToEdit)).toBeInTheDocument();
    expect(screen.getByText(currentLang.confirmYes)).toBeInTheDocument();
  });

  it('calls handleedit when the "Back to Edit" button in the popup is clicked', () => {
    renderComponent('en', true);
    const currentLang = (flight as Translations)['en'];
    const backToEditButton = screen.getByText(currentLang.backToEdit);
    fireEvent.click(backToEditButton);
    expect(mockHandleEdit).toHaveBeenCalledTimes(1);
  });
;

  it('resets the form and closes the popup after successful submission', async () => {
    const mockCreateFlight = jest.fn(() => ({
      unwrap: jest.fn().mockResolvedValue({}),
    }));
    mockUseCreateFlightMutation.mockReturnValueOnce([mockCreateFlight, { isLoading: false }]);
    const mockReset = jest.fn();
    mockUseForm.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn((callback) => callback),
      reset: mockReset,
      formState: { errors: {} },
    });
    renderComponent('en', true);
    const currentLang = (flight as Translations)['en'];
    const yesButton = screen.getByText(currentLang.confirmYes);
    fireEvent.click(yesButton);

    await waitFor(() => {
      expect(mockSetPopup).toHaveBeenCalledWith(false);
      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });

  it('does not reset the form or close the popup if createFlight mutation fails', async () => {
    const mockCreateFlight = jest.fn(() => ({
      unwrap: jest.fn().mockRejectedValue(new Error('API error')),
    }));
    mockUseCreateFlightMutation.mockReturnValueOnce([mockCreateFlight, { isLoading: false }]);
    const mockReset = jest.fn();
    mockUseForm.mockReturnValueOnce({
      control: {},
      handleSubmit: jest.fn((callback) => callback),
      reset: mockReset,
      formState: { errors: {} },
    });
    renderComponent('en', true);
    const currentLang = (flight as Translations)['en'];
    const yesButton = screen.getByText(currentLang.confirmYes);
    fireEvent.click(yesButton);

    await waitFor(() => {
      expect(mockSetPopup).not.toHaveBeenCalledWith(false);
      expect(mockReset).not.toHaveBeenCalled();
      // You might want to check for error logging or UI updates if you implement error handling
    });
  });
});



