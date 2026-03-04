"use client";

import { useEffect } from "react";
import { FaInstagram } from "react-icons/fa6";
import { domine } from "../ui/typography/fonts";

const Gallery = () => {
    useEffect(() => {
        // Evita duplicar el script
        if (document.getElementById("taggbox-script")) return;

        const script = document.createElement("script");
        script.src = "https://widget.taggbox.com/embed.min.js";
        script.id = "taggbox-script";
        script.async = true;

        document.body.appendChild(script);
    }, []);

    return (
        <section className="bg-background flex flex-col items-center mt-20 gap-4 px-4">
            <FaInstagram size={30}/>
            <h2 className={`text-3xl font-extrabold text-foreground ${domine.className}`}>@LACEROBARBER</h2>
            <p className="text-center text-xs">Síguenos para ver nuestros últimos trabajos y novedades.</p>

            <a href="https://www.instagram.com/probandosimulacion/" target="_blank" rel="noopener noreferrer" className="text-foreground text-xs border font-extrabold border-gray-500 rounded-sm px-4 py-2 bg-background">SEGUIR EN INSTAGRAM </a>

            {/* CONTENEDOR COMPACTO */}
            <div className="w-full max-w-2xl mx-auto mt-5 z-10">
                <div
                    className="taggbox w-full"
                    data-widget-id="314573"
                    data-website="1"
                />
            </div>
        </section>
    );
};

export default Gallery;