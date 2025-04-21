import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export interface QAItem {
  question: string,
  answer: string,
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
    prepareHeaders: async (headers) => {
      const session = await getSession();
      // @ts-ignore
      if (session?.accessToken) {
        // @ts-ignore
        headers.set('Authorization', `Bearer ${session.accessToken}`);
      }
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
        method: 'GET',
      }),
    }),
    getFlight: builder.query<FlightResponse, string>({
      query: (id) => `/flights/${id}`,
    }),
  }),
});

export const {
  useCreateFlightMutation,
  useGetFlightsQuery,
  useGetFlightQuery,
} = flightsApi;
