import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/../components/navbar";
//import Footer from "@/components/footer";
//import { FitLogProvider } from "@/context/fit-log-context";
//import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense workout planner and logging app.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* <FitLogProvider> */}
          <Navbar />
          {children}
          {/* <Footer /> */}
          {/* <Toaster position="top-right" toastOptions={{ style: { background: "#111411", color: "#fff", border: "1px solid #2c3529" } }} /> */}
        {/* </FitLogProvider> */}
      </body>
    </html>
  );
}

