import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "OPENAI_API_KEY is missing. Check that .env exists in the project root."
  );
}

const openai = new OpenAI({
  apiKey,
});

export async function getDreamInterpretation(dreamText) {
  if (!dreamText || !dreamText.trim()) {
    throw new Error("Dream text is required");
  }

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const message = await openai.chat.completions.create({
      model,
      max_tokens: 512,
      messages: [
        {
          role: "system",
          content:
            "You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.",
        },
        {
          role: "user",
          content: `Dream: ${dreamText}`,
        },
      ],
    });
    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(`API error: ${error.message}`);
  }
}
