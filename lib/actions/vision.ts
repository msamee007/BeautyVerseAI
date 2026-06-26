"use server"

import { GoogleGenAI } from '@google/genai';
import { redis } from '@/lib/redis';
import crypto from 'crypto';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
const TOKEN_BUDGET = 2500;

export async function analyzeUserPhoto(base64Image: string, mode: string, consultationType: string, city: string = "mumbai") {
  // Compress base64 for caching hash (just taking first 1000 chars for hash speed)
  const imageHash = crypto.createHash('sha256').update(base64Image.substring(0, 1000) + mode + consultationType + city).digest('hex');
  const cacheKey = `gemini:vision:${imageHash}`;

  const cachedResponse = await redis.get(cacheKey);
  if (cachedResponse) {
    return typeof cachedResponse === 'string' ? JSON.parse(cachedResponse) : cachedResponse;
  }

  // Remove the data URI prefix if present (e.g., "data:image/jpeg;base64,")
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

  // City-Specific Pricing & Service Intelligence
  let cityContext = "Provide standard marketplace pricing.";
  if (city.toLowerCase() === "bangalore") cityContext = "Assume a Luxury Premium marketplace. Recommend high-end pricing (e.g., ₹5000+).";
  if (city.toLowerCase() === "delhi") cityContext = "Assume a Bridal-focused marketplace. Emphasize complete wedding bundles and heavy styling.";
  if (city.toLowerCase() === "pune") cityContext = "Assume a Home Service marketplace. Emphasize convenience, travel-readiness, and add a hypothetical travel fee to your estimates.";

  const systemPrompt = `You are a world-class Master Stylist and Grooming Expert for BeautyVerse AI.
The user has uploaded a photo for a ${consultationType} consultation in ${mode} mode in ${city}.
${cityContext}

Analyze their face shape, skin tone, hair texture, or pet breed meticulously.
Do not hallucinate.

Return ONLY valid JSON matching this schema. CRITICAL: Do NOT use raw newlines inside string values. Keep all text on a single line per field, or escape newlines properly as \\n.
{
  "analysis": "Detailed breakdown of their current features",
  "recommendation": "Expert advice on what style/treatment would suit them best",
  "search_tags": ["list", "of", "services", "to", "book"],
  "estimated_maintenance": "e.g., Every 3 weeks",
  "estimated_price": "String estimate based on the city context provided"
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
        temperature: 0.3,
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
    console.error("[VISION AI] Error analyzing photo:", error);
    return { error: error.message || "Failed to process image. Please try again." };
  }
}
