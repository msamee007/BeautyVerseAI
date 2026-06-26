"use server"

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateSocialPost(topic: string, storeName: string, city: string) {
  try {
    const prompt = `You are an expert social media manager for a salon/grooming business. 
The business name is "${storeName}" located in "${city}".
Generate a catchy, engaging Instagram caption (with emojis and hashtags) promoting: ${topic}.
Keep it under 3 sentences.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 150,
        temperature: 0.7,
      }
    });

    if (!response.text) throw new Error("Empty response");
    
    return { post: response.text.trim() };
  } catch (error: any) {
    console.error("[MARKETING AI] Error:", error);
    return { error: error.message || "Failed to generate caption." };
  }
}
