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
    title: "把长寿，重新交给证据｜Longevity Field Notes",
    description:
      "参考 Bryan Johnson Blueprint，以人体研究、风险与适用条件重新审视力量训练、蛋白质、肌酸、DHA、Q10、NMN 等方案。",
    openGraph: {
      title: "把长寿，重新交给证据",
      description: "Blueprint 是线索，不是处方。逐项核对人体证据、收益与风险。",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1732, height: 908 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "把长寿，重新交给证据",
      description: "Blueprint 是线索，不是处方。",
      images: [`${origin}/og.png`],
    },
  };
}

export const viewport = {
  themeColor: "#F3EEE3",
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
