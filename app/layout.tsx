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
      "向自然界的长寿样本提问，用人体证据回答。一份持续更新的长寿研究档案。",
    openGraph: {
      title: "研寿",
      description: "AI 辅助的人体证据档案。研究方案，不兜售答案。",
      type: "website",
      images: [
        {
          url: `${origin}/greenland-shark-fullbleed.png`,
          width: 1774,
          height: 887,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "研寿",
      description: "AI 辅助的人体证据档案。研究方案，不兜售答案。",
      images: [`${origin}/greenland-shark-fullbleed.png`],
    },
  };
}

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
