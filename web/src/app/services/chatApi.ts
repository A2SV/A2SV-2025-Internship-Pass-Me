import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';
import type { FetchBaseQueryError, FetchBaseQueryMeta, BaseQueryApi, QueryReturnValue } from '@reduxjs/toolkit/query';

export interface ChatResponse {
  ai_reply: string;
}

export interface SendAudioPayload {
  flightId: string;
  file: File;
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_FLASK_BACKEND_URL,
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
    sendAudioChat: builder.mutation<ChatResponse, SendAudioPayload>({
      async queryFn(arg, _queryApi: BaseQueryApi, _extraOptions, fetchWithBQ) {
        const formData = new FormData();
        formData.append('flight_id', arg.flightId);
        formData.append('audio', arg.file);

        const result =
          (await fetchWithBQ({
            url: '/chat-ai',
            method: 'POST',
            body: formData,
          })) as QueryReturnValue<ChatResponse, FetchBaseQueryError, FetchBaseQueryMeta>;

        return result;
      },
    }),
  }),
});

export const { useSendAudioChatMutation } = chatApi;
