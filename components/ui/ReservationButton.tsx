import React, { ReactNode } from "react";

interface ReservationButtonProps {
    big: boolean;
    text: string;
    className?: string;
    icon?: ReactNode;
    onClick?: () => void;
}

export default function ReservationButton({
    big,
    text,
    className = "",
    icon,
    onClick
}: ReservationButtonProps) {
    return (
        <div onClick={onClick} className={`${big ? "w-full" : "w-50"}  cursor-pointer gap-2 rounded flex items-center justify-center text-sm py-2 px-4 font-semibold transition-colors duration-200 ${className}`}>
            {text} {icon}
        </div>
    );
}