'use client'
import Header from "@/components/NavBar/Header";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api";
import AuthLayout from "@/components/Hoc/AuthLayout";



export default function RootLayout({ Component, children }) {

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthLayout>
            <ToastContainer />
            <Header />
            <main className="flex flex-col justify-between items-center">
              {children}
            </main>
          </AuthLayout>
        </QueryClientProvider>
      </body>
    </html >
  );
}
