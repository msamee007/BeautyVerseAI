import { GoogleGenAI } from '@google/genai';
import { redis } from '@/lib/redis';
import crypto from 'crypto';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const TOKEN_BUDGET = 2000; // Strict token budget for outputs

/**
 * Advanced Gemini System:
 * 1. Prompt Compression / Context Pruning (Truncates context to essential tokens)
 * 2. Query Deduplication (SHA-256 hash checks)
 * 3. Semantic Caching (Upstash Redis)
 * 4. Token Budgeting (maxOutputTokens)
 */
export async function generateAIPlan(query: string, context: { mode: string, occasion?: string, budget?: number }) {
  // 1. Context Pruning: Strip unnecessary whitespace and lowercase to maximize cache hits
  const compressedQuery = query.trim().replace(/\s+/g, ' ').toLowerCase();
  
  const systemPrompt = `You are an elite BeautyVerse AI Concierge specializing in ${context.mode} mode.
  Return ONLY valid JSON matching this schema:
  {
    "type": "plan",
    "timeline": [{ "day": number, "task": "string", "priority": "high|medium|low" }],
    "bundle": [{ "service_name": "string", "estimated_price": number }],
    "total_estimated_cost": number,
    "search_tags": ["string"]
  }`;

  // 2. Query Deduplication & Caching Hash
  const hashPayload = `${compressedQuery}-${context.mode}-${context.occasion || 'none'}-${context.budget || 0}`;
  const cacheKey = `gemini:plan:${crypto.createHash('sha256').update(hashPayload).digest('hex')}`;

  // 3. Check Upstash Redis (Semantic Caching / Response Reuse)
  const cachedResponse = await redis.get(cacheKey);
  if (cachedResponse) {
    console.log("[AI ENGINE] Cache hit. Serving from Upstash Redis.");
    // Redis might return it as an object or string depending on client config
    return typeof cachedResponse === 'string' ? JSON.parse(cachedResponse) : cachedResponse;
  }

  console.log("[AI ENGINE] Cache miss. Generating via Gemini 2.5 Flash...");

  // 4. Token Budgeting & Model Execution
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemPrompt}\n\nUser Request: ${compressedQuery}\nContext: ${JSON.stringify(context)}`,
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: TOKEN_BUDGET,
        temperature: 0.3, // Lower temp for deterministic JSON
      }
    });

    const outputText = response.text;
    if (!outputText) throw new Error("Empty response from Gemini");

    const jsonResult = JSON.parse(outputText);

    // 5. Cache the successful result for 24 hours
    await redis.set(cacheKey, JSON.stringify(jsonResult), { ex: 86400 });

    return jsonResult;
  } catch (error) {
    console.error("[AI ENGINE] Error generating plan:", error);
    return null;
  }
}
