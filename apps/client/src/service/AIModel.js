// service/AIModel.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY });

export async function GenerateSummary({ prompt, jobTitle }) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${prompt} ${jobTitle}.`,
  });
  return response.text;
}

export async function GenerateWorkSummary({ prompt }) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${prompt}`,
  });
  return response.text;
}
