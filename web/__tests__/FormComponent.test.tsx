

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import FormComponent from '../src/app/components/formchat/FormComponent';
// import { useSession } from 'next-auth/react';
// import { useCreateFlightMutation } from '@/app/services/flightsApi';

// // Mock the dependencies
// jest.mock('next-auth/react');
// jest.mock('@/app/services/flightsApi');

// // Mock fetch for Redux Toolkit Query
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({}),
//   })
// ) as jest.Mock;

// const mockQuestions = {
//   1: "What is your name?",
//   2: "What is your purpose of travel?",
// };

// const mockQuestionsAmharic = {
//   1: "ስምህ ማን ነው?",
//   2: "የጉዞዎ ዓላማ ምንድን ነው?",
// };

// describe('FormComponent', () => {
//   const mockProps = {
//     lanaguage: "en",
//     questions: mockQuestions,
//     questionsAmharic: mockQuestionsAmharic,
//     popup: false,
//     setPopup: jest.fn(),
//     handleedit: jest.fn(),
//     handlethepop: jest.fn(),
//     flightName: "",
//     setFlightName: jest.fn(),
//     flightFrom: "",
//     setFlightFrom: jest.fn(),
//     flightTo: "",
//     setFlightTo: jest.fn(),
//     time: "",
//     setTime: jest.fn(),
//   };

//   beforeEach(() => {
//     (useSession as jest.Mock).mockReturnValue({
//       data: { user: { id: '123' } },
//       status: 'authenticated',
//     });
//     (useCreateFlightMutation as jest.Mock).mockReturnValue([
//       jest.fn(),
//       { isLoading: false },
//     ]);
//   });

//   test('renders correctly with English language', () => {
//     render(<FormComponent {...mockProps} />);
    
//     // Check form title
//     expect(screen.getByText('Flight Details')).toBeInTheDocument();
    
//     // Check input placeholders
//     expect(screen.getByPlaceholderText('Your flight name')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Your origin country')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Your destination country')).toBeInTheDocument();
//     expect(screen.getByPlaceholderText('Set your flight time and date')).toBeInTheDocument();
    
//     // Check questions
//     expect(screen.getByText('1 , What is your name?')).toBeInTheDocument();
//     expect(screen.getByText('2 , What is your purpose of travel?')).toBeInTheDocument();
    
//     // Check submit button
//     expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
//   });

//   // You can add more tests for different languages and interactions
// });
















import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, Controller, UseFormHandleSubmit, UseFormReset } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { useSession } from 'next-auth/react';
import { useCreateFlightMutation } from '@/app/services/flightsApi';
import FormComponent from  '../src/app/components/formchat/FormComponent';
import flight from '../flight'

