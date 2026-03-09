import { NextResponse } from 'next/server';

const SUBMIT_URL = process.env.ADD_CLUB_GOOGLE_SHEETS_URL;

export async function POST(request: Request) {
  if (!SUBMIT_URL) {
    return NextResponse.json(
      { error: 'Submission URL not configured. Set ADD_CLUB_GOOGLE_SHEETS_URL in .env.local' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const res = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `Submission failed: ${res.status} ${text}` },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Add club submit error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Submission failed' },
      { status: 500 }
    );
  }
}
