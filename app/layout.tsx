import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Courses",
  description: "Dream Courses by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <main className='max-w-full mx-auto p-0'>
          {children}
        </main>
      </body>
    </html>
  );
}