// Mock necessary modules and functions
jest.mock('react-hook-form');
jest.mock('react-datepicker', () => ({
  __esModule: true,
  default: jest.fn(() => <input type="date" data-testid="date-picker" />),
}));
jest.mock('next-auth/react');
jest.mock('@/app/services/flightsApi');
jest.mock('../flight', () => ({
  __esModule: true,
  default: {
    en: {
      flightDetails: 'Flight Details',
      flightName: 'Flight Name',
      flightNamePlaceholder: 'Enter flight name',
      fromCountry: 'From Country',
      fromCountryPlaceholder: 'Enter origin country',
      toCountry: 'To Country',
      toCountryPlaceholder: 'Enter destination country',
      flightDate: 'Flight Date',
      flightDatePlaceholder: 'Select date and time',
      commonQuestions: 'Common Questions',
      submitButton: 'Submit',
      confirmationQuestion: 'Are you sure you want to submit?',
      backToEdit: 'Back to Edit',
      confirmYes: 'Yes, Confirm',
      validation: {
        Required: 'This field is required',
        LettersOnly: 'Please enter letters only.',
      },
    },
    am: {
      flightDetails: 'የበረራ ዝርዝሮች',
      flightName: 'የበረራ ስም',
      flightNamePlaceholder: 'የበረራ ስም ያስገቡ',
      fromCountry: 'ከአገር',
      fromCountryPlaceholder: 'የመነሻ ሀገር ያስገቡ',
      toCountry: 'ወደ አገር',
      toCountryPlaceholder: 'የመድረሻ ሀገር ያስገቡ',
      flightDate: 'የበረራ ቀን',
      flightDatePlaceholder: 'ቀን እና ሰዓት ይምረጡ',
      commonQuestions: 'የተለመዱ ጥያቄዎች',
      submitButton: 'አስገባ',
      confirmationQuestion: 'እርግጠኛ ነዎት ማስገባት ይፈልጋሉ?',
      backToEdit: 'ወደ ማስተካከል ተመለስ',
      confirmYes: 'አዎ, አረጋግጥ',
      validation: {
        Required: 'ይህን መሞላት አስፈላጊ ነው።',
        LettersOnly: 'እባክዎ ፊደሎችን ብቻ ያስገቡ።',
      },
    },
    tr: {
      flightDetails: 'Uçuş Detayları',
      flightName: 'Uçuş Adı',
      flightNamePlaceholder: 'Uçuş adı girin',
      fromCountry: 'Ülkesinden',
      fromCountryPlaceholder: 'Kalkış ülkesini girin',
      toCountry: 'Ülkesine',
      toCountryPlaceholder: 'Varış ülkesini girin',
      flightDate: 'Uçuş Tarihi',
      flightDatePlaceholder: 'Tarih ve saat seçin',
      commonQuestions: 'Genel Sorular',
      submitButton: 'Gönder',
      confirmationQuestion: 'Göndermek istediğinizden emin misiniz?',
      backToEdit: 'Düzenlemeye Geri Dön',
      confirmYes: 'Evet, Onayla',
      validation: {
        Required: 'Bu alan zorunludur.',
        LettersOnly: 'Lütfen sadece harf girin.',
      },
    },
  },
}));

const mockQuestionsEn = ['Question 1', 'Question 2'];
const mockQuestionsAm = ['ጥያቄ ፩', 'ጥያቄ ፪'];
const mockTurkishQuestions = ['Soru 1', 'Soru 2'];

