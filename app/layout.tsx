import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "研寿｜AI 辅助的人体证据档案",
    description:
      "研究如何活得更久，也研究什么并不成立。一份以人体证据为核心、持续更新的长寿研究档案。",
    openGraph: {
      title: "研寿",
      description: "AI 辅助的人体证据档案。研究方案，不兜售答案。",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "研寿",
      description: "AI 辅助的人体证据档案。研究方案，不兜售答案。",
      images: [`${origin}/og.png`],
    },
  };
}

export const viewport = {
  themeColor: "#14120F",
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
