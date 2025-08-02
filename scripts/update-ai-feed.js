#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getAllFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap((entry) => {
    const res = path.join(dir, entry.name);
    return entry.isDirectory() ? getAllFiles(res) : [res];
  });
  return files.filter((file) => file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.md'));
}

function chunkText(text, size = 500) {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(' '));
  }
  return chunks;
}

async function main() {
  const dirs = ['pages', 'components'];
  let documents = [];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = getAllFiles(dir);
    for (const file of files) {
      const raw = fs.readFileSync(file, 'utf8');
      const text = raw.replace(/<[^>]*>/g, '');
      const chunks = chunkText(text);
      for (const chunk of chunks) {
        if (!chunk.trim()) continue;
        const embedding = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: chunk,
        });
        documents.push({
          source: file,
          content: chunk,
          embedding: embedding.data[0].embedding,
        });
      }
    }
  }
  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/ai-feed.json', JSON.stringify(documents, null, 2));
  console.log(`Wrote ${documents.length} entries to data/ai-feed.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

