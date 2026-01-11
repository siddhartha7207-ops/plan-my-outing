
const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";

export const verifyPlanWithAI = async (planData, token) => {
    if (!token) {
        throw new Error("Hugging Face Token is required");
    }

    const prompt = `
You are an expert travel assistant. Analyze this itinerary for a day out in ${planData.city}.
    
Context:
- People: ${planData.numberOfPeople}
- Transport: ${planData.transport}
- Total Budget: ₹${planData.totalBudget}
- Spent: ₹${planData.totalCost}

Itinerary:
${planData.timeline.map(t => `- ${t.time}: ${t.title} (${t.cost || 0})`).join('\n')}

Task:
1. Rate the plan (1-10) based on realism, budget, and flow.
2. Identify 1 "Hidden Gem" or tip nearby.
3. Warn about any logistical issues (too rushed, wrong order).
4. Suggest a specific dish to try at the chosen restaurant (if any).

Output Format (Strict JSON):
{
  "rating": 8,
  "summary": "One sentence summary...",
  "tips": "Your tip here",
  "warnings": "Any warning or 'None'",
  "food_suggestion": "Dish name"
}
    `;

    try {
        const response = await fetch(HF_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: `<s>[INST] ${prompt} [/INST]`,
                parameters: {
                    max_new_tokens: 500,
                    return_full_text: false,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const result = await response.json();

        // Parse the generated text, ensuring it's valid JSON
        let text = result[0]?.generated_text || "{}";

        // Cleanup markdown if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("AI JSON Parse Error", text);
            return {
                rating: 7,
                summary: "AI response was not valid JSON, but the plan looks decent.",
                tips: "Enjoy your trip!",
                warnings: "None",
                food_suggestion: "Local Specialties"
            };
        }

    } catch (error) {
        console.error("AI Service Error:", error);
        throw error;
    }
};
