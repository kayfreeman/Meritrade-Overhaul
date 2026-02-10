
import { GoogleGenAI } from "@google/genai";

/**
 * Helper to call Gemini with exponential backoff for retryable errors (like 429).
 */
async function callGeminiWithRetry(
  prompt: string,
  model: string = 'gemini-3-flash-preview',
  maxRetries: number = 3
): Promise<string | null> {
  let delay = 2000; // Starting delay of 2 seconds
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
      
      return response.text || null;
    } catch (error: any) {
      const errorMsg = error?.message || "";
      const isQuotaError = errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED");
      
      // If it's a quota error and we have retries left, wait and try again
      if (isQuotaError && attempt < maxRetries - 1) {
        console.warn(`Gemini API Quota exceeded. Retrying in ${delay}ms... (Attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
        continue;
      }
      
      console.error("Gemini API Error:", error);
      throw error; // Re-throw if not a quota error or if retries are exhausted
    }
  }
  return null;
}

export const getMarketInsights = async (symbols: string[]) => {
  try {
    const prompt = `Analyze the current market sentiment for these NGX stocks: ${symbols.join(', ')}. Provide a brief summary, risk assessment, and potential movement indicators. Return only a professional financial summary.`;
    return await callGeminiWithRetry(prompt);
  } catch (error) {
    return "Market insights are temporarily limited due to high demand. Please refresh in a moment.";
  }
};

export const getPortfolioOptimization = async (holdings: any[]) => {
  try {
    const portfolioDesc = holdings.map(h => `${h.symbol}: ${h.quantity} units at ${h.averageCost} avg cost`).join(', ');
    const prompt = `Based on this portfolio on the Nigerian Stock Exchange (NGX): ${portfolioDesc}. Suggest 3 optimization strategies considering sector diversification and current economic trends in Nigeria. Return as a bulleted list.`;
    return await callGeminiWithRetry(prompt);
  } catch (error) {
    return "Portfolio suggestions are currently unavailable. Our AI analysts are busy, please try again later.";
  }
};

export const getSmartAlert = async (marketUpdate: any) => {
  try {
    const prompt = `Identify unusual price or volume movements from this data: ${JSON.stringify(marketUpdate)}. Is there a "smart alert" worth showing to a trader? Briefly explain why.`;
    return await callGeminiWithRetry(prompt);
  } catch (e) {
    return null;
  }
};
