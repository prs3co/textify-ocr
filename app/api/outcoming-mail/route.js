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
  try {
    const body = await request.formData()

    const mailData = {
      registerNumber: body.get('noRegistration'),
      letterNumber: body.get('letterNumber'),
      address: body.get('address'),
      letterDate: new Date(body.get('letterDate')),
      title: body.get('title'),
      pdfUrl: body.get('file'),
      year: new Date(body.get('letterDate')).getFullYear()
    };

    const newMail = new Mail(mailData);

    console.log('New Mail object:', newMail.toObject());

    await connectDB()
    await newMail.save()

    return NextResponse.json('Mail has been posted', {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyValue) {
      const duplicateKeyError = {
        error: 'Duplicate key violation',
        keyPattern: error.keyPattern,
        keyValue: error.keyValue,
      }

      return NextResponse.json(duplicateKeyError, { status: 409})
    }
    return NextResponse.json({ error }, { status: 500 });
    // return NextResponse.json({ error: 'Internal server error'}, { status: 500 })
  }
}