import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://echo-legal.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
