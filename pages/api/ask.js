import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const dataPath = path.join(process.cwd(), 'data', 'ai-feed.json');
let documents = [];
if (fs.existsSync(dataPath)) {
  try {
    documents = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (err) {
    console.error('Failed to load AI feed', err);
  }
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const { question } = req.body;
  if (!question) {
    res.status(400).json({ error: 'Question is required' });
    return;
  }
  if (documents.length === 0) {
    res.status(200).json({ answer: 'Knowledge base is empty.' });
    return;
  }
  try {
    const qEmbedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: question,
    });
    const query = qEmbedding.data[0].embedding;
    let best = documents[0];
    let bestScore = -Infinity;
    for (const doc of documents) {
      const score = cosineSimilarity(query, doc.embedding);
      if (score > bestScore) {
        bestScore = score;
        best = doc;
      }
    }
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Use the provided context to answer.' },
        { role: 'system', content: best.content },
        { role: 'user', content: question },
      ],
    });
    const answer = completion.choices[0]?.message?.content?.trim();
    res.status(200).json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate answer' });
  }
}
