import { callOpenAI } from './openai';

export interface GenerateInsightOptions {
  frequency?: 'daily' | 'weekly' | 'monthly';
  tone?: 'gentle' | 'direct' | 'inspiring' | 'soothing';
  tags?: string[];
  length?: 'short' | 'medium' | 'long';
}

export async function generateMysticalInsight(opts: GenerateInsightOptions = {}) {
  const tone = opts.tone ?? 'gentle';
  const frequency = opts.frequency ?? 'daily';
  const tags = (opts.tags || []).join(', ') || 'general wellbeing and alignment';
  const len = opts.length ?? 'short';

  const prompt = `You are an ancient and wise mystic writing a ${frequency} spiritual guidance message for seekers. Use ${tone} tone, keep it ${len} and focused on ${tags}. Provide a short title on its own line, followed by a paragraph of guidance and a ritual suggestion. Keep the title < 8 words and content < 250 words. Output in JSON with keys {title, content, ritual}.`;

  const messages = [
    { role: 'system', content: 'You write short mystical guidance messages for a spiritual wellness app. Keep content non-medical and non-legal.' },
    { role: 'user', content: prompt },
  ];

  try {
    const result = await callOpenAI(messages);
    // Parse text response
    const text = result?.choices?.[0]?.message?.content;
    try {
      // If the model returned JSON as requested, try to parse
      const obj = JSON.parse(text);
      return obj;
    } catch (_e) {
      // Fallback parsing - simple split by lines
      const lines = text?.split('\n') || [];
      const title = lines[0] || `Mystical Insight (${frequency})`;
      const content = lines.slice(1).join(' ').trim();
      return { title, content, ritual: '' };
    }
  } catch (_err) {
    // If OpenAI not configured or error, return a safe fallback
    return {
      title: `Gentle Alignment`,
      content: `Today is a day to center your intentions: breathe deeply, set a clear intention, and let go of what no longer serves you. Small rituals of gratitude amplify the energies around you.`,
      ritual: `Light a small white candle and focus on your intention for five minutes. Thank the universe and release.`,
    } as { title: string; content: string; ritual: string };
  }
}
