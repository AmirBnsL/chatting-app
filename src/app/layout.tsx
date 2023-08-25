import "./globals.css";
import { AuthContextProvider } from "./(firebase)/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white">
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
