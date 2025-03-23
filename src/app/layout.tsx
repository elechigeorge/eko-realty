import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Eko Realty | Luxury Listing in Nigeria",
  description: "Find Luxury Listing in Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
