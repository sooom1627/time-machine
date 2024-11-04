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

const formSchema = z.object({
	date: z.string().min(2).max(50),
	latitude: z.number(),
	longitude: z.number(),
});

export default function TimeMachineForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: "",
			latitude: 0,
			longitude: 0,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year you want to travel to</FormLabel>
							<FormControl>
								<Input placeholder="1999" {...field} />
							</FormControl>
							<FormDescription>
								This is year you are traveling to.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="latitude"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Latitude</FormLabel>
								<FormControl>
									<Input placeholder="40.7128" {...field} />
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
									<Input placeholder="-74.0060" {...field} />
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
