import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../prompt";
import { SevakResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeSituation(input: string): Promise<SevakResponse> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: input,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    let jsonText = response.text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.substring(7);
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.substring(3);
    }
    if (jsonText.endsWith('```')) {
      jsonText = jsonText.substring(0, jsonText.length - 3);
    }

    const parsed = JSON.parse(jsonText) as SevakResponse;
    return parsed;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
