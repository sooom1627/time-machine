import TimeMachineForm from "@/components/time-machine-from";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center p-24">
			<h1 className="text-4xl font-bold">Time machine</h1>
			<TimeMachineForm />
		</div>
	);
}
