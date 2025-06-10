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
import { useTranslation } from "react-i18next"
import { uk } from "date-fns/locale"
import { enUS } from "date-fns/locale"
import { useState } from "react"

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
    const { t, i18n } = useTranslation("common")
    const [locale, setLocale] = useState(i18n.language === "ua" ? uk : enUS)

    React.useEffect(() => {
        setLocale(i18n.language === "ua" ? uk : enUS)
        console.log(i18n.language)
    }, [i18n.language])

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
                                    {format(date.from, "LLL dd, y", {
                                        locale,
                                    })}{" "}
                                    -{" "}
                                    {format(date.to, "LLL dd, y", {
                                        locale,
                                    })}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>{t("dateRangePicker.placeholder")}</span>
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

