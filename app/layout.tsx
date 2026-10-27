import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eVetCare | Animal Healthcare System",
  description: "Veterinary appointments and emergency care",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
