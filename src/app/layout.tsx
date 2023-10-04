import "./globals.css";
import { Inter } from 'next/font/google';
import { AuthProvider } from "./(firebase)/AuthContext";
import Providers from "./Providers";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <Providers>
      <body className="text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
      </Providers>
    </html>
  );
}
