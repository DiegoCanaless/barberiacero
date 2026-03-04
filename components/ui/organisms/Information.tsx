import { ReactNode } from "react"

interface InformationProps {
    icon: ReactNode
    title: string
    subtitle: string
    info?: string
    day?: string
}

export default function Information({
    icon,
    title,
    subtitle,
    info,
    day,
}: InformationProps) {
    return (
        <article className="flex w-full items-center gap-4 rounded-lg p-3 transition-colors">
            <div className="flex items-center justify-center rounded-full p-3 bg-primary/10 text-primary">
                {icon}
            </div>

            {/* Texto */}
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">
                    {title}
                </p>

                <p className="text-xs text-muted-foreground">
                    {subtitle}
                </p>

                {info && (
                    <p className="text-xs text-muted-foreground">
                        {info}
                    </p>
                )}

                {day && (
                    <p className="text-xs text-muted-foreground">
                        {day}
                    </p>
                )}
            </div>
        </article>
    )
}
