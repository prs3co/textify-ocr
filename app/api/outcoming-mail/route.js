import connectDB from '@/lib/mongodb';
import Mail from '@/models/Mail'
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    await connectDB()
    const mail = await Mail.find()

    return new NextResponse(JSON.stringify(mail),{ status: 200})
  } catch (error) {
    return new NextResponse({error: 'internal server error'}, {status: 500})
  }
}

export async function POST(request) {
  const body = await request.json()
  const newMail = new Mail(body)
  try {
    await connectDB()
    await newMail.save()

    return new NextResponse('Mail has been posted', { status: 201, headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }})
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error'}, { status: 500 })
  }
}