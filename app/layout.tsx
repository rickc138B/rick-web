import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RainbowkitWrapper from "./wrappers/RainbowkitWrapper";
import ConnectWallet from "./components/ConnectWallet";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LAB C138-B",
  description: "LAB C138-B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backgroundStyle = {
    backgroundImage: `url(/C138-B%20LAB3.png)`,
    backgroundSize: "cover",
    backgroundPosition: "right",
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RainbowkitWrapper>
          <div
            className="h-screen overflow-hidden relative"
            style={backgroundStyle}
          >
            <div className="bg-black p-4 text-white z-20 relative">
            <ConnectWallet />
            </div>
            {children}
          </div>
        </RainbowkitWrapper>
      </body>
    </html>
  );
}
