/**
 * How to turn thinking down on each Gemini API model. Controls differ by
 * model: 3.1 Pro, 3.8 Flash and Gemini 4 reject "minimal", and 2.5 takes a
 * budget instead of a level (aistudio.google.com/docs/thinking). Shared by the
 * native Gemini provider, the AI SDK streaming path and the OpenAI-compatible
 * fallback, so a model added here is handled the same way on every path.
 */
export type GeminiThinkingConfig = {
  thinkingLevel?: "minimal" | "low";
  thinkingBudget?: number;
  includeThoughts: false;
};

const LOWEST_THINKING: Record<string, GeminiThinkingConfig> = {
  "gemini-3.8-flash": { thinkingLevel: "low", includeThoughts: false },
  "gemini-3.5-flash-lite": { thinkingLevel: "minimal", includeThoughts: false },
  "gemini-3.1-flash-lite": { thinkingLevel: "minimal", includeThoughts: false },
  "gemini-3.1-pro-preview": { thinkingLevel: "low", includeThoughts: false },
  "gemini-4-hydrogen": { thinkingLevel: "low", includeThoughts: false },
  "gemini-4-argon": { thinkingLevel: "low", includeThoughts: false },
  "gemini-4-carbon": { thinkingLevel: "low", includeThoughts: false },
  "gemini-2.5-flash-lite": { thinkingBudget: 0, includeThoughts: false },
};

/** The lowest thinking setting a model accepts, or null when the model is unknown. */
export function geminiLowestThinking(model: string): GeminiThinkingConfig | null {
  return LOWEST_THINKING[model] ?? null;
}
