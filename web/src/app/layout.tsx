import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pass Me",
  description: "Airport interview helper webapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
