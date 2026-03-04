interface CardWorkerProps {
    img: string,
    name: string,
    description: string,
}

export default function CardWorker({
    img,
    name,
    description
}: CardWorkerProps) {
    return (
        <article className="flex px-4 w-full items-center gap-4 rounded-tr-lg rounded-br-lg bg-background border-l-2 border-foreground">
            <img src={img} alt={name} className="w-10 h-full rounded-full" />
            <div className="flex flex-col gap-2 text-foreground ">
                <p className="text-md font-medium">{name}</p>
                <p className="text-sm font-light">{description}</p>
            </div>
        </article>
    )
}
