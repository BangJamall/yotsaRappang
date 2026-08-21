import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "VibrantLocal - Kualitas Premium, Rasa Lokal Nusantara",
  description: "Mendukung pengrajin lokal dengan menghadirkan produk UMKM berkualitas tinggi untuk kebutuhan modern Anda.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased pt-20 flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
