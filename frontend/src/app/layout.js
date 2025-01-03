import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Inter } from "next/font/google";
import NextUI from "./providers/NextUi";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurant",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        
      >
        <div className="">

        <NextUI>{children}</NextUI>
        </div>
      </body>
    </html>
  );
}