describe('FormComponent', () => {
  let mockHandleEdit: jest.Mock;
  let mockHandleThePop: jest.Mock;
  let mockSetPopup: jest.Mock;
  let mockSetFlightName: jest.Mock;
  let mockSetFlightFrom: jest.Mock;
  let mockSetFlightTo: jest.Mock;
  let mockSetTime: jest.Mock;
  let mockReset: UseFormReset<any>;
  let mockSubmit: jest.Mock;

  beforeEach(() => {
    mockHandleEdit = jest.fn();
    mockHandleThePop = jest.fn();
    mockSetPopup = jest.fn();
    mockSetFlightName = jest.fn();
    mockSetFlightFrom = jest.fn();
    mockSetFlightTo = jest.fn();
    mockSetTime = jest.fn();
    mockReset = jest.fn();
    mockSubmit = jest.fn();

    (useForm as jest.Mock).mockReturnValue({
      control: { register: jest.fn() },
      handleSubmit: ((fn: (data: any) => void) => (data: any) => {
        mockSubmit(data);
        fn(data);
      }) as UseFormHandleSubmit<any>,
      reset: mockReset,
      formState: { errors: {} },
    });
    (useSession as jest.Mock).mockReturnValue({ data: { user: { id: 'test-user' } }, status: 'authenticated' });
    (useCreateFlightMutation as jest.Mock).mockReturnValue([
      jest.fn().mockResolvedValue({ data: { id: 'new-flight-id' } }),
      { isLoading: false },
    ]);
  });

  const renderComponent = (language: string = 'en', popup: boolean = false) => {
    render(
      <FormComponent
        lanaguage={language}
        questions={language === 'en' ? mockQuestionsEn : []}
        questionsAmharic={language === 'am' ? mockQuestionsAm : []}
    
        handleedit={mockHandleEdit}
        handlethepop={mockHandleThePop}
        popup={popup}
        setPopup={mockSetPopup}
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

  it('renders flight details section with correct labels in English', () => {
    renderComponent('en');
    expect(screen.getByText('Flight Details')).toBeInTheDocument();
    expect(screen.getByText('Flight Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter flight name')).toBeInTheDocument();
    expect(screen.getByText('From Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter origin country')).toBeInTheDocument();
    expect(screen.getByText('To Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter destination country')).toBeInTheDocument();
    expect(screen.getByText('Flight Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select date and time')).toBeInTheDocument();
    expect(screen.getByText('Common Questions')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('enter your answer')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('renders flight details section with correct labels in Amharic', () => {
    renderComponent('am');
    expect(screen.getByText('የበረራ ዝርዝሮች')).toBeInTheDocument();
    expect(screen.getByText('የበረራ ስም')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('የበረራ ስም ያስገቡ')).toBeInTheDocument();
    expect(screen.getByText('ከአገር')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('የመነሻ ሀገር ያስገቡ')).toBeInTheDocument();
    expect(screen.getByText('ወደ አገር')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('የመድረሻ ሀገር ያስገቡ')).toBeInTheDocument();
    expect(screen.getByText('የበረራ ቀን')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ቀን እና ሰዓት ይምረጡ')).toBeInTheDocument();
    expect(screen.getByText('የተለመዱ ጥያቄዎች')).toBeInTheDocument();
    expect(screen.getByText('ጥያቄ ፩')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('የአማርኛ ፊደል በመጠቀም ይሞሉ')).toBeInTheDocument();
    expect(screen.getByText('ጥያቄ ፪')).toBeInTheDocument();
    expect(screen.getByText('አስገባ')).toBeInTheDocument();
  });

  it('renders flight details section with correct labels in Turkish', () => {
    renderComponent('tr');
    expect(screen.getByText('Uçuş Detayları')).toBeInTheDocument();
    expect(screen.getByText('Uçuş Adı')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Uçuş adı girin')).toBeInTheDocument();
    expect(screen.getByText('Ülkesinden')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Kalkış ülkesini girin')).toBeInTheDocument();
    expect(screen.getByText('Ülkesine')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Varış ülkesini girin')).toBeInTheDocument();
    expect(screen.getByText('Uçuş Tarihi')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tarih ve saat seçin')).toBeInTheDocument();
    expect(screen.getByText('Genel Sorular')).toBeInTheDocument();
    expect(screen.getByText('Soru 1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Türkçe karakterler kullanın')).toBeInTheDocument();
    expect(screen.getByText('Soru 2')).toBeInTheDocument();
    expect(screen.getByText('Gönder')).toBeInTheDocument();
  });

  it('calls handlethepop when submit button is clicked', () => {
    renderComponent('en');
    fireEvent.click(screen.getByText('Submit'));
    expect(mockHandleThePop).toHaveBeenCalledTimes(1);
  });

  it('renders confirmation popup when popup prop is true', () => {
    renderComponent('en', true);
    expect(screen.getByText('Are you sure you want to submit?')).toBeInTheDocument();
    expect(screen.getByText('Back to Edit')).toBeInTheDocument();
    expect(screen.getByText('Yes, Confirm')).toBeInTheDocument();
  });

  it('calls handleedit and sets popup to false when "Back to Edit" is clicked in popup', () => {
    renderComponent('en', true);
    fireEvent.click(screen.getByText('Back to Edit'));
    expect(mockHandleEdit).toHaveBeenCalledTimes(1);
    expect(mockSetPopup).toHaveBeenCalledWith(false);
  });

  it('calls handleSubmit and createFlight mutation when "Yes, Confirm" is clicked in popup', async () => {
    const mockCreateFlight = jest.fn().mockResolvedValue({ data: { id: 'new-flight-id' } });
    (useCreateFlightMutation as jest.Mock).mockReturnValue([mockCreateFlight, { isLoading: false }]);
    (useForm as jest.Mock).mockReturnValue({
      control: { register: jest.fn(), setValue: jest.fn() },
      handleSubmit: ((fn: (data: any) => void) => (data: any) => fn(data)) as UseFormHandleSubmit<any>,
      reset: mockReset,
      formState: { errors: {} },
    });
    renderComponent('en', true);

    fireEvent.change(screen.getByPlaceholderText('Enter flight name'), { target: { value: 'Test Flight' } });
    fireEvent.change(screen.getByPlaceholderText('Enter origin country'), { target: { value: 'USA' } });
    fireEvent.change(screen.getByPlaceholderText('Enter destination country'), { target: { value: 'UK' } });
    fireEvent.change(screen.getByTestId('date-picker'), { target: { value: '2025-05-01T10:00' } });
    fireEvent.change(screen.getByPlaceholderText('enter your answer'), { target: { value: 'Answer 1' } });
    const answerTwoInput = screen.getAllByPlaceholderText('enter your answer')[1];
    fireEvent.change(answerTwoInput, { target: { value: 'Answer 2' } });

    fireEvent.click(screen.getByText('Yes, Confirm'));

    await waitFor(() => {
      expect(mockCreateFlight).toHaveBeenCalledWith({
        title: 'Test Flight',
        from_country: 'USA',
        to_country: 'UK',
        date: '2025-05-01T10:00:00.000Z',
        user_id: 'test-user',
        language: 'en',
        qa: [{ question: 'Question 1', answer: 'Answer 1' }, { question: 'Question 2', answer: 'Answer 2' }],
      });
      expect(mockSetPopup).toHaveBeenCalledWith(false);
      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });

  it('validates input fields based on language', async () => {
    (useForm as jest.Mock).mockReturnValue({
      control: { register: jest.fn() },
      handleSubmit: ((fn: (data: any) => void) => (data: any) => fn(data)) as UseFormHandleSubmit<any>,
      reset: mockReset,
      formState: { errors: {} },
    });
    renderComponent('en');
    fireEvent.change(screen.getByPlaceholderText('Enter flight name'), { target: { value: 'Test 123' } });
    fireEvent.change(screen.getByPlaceholderText('Enter origin country'), { target: { value: 'US&A' } });
    fireEvent.change(screen.getByPlaceholderText('enter your answer'), { target: { value: 'Answer!' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(mockHandleThePop).toHaveBeenCalledTimes(1); // Still triggers popup

    renderComponent('am');
    fireEvent.change(screen.getByPlaceholderText('የበረራ ስም ያስገቡ'), { target: { value: 'በረራ 123' } });
    fireEvent.change(screen.getByPlaceholderText('የመነሻ ሀገር ያስገቡ'), { target: { value: 'ኢትዮጵያ?' } });
    const amharicAnswerInput = screen.getAllByPlaceholderText('የአማርኛ ፊደል በመጠቀም ይሞሉ')[0];
    fireEvent.change(amharicAnswerInput, { target: { value: 'መልስ*' } });
    fireEvent.click(screen.getByText('አስገባ'));
    expect(mockHandleThePop).toHaveBeenCalledTimes(2);

    renderComponent('tr');
    fireEvent.change(screen.getByPlaceholderText('Uçuş adı girin'), { target: { value: 'Uçuş 123' } });
    fireEvent.change(screen.getByPlaceholderText('Kalkış ülkesini girin'), { target: { value: 'Türkiye.' } });
    const turkishAnswerInput = screen.getAllByPlaceholderText('Türkçe karakterler kullanın')[0];
    fireEvent.change(turkishAnswerInput, { target: { value: 'Cevap+' } });
    fireEvent.click(screen.getByText('Gönder'));
    expect(mockHandleThePop).toHaveBeenCalledTimes(3);
  });
});

