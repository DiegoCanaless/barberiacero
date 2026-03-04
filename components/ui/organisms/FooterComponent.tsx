interface FooterComponentProps {
    title: string,
    enlaces: string[]
}

export default function FooterComponent({ title, enlaces }: FooterComponentProps) {
    return (
        <article className="flex flex-col items-start mb-6 md:mb-0">
            <p className="text-sm font-bold mb-2 border-b border-white text-white">{title}</p>
            {enlaces.map((e) => (
                <p key={e} className="text-sm md:text-xs text-gray-400 mb-1 hover:text-white cursor-pointer transition">
                    {e}
                </p>
            ))}
        </article>
    )
}