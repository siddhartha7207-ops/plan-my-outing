export const OpenRouterService = {
    async generateItinerary(apiKey, planDetails) {
        try {
            const prompt = `
                Create a detailed, realistic travel itinerary for a ${planDetails.duration}-minute trip in ${planDetails.city}.
                
                Constraints:
                - Budget: ₹${planDetails.budget} total for ${planDetails.numberOfPeople} people.
                - Time Window: ${planDetails.startTime} to ${planDetails.endTime}.
                - Group Size: ${planDetails.numberOfPeople}.
                - Preferences: ${planDetails.preferences.join(', ')}.
                - Transport: Use ${planDetails.transportType} (approx ₹${planDetails.transportCost}).
                - Food: Include lunch/dinner if time overlaps (approx ₹${planDetails.foodCost}/person).
                - Structure: Must allow travel time between places.
                
                Output ONLY a valid JSON array of objects with this structure:
                [
                    {
                        "time": "HH:MM", // 24-hour format
                        "title": "Activity Name",
                        "description": "Short description",
                        "type": "place" | "food" | "transport" | "movie" | "end",
                        "cost": 150 // Estimated cost in INR (number only)
                    }
                ]
                
                Do not include markdown formatting (like \`\`\`json). Just the raw JSON array.
                Make sure the timeline is contiguous and fills the entire duration from ${planDetails.startTime} to ${planDetails.endTime}.
            `;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "PlanMyOuting",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "google/gemini-flash-1.5",
                    "messages": [
                        { "role": "user", "content": prompt }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "OpenRouter API Error");
            }

            const data = await response.json();
            const text = data.choices[0].message.content;

            // Clean up if markdown is present
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("OpenRouter API Error:", error);
            throw error;
        }
    }
};
