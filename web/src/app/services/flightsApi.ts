import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface QAItem {
  questionEng: string;
  questionAmh: string;
  answerEng: string;
  answerAmh: string;
}

export interface FlightRequest {
  title: string;
  language: string;
  from_country: string;
  to_country: string;
  date: string;
  user_id: string;
  qa: QAItem[];
}

export interface FlightResponse extends FlightRequest {
  id: string;
}

export const flightsApi = createApi({
  reducerPath: 'flightsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createFlight: builder.mutation<FlightResponse, FlightRequest>({
      query: (flight) => ({
        url: '/flights',
        method: 'POST',
        body: flight,
      }),
    }),
    getFlights: builder.query<FlightResponse[], void>({
      query: () => ({
        url: '/flights',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateFlightMutation,
  useGetFlightsQuery,
} = flightsApi;
