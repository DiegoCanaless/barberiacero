import { Raleway, Domine } from "next/font/google";

export const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-raleway",
    display: "swap",
});

export const domine = Domine({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-domine",
    display: "swap",
});
