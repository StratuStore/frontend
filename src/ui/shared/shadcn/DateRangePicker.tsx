import { Button } from "@/ui/shared/shadcn/Button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/ui/shared/shadcn/Popover"
import { cn } from "@/utils/cn"
import { Calendar } from "@/ui/shared/shadcn/Calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as React from "react"
import { type DateRange } from "react-day-picker"

export type DateRangePickerProps = React.HTMLAttributes<HTMLDivElement> & {
    date?: DateRange
    setDate: (date: DateRange | undefined) => void
    className?: string
}

export default function DateRangePicker({
    className,
    date,
    setDate,
}: DateRangePickerProps) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger>
                    <Button
                        type="button"
                        id="date"
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal !py-2 !px-3 text-base h-auto",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        autoFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

