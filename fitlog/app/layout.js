import "./globals.css";
import { WorkoutsProvider } from "@/context/WorkoutsContext";
import { PlanProvider } from "@/context/PlanContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://fitlog.example.com"),
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "FitLog — Workout Library",
    description:
      "Train with intent. Log every set. Pick a lift, lock it into today's plan, and watch the week's work add up.",
    images: ["/banner.png"],
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router layout, not pages/_document */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#0a0a0c] antialiased">
        <ToastProvider>
          <PlanProvider>
            <WorkoutsProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </WorkoutsProvider>
          </PlanProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
