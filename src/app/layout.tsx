import type { Metadata } from "next";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Eko Realty | Luxury Listing in Nigeria",
  description: "Find Luxury Listing in Nigeria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const whatsappNumber = "+2349012345678"; // Replace with your WhatsApp number

  return (
    <>
      <html>
        <body>
          {children}
          {/* WhatsApp Chat Button */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all duration-300"
            aria-label="Chat with us on WhatsApp"
          >
            <FontAwesomeIcon icon={faMessage} className="w-6 h-6" />
          </a>
        </body>
      </html>
    </>
  );
}
