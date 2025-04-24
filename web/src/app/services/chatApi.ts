import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export interface ChatResponse {
  question: {
    main: string;
    translated: string;
  };
  answer: {
    main: string;
    translation: string;
    pronounciation: string;
  };
}

export interface SendAudioPayload {
  flightId: string;
  file: File;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_FLASK_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      // @ts-ignore
      if (session?.accessToken) {
        // @ts-ignore
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }
      return headers;
    },
    responseHandler: (response) => response.json(),
  }),
  endpoints: (builder) => ({
    sendAudioChat: builder.mutation<ChatResponse, SendAudioPayload>({
      query: ({ flightId, file }) => {
        const formData = new FormData();
        formData.append("flight_id", flightId);
        formData.append("audio", file);
        return {
          url: "/chat-ai",
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (raw: {
        status: string;
        originalStatus: number;
        data: string;
        error?: string;
      }) => {
        // raw.data is your JS‐style object literal
        let s = raw.data.trim();

        // 1) Wrap in braces if missing
        if (!s.startsWith("{")) s = "{" + s;
        if (!s.endsWith("}"))   s = s + "}";

        // 2) Quote keys: question, answer, main, translated, translation, pronounciation
        s = s.replace(
          /(\b(?:question|answer|main|translated|translation|pronounciation)\b)(?=\s*:)/g,
          `"$1"`
        );

        // 3) Remove trailing commas before } or ]
        s = s.replace(/,(\s*[}\]])/g, "$1");

        // 4) Parse into your typed shape
        const parsed = JSON.parse(s) as ChatResponse;

        return parsed;
      },
    }),
  }),
});

export const { useSendAudioChatMutation } = chatApi;
