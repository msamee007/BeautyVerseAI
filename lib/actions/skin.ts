"use server"

import { GoogleGenAI } from '@google/genai';
import { redis } from '@/lib/redis';
import crypto from 'crypto';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function analyzeSkin(base64Image: string, mode: string) {
  // Compress base64 for caching hash
  const imageHash = crypto.createHash('sha256').update(base64Image.substring(0, 1000) + mode).digest('hex');
  const cacheKey = `gemini:skin:${imageHash}`;

  try {
    const cachedResponse = await redis.get(cacheKey);
    if (cachedResponse) {
      return typeof cachedResponse === 'string' ? JSON.parse(cachedResponse) : cachedResponse;
    }
  } catch(e) {
    console.error("Redis cache error:", e);
  }

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

  let modeContext = "The user is a female. Focus on female skincare, makeup readiness, and standard dermatology.";
  if (mode === "male") modeContext = "The user is male. Focus on male grooming, beard skin health, and male dermatology.";
  if (mode === "pet") modeContext = "The user is analyzing a pet (dog/cat). Focus on coat health, skin flakiness, and pet grooming needs.";

  const systemPrompt = `You are an expert Dermatologist and Grooming AI.
Analyze the provided image for skin or coat health.
${modeContext}

Return ONLY valid JSON matching this schema:
{
  "skinType": "A short 2-4 word description (e.g., 'Oily / Acne-Prone', 'Dry Coat / Flaky')",
  "hydration": "A percentage string (e.g., '42%')",
  "recommendation": "A specific treatment or product recommendation",
  "confidence": "A percentage string (e.g., '94%')"
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        systemPrompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg"
          }
        }
      ],
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 1000,
        temperature: 0.2,
      }
    });

    if (!response.text) throw new Error("Empty vision response");
    const jsonResult = JSON.parse(response.text);

    try {
      await redis.set(cacheKey, JSON.stringify(jsonResult), { ex: 86400 });
    } catch(e) {}
    
    return jsonResult;
  } catch (error) {
    console.error("[SKIN AI] Error analyzing photo:", error);
    return { error: "Failed to process skin analysis. Please make sure the image is clear and try again." };
  }
}
