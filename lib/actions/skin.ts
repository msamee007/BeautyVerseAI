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

  let modeContext = "The user is a female. Focus on cosmetic female skincare, makeup readiness, and general skin texture.";
  if (mode === "male") modeContext = "The user is male. Focus on cosmetic male grooming, beard skin health, and texture.";
  if (mode === "pet") modeContext = "The user is analyzing a pet (dog/cat). Focus on coat health, skin flakiness, and pet grooming needs.";

  const systemPrompt = `You are an expert Cosmetic Beauty Advisor and Grooming AI. (You are NOT a medical professional, do not provide medical diagnoses).
Analyze the cosmetic appearance of the provided image for skin or coat health.
${modeContext}

Return ONLY valid JSON matching this schema. CRITICAL: Do NOT use raw newlines inside string values. Keep all text on a single line per field, or escape newlines properly as \\n.
{
  "skinType": "A short 2-4 word description (e.g., 'Oily / Acne-Prone', 'Dry Coat / Flaky')",
  "hydration": "A percentage string (e.g., '42%')",
  "recommendation": "A specific cosmetic treatment or product recommendation",
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
    
    // Strip potential markdown formatting
    const rawText = response.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const jsonResult = JSON.parse(rawText);

    try {
      await redis.set(cacheKey, JSON.stringify(jsonResult), { ex: 86400 });
    } catch(e) {}
    
    return jsonResult;
  } catch (error: any) {
    console.error("[SKIN AI] Error analyzing photo:", error);
    return { error: error.message || "Failed to process skin analysis. Gemini might have blocked this due to safety filters." };
  }
}
