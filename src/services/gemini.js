import { GoogleGenerativeAI } from '@google/generative-ai';

export const GeminiService = {
    async generateItinerary(apiKey, planDetails) {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Clean up if markdown is present
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("Gemini API Error:", error);
            throw error;
        }
    }
};
