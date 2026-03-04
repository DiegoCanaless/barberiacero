import { ReactNode } from "react"

interface CardServiceProps {
    icon: ReactNode,
    title: string,
    text: string,
}

export default function CardService({
    icon,
    title,
    text,
}: CardServiceProps) {
        return (
        <article className="w-60 flex flex-col items-center text-center justify-center gap-4 border border-border bg-card rounded-lg py-6 px-4 group transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-card-foreground hover:bg-card-foreground">
            <div className="p-4 rounded-full border-2 border-foreground text-foreground bg-background transition-all duration-300 group-hover:bg-background group-hover:text-foreground group-hover:border-background group-hover:scale-110 group-hover:shadow-lg">
                {icon}
            </div>
            <h5 className="text-lg font-bold text-card-foreground transition-colors duration-300 group-hover:text-card">{title}</h5>
            <p className="text-muted-foreground transition-colors duration-300 group-hover:text-card">{text}</p>
            <button className="text-card-foreground font-semibold transition-all duration-300 group-hover:text-card group-hover:border-b-2 group-hover:border-card cursor-pointer">RESERVAR</button>
        </article>
    )
}
