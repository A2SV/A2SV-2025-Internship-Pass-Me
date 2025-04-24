import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ChatResponse {
  translation: string;
  pronunciation: string;
}

export const manualChatApi = createApi({
  reducerPath: 'manualChatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    sendManualAnswer: builder.mutation<ChatResponse, string>({
      query: (input) => ({
        url: '/manual-answer',
        method: 'POST',
        body: { input },
      }),
    }),
  }),
});

export const { useSendManualAnswerMutation } = manualChatApi;
