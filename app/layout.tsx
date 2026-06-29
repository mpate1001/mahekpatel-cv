import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Mahek Patel | Software Engineer & Data Scientist",
  description:
    "Personal portfolio showcasing experience, projects, and skills in software engineering and data science.",
  keywords: [
    "Mahek Patel",
    "Software Engineer",
    "Data Scientist",
    "Machine Learning",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-sans">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
