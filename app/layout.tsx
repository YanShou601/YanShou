import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "研寿｜AI 辅助的人体证据档案",
  description: "按证据等级浏览补充剂研究、论文摘要、适用条件与局限。",
  openGraph: {
    title: "研寿",
    description: "简单、可追溯的人体证据与论文资料库。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "研寿",
    description: "简单、可追溯的人体证据与论文资料库。",
  },
};

export const viewport = {
  themeColor: "#F3EEDC",
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
