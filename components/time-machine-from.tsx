"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { YearPickerComponent } from "./year-picker";
import { useEffect } from "react";

const formSchema = z.object({
	date: z.date(),
	latitude: z.number(),
	longitude: z.number(),
});

export default function TimeMachineForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: new Date(),
			latitude: 0,
			longitude: 0,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				form.setValue("latitude", position.coords.latitude);
				form.setValue("longitude", position.coords.longitude);
			});
		} else {
			console.log("Geolocation is not available");
		}
	}, []);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-10"
			>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year you want to travel to</FormLabel>
							<FormControl>
								<YearPickerComponent onChange={field.onChange} />
							</FormControl>
							<FormDescription>
								This is year you are traveling to.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4 min-w-full">
					<FormField
						control={form.control}
						name="latitude"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Latitude</FormLabel>
								<FormControl>
									<Input
										placeholder="40.7128"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="longitude"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Longitude</FormLabel>
								<FormControl>
									<Input
										placeholder="-74.0060"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
