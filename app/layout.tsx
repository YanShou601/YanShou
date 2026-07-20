import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "延寿证据图谱｜Longevity Evidence Atlas",
  description:
    "按 Tier 查看肌酸、DHA/EPA、Q10、NMN、亚精胺等补充剂的人体研究、主要结果与局限。",
  openGraph: {
    title: "延寿证据图谱",
    description: "一个持续更新的补充剂论文索引与证据分层框架。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "延寿证据图谱",
    description: "一个持续更新的补充剂论文索引与证据分层框架。",
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
