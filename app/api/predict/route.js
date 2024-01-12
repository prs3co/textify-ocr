import { NextResponse } from 'next/server';


export async function POST(request) {
  const formData = await request.formData();

  try {
    const res = await fetch('https://api.mindee.net/v1/products/prs3co/letter/v1/predict', {
      method: 'POST',
      headers: {
        'Authorization': process.env.MINDEE_API_KEY,
      },
      body: formData
    })

    const response = await res.json()

    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json(error)
  }
}