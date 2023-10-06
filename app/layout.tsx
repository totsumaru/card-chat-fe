import "./globals.css"
import React from "react";

export const metadata = {
  title: "チャットカード",
  description: "連絡先を知らなくても、カードを渡すだけで今日会った人とチャットができるサービスです。営業支援ツールとして展開しています。",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="h-full">
      <body className="h-full">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
