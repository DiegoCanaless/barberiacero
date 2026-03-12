import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ReduxProvider from "@/lib/redux/ReduxProvider";
import { raleway } from "@/components/ui/typography/fonts";
import React from "react";
import AuthProvider from "@/providers/AuthProvider";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`antialiased ${raleway.className}`}
                suppressHydrationWarning
            >
                <ReduxProvider>
                    <AuthProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                        </ThemeProvider>
                    </AuthProvider>

                </ReduxProvider>
            </body>
        </html>
    );
}
