import connectDB from '@/lib/mongodb'
import Mail from '@/models/Mail'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id } = params
    connectDB()
    const mail = await Mail.findOne({id: id})

    return NextResponse.json(JSON.stringify(mail), {status: 200})
  } catch(error) {
    console.log(error)
    return NextResponse.json({error: 'Internal server error'}, {status: 505})
  }
}