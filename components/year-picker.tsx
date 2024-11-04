"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function YearPickerComponent({
	onChange,
}: {
	onChange: (date: Date) => void;
}) {
	const today = new Date();
	const currentYear = today.getFullYear();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [startYear, setStartYear] = useState(
		Math.floor(currentYear / 9) * 9 - 8
	);

	const handleYearSelect = (year: number) => {
		const newDate = new Date(year, today.getMonth(), today.getDate());
		setSelectedDate(newDate);
		onChange(newDate);
	};

	const years = Array.from({ length: 9 }, (_, i) => startYear + i);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-between text-left font-normal",
						!selectedDate && "text-muted-foreground"
					)}
				>
					{selectedDate
						? format(selectedDate, "MMMM d, yyyy")
						: "Select a year"}
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-full p-0">
				<div className="flex flex-col p-2">
					<div className="flex justify-between items-center mb-2">
						<Button
							variant="outline"
							size="icon"
							className="h-7 w-7"
							onClick={() => setStartYear(startYear - 9)}
							disabled={startYear <= 1900}
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Previous years</span>
						</Button>
						<div className="font-semibold">
							{startYear} - {startYear + 8}
						</div>
						<Button
							variant="outline"
							size="icon"
							className="h-7 w-7"
							onClick={() => setStartYear(startYear + 9)}
							disabled={startYear + 9 > currentYear}
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Next years</span>
						</Button>
					</div>
					<div className="grid grid-cols-3 gap-2">
						{years.map((year) => (
							<Button
								key={year}
								onClick={() => handleYearSelect(year)}
								variant={
									selectedDate?.getFullYear() === year ? "default" : "outline"
								}
								className="h-10 w-full text-sm"
								disabled={year > currentYear}
							>
								{year}
							</Button>
						))}
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
