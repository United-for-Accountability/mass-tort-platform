import { NextResponse } from 'next/server';
import { createApiGuard } from './lib/apiGuard.mjs';

const guard = createApiGuard();

export async function proxy(request) {
  const failure = await guard(request);
  const response = failure
    ? NextResponse.json({ error: failure.message, reply: failure.message, draft: failure.message, answer: failure.message }, {
        status: failure.status,
        headers: failure.headers,
      })
    : NextResponse.next();
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export const config = { matcher: '/api/:path*' };
