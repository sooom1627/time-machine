"use server";

export async function getHistoricalData(
	date: Date,
	latitude: number,
	longitude: number
) {
	const prompt = `I want to know what was happening on exactly these coordinates on this date: ${date.toLocaleDateString()}, Coordinates: ${latitude}, ${longitude}
  Explain it like I'm standing there. 
  
  Describe the weather, the people, the buildings, the traffic, the news, the events, the culture, the history, the everything.

  Return the answer in Japanese.
  `;
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
		}),
	});

	const data = await response.json();
	return data.choices[0].message.content;
}
