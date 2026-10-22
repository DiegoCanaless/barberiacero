"use client";

import { SessionProvider } from "next-auth/react";
import ReduxProvider from "@/lib/redux/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import BackendWakeupBanner from "@/components/ui/BackendWakeupBanner";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <ReduxProvider>
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <BackendWakeupBanner />
                    </ThemeProvider>
                </AuthProvider>
            </ReduxProvider>
        </SessionProvider>
    );
}
