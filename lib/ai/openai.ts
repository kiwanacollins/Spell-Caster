import { env } from '@/lib/env';

export async function callOpenAI(messages: { role: string; content: string }[], model = 'gpt-4o-mini') {
  const apiKey = env.optional.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not configured');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: 800 }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }

  const json = await res.json();
  // best-effort: the assistant reply will be in json.choices[0].message.content
  return json;
}
