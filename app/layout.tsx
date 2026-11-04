import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { MuiProviders } from "../components/mui-providers";

// Public Sans is the typeface the live site loads from Google Fonts. next/font
// self-hosts it and exposes it as --font-public-sans, which components/theme.ts
// reads — so no stylesheet link is needed.
const publicSans = Public_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ProsERP | Simplified Management and Control",
  description:
    "ProsERP runs inventory, sales, projects, fuel stations, manufacturing and farms on one system, and shows you where work, time and money stop agreeing.",
  icons: {
    icon: "/images/logo/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={publicSans.variable} lang="en">
      <body>
        <MuiProviders>{children}</MuiProviders>
      </body>
    </html>
  );
}
