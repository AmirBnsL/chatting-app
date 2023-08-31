import "./globals.css";
import { Inter } from 'next/font/google';
import { AuthContextProvider } from "./(firebase)/AuthContext";

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
      <body className="text-white">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
