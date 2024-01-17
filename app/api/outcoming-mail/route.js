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

    const letterDateString = body.get('letterDate');
    console.log('Received letter date string:', letterDateString);

    const letterDate = new Date(letterDateString);
    console.log('Parsed letter date:', letterDate);

    const mailData = {
      registerNumber: body.get('noRegistration'),
      letterNumber: body.get('letterNumber'),
      address: body.get('address'),
      letterDate: new Date(body.get('letterDate')),
      title: body.get('title'),
      pdfUrl: body.get('file'),
      year: new Date(body.get('letterDate')).getFullYear()
    };

    console.log('Mail data before saving:', mailData);

    const newMail = new Mail(mailData);

    // console.log('Extracted year:', newMail.year);
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
    return NextResponse.json({ error }, { status: 500 });
    // return NextResponse.json({ error: 'Internal server error'}, { status: 500 })
  }
}