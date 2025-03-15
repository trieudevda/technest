import type { Metadata } from "next";
import "./globals.css";
import "./styles/admin/all.css";
import React from "react";
import SnackbarLayout from "@/utils/helpers/notification/snackbar";
import { LoadingProvider } from "@/utils/helpers/context/loading-context";
import NavigationTracker from "@/utils/helpers/navigation/navi-event";
import AdminBar from "@/layouts/admin/adminbar/page";
import TopBar from "@/layouts/admin/topbar/page";
import BreadcrumbsAdmin from "@/components/breadcrumbs/page";
// import CssBaseline from "@mui/material/CssBaseline";

export const metadata: Metadata = {
  title: "Web Developer",
  description: "Web Developer",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-w-full">
        <SnackbarLayout>
          {/* <CssBaseline /> */}
          <LoadingProvider>
            <NavigationTracker />
            <AdminBar prop="123"></AdminBar>
            <main className="w-full relative">
              <TopBar />
              <div className="content-all">
                <BreadcrumbsAdmin />
                {children}</div>
            </main>
          </LoadingProvider>
        </SnackbarLayout>
      </body>
    </html>
  );
}
