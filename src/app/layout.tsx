import Footer from "./conponents/Footer";
import Header from "./conponents/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
        <Footer />
      </body>
    </html>
  );
}
