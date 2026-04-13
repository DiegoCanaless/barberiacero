import "./globals.css";
import { raleway } from "@/components/ui/typography/fonts";
import Providers from "./providers";

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
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
