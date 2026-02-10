
import { GoogleGenAI } from "@google/genai";

/**
 * Helper to call Gemini with exponential backoff for retryable errors (like 429).
 */
async function callGeminiWithRetry(
  prompt: any,
  model: string = 'gemini-3-flash-preview',
  maxRetries: number = 3,
  systemInstruction?: string
): Promise<string | null> {
  let delay = 2000;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: model,
        contents: typeof prompt === 'string' ? prompt : { parts: prompt },
        config: systemInstruction ? { systemInstruction } : undefined
      });
      
      return response.text || null;
    } catch (error: any) {
      const errorMsg = error?.message || "";
      const isQuotaError = errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED");
      
      if (isQuotaError && attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
      throw error;
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

export const getSupportChatResponse = async (userMessage: string, history: { role: string, text: string }[]) => {
  const systemInstruction = `You are the Meristem Wealth Assistant, an elite AI support agent for Meritrade NextGen, Meristem Nigeria's premier trading platform. 
  Your tone is professional, helpful, and sophisticated. 
  You assist with:
  - Navigating the Meritrade platform.
  - Explaining NGX trading rules (T+2 settlement, trading hours 10am-2:30pm).
  - Meristem's wealth management services.
  - Onboarding and KYC requirements.
  Do NOT provide specific financial advice or price predictions. Refer users to Meristem advisors for complex wealth strategies. 
  Always use 'Meristem' and 'Meritrade' correctly.`;

  try {
    const chatParts = history.map(h => ({ text: `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}` }));
    chatParts.push({ text: `User: ${userMessage}` });
    
    return await callGeminiWithRetry(chatParts, 'gemini-3-flash-preview', 3, systemInstruction);
  } catch (error) {
    return "I apologize, I'm having trouble connecting to the wealth intelligence core. Please try again or contact our human support at +234 (0) 1 271 7350.";
  }
};
