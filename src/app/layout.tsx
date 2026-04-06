import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import FeedbackButton from "@/components/FeedbackButton";

export const metadata: Metadata = {
  title: "eCard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Nav />
          {children}
          <FeedbackButton />
        </Providers>
      </body>
    </html>
  );
}
