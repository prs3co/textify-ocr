import connectDB from '@/lib/mongodb'
import Mail from '@/models/Mail'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id } = params
    // const id = '65a7a8dcb6d2370323618883'
    console.log(id)
    connectDB()
    const mail = await Mail.findById(id)

    return NextResponse.json(mail, {status: 200})
  } catch(error) {
    console.log(error)
    return NextResponse.json({error: 'Internal server error'}, {status: 505})
  }
}