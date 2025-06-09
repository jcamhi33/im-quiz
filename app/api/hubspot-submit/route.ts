import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, industry, quiz_score, lead_source } = body

    // HubSpot Portal ID and Form GUID (you'll need to get these from HubSpot)
    const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID
    const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID

    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
      console.error('Missing HubSpot configuration')
      return NextResponse.json({ error: 'HubSpot configuration missing' }, { status: 500 })
    }

    // Split name into first and last name
    const nameParts = name.split(' ')
    const firstname = nameParts[0] || ''
    const lastname = nameParts.slice(1).join(' ') || ''

    // Prepare HubSpot form data
    const hubspotData = {
      fields: [
        { name: 'firstname', value: firstname },
        { name: 'lastname', value: lastname },
        { name: 'email', value: email },
        { name: 'company', value: company || '' },
        { name: 'phone', value: phone || '' },
        { name: 'industry', value: industry },
        { name: 'quiz_score', value: quiz_score.toString() },
        { name: 'lead_source', value: lead_source }
      ],
      context: {
        pageUri: 'https://your-domain.vercel.app',
        pageName: 'Hyperlocal Marketing Quiz'
      }
    }

    // Submit to HubSpot
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`
    
    const hubspotResponse = await fetch(hubspotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotData),
    })

    if (!hubspotResponse.ok) {
      const errorText = await hubspotResponse.text()
      console.error('HubSpot submission failed:', errorText)
      return NextResponse.json({ error: 'HubSpot submission failed' }, { status: 500 })
    }

    const result = await hubspotResponse.json()
    console.log('HubSpot submission successful:', result)

    return NextResponse.json({ success: true, hubspotResult: result })
  } catch (error) {
    console.error('Error in HubSpot submission:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}