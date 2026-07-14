import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Needspersand",
    template: "%s | Needspersand",
  },
  description:
    "니즈퍼샌드는 블록체인 기술을 활용해 다양한 디지털 서비스를 개발·운영하는 기술 기업입니다.",
  metadataBase: new URL("https://needspersand.co.kr"),
  openGraph: {
    title: "Needspersand",
    description:
      "블록체인 기술을 기반으로 실사용 서비스를 설계하고 운영하는 니즈퍼샌드 공식 홈페이지입니다.",
    url: "/",
    siteName: "니즈퍼샌드",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "니즈퍼샌드 공식 홈페이지",
      },
    ],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Needspersand",
    description:
      "블록체인 기술을 활용해 다양한 디지털 서비스를 개발·운영하는 기술 기업, 니즈퍼샌드.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}