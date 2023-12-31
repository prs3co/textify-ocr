export async function POST(request) {
  const formData = await request.formData();

  try {
    const res = await fetch('https://api.mindee.net/v1/products/prs3co/letter/v1/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.MINDEE_API_KEY
      },
      body: formData
    })

    // console.log(formData.get('document'))

    const response = await res.json()

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(error)
  }
}