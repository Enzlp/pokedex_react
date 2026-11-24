import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

import Navbar from "../components/layout/navbar";
import QueryProvider from "../providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col w-[80%] m-auto py-6">

        <QueryProvider>
          <div className="fixed top-0 left-0 -translate-x-1/4 -translate-y-1/4 -z-10 pointer-events-none">
            <Image
              src="/pokeball_svg.svg"
              alt=""
              width={600}
              height={600}
              className="opacity-5"
              priority
            />
          </div>

          <Navbar />
          {children}
        </QueryProvider>

      </body>
    </html>
  );
}