import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tatum assignment',
  description: '데이터를 TreeView, Table, Tag로 확인하기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
