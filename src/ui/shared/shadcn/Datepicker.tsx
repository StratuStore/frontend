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

export function Datepicker() {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal !py-2 !px-3",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}

