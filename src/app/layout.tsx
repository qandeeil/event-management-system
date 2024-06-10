import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const cardData = {
  title: "Event Itans",
  description:
    "Discover and plan your events effortlessly with Event Itans, the premier platform for booking and organizing events. Whether you're planning a wedding, conference, or workshop, we're here to help you create your perfect experience.",
  image: "logo.png",
  imageWidth: 600,
  imageHeight: 600,
};

export const metadata: Metadata = {
  title: cardData.title,
  description: cardData.description,
  openGraph: {
    title: cardData.title,
    description: cardData.description,
    images: [
      {
        url: cardData.image,
        width: cardData.imageWidth,
        height: cardData.imageHeight,
      },
    ],
  },
  icons: {
    icon: cardData.image,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </body>
      </Providers>
    </html>
  );
}
