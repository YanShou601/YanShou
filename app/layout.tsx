import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "研寿｜AI 辅助的人体证据档案",
  description:
    "研究与长寿之间，一份由 AI 协助整理、以人体证据为核心的持续更新档案。",
  openGraph: {
    title: "研寿",
    description: "AI 辅助的人体证据档案。研究方案，不兜售答案。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "研寿",
    description: "AI 辅助的人体证据档案。研究方案，不兜售答案。",
  },
};

export const viewport = {
  themeColor: "#F7F7F4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
