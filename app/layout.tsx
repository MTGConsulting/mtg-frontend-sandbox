import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MTG Consulting | Integration Dashboard",
  description: "MTG Consulting frontend integration sandbox for GitHub, Vercel, Cursor, Codex, Devin, and Figma. Validate code generation, review, and preview delivery.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
