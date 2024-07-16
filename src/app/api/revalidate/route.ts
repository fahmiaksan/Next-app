import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  const secret = request.nextUrl.searchParams.get('secret');
  if (!tag) return NextResponse.json({ status: 400, message: 'Missing tag params' });
  if (secret !== '123') return NextResponse.json({ status: 400, message: 'Missing secret params' });
  revalidateTag(tag);
  return NextResponse.json({ revalidate: true, date: Date.now() });
};

