"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/molecules/button"
import { Calendar } from "@/components/ui/molecules/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/molecules/popover"
import { useState } from "react"

interface DatePickerProps {
    value?: Date
    allowedDays?: number[]
    onChange: (date: Date | undefined) => void
}

export function DatePickerDemo({ value, onChange, allowedDays }: DatePickerProps) {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="justify-start text-card-foreground bg-card text-left font-normal w-full"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {value ? format(value, "PPP") : <span>Seleccionar fecha</span>}

                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0 text-card-foreground bg-card">

                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => {
                        onChange(date)
                        setOpen(false)
                    }}
                    disabled={(date) =>
                        allowedDays
                            ? !allowedDays.includes(date.getDay())
                            : false
                    }
                />


            </PopoverContent>
        </Popover>
    )
}
