"use server"

import { GoogleGenAI } from '@google/genai';
import { redis } from '@/lib/redis';
import crypto from 'crypto';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askBusinessCoach(question: string, metricsContext: any) {
  const contextHash = crypto.createHash('sha256').update(question + JSON.stringify(metricsContext)).digest('hex');
  const cacheKey = `gemini:coach:${contextHash}`;

  const cachedResponse = await redis.get(cacheKey);
  if (cachedResponse) {
    return typeof cachedResponse === 'string' ? JSON.parse(cachedResponse) : cachedResponse;
  }

  const systemPrompt = `You are an elite Business Consultant and Growth Advisor for Salon Owners on the BeautyVerse AI platform.
The salon owner is asking you a question about growing their business.
Here are their current business metrics (mock data):
${JSON.stringify(metricsContext, null, 2)}

Provide actionable, hyper-practical advice. Do not be generic. Be decisive.
Return ONLY valid JSON matching this schema:
{
  "diagnosis": "A 2-sentence diagnosis of their current situation based on metrics",
  "action_plan": ["Specific action 1", "Specific action 2", "Specific action 3"],
  "marketing_idea": "One specific promotional campaign idea they can run today"
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        systemPrompt,
        question
      ],
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 1000,
        temperature: 0.3,
      }
    });

    if (!response.text) throw new Error("Empty coach response");
    const jsonResult = JSON.parse(response.text);

    await redis.set(cacheKey, JSON.stringify(jsonResult), { ex: 86400 });
    return jsonResult;
  } catch (error) {
    console.error("[COACH AI] Error:", error);
    return null;
  }
}
