import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');
  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `./public/uploads/${file.name}`; // Ensure this path is correct
  await writeFile(path, buffer);
  console.log(`File saved at ${path}`);
  return NextResponse.json({ success: true });
}