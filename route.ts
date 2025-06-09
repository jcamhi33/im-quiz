import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Received form data:', body)
    
    const { name, email, company, phone, industry, quiz_score, lead_source } = body

    // HubSpot Portal ID and Form GUID (you'll need to get these from HubSpot)
    const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID
    const HUBSPOT_FORM_GUID = process.env.HUBSPOT_FORM_GUID

    console.log('HubSpot config:', { 
      portalId: HUBSPOT_PORTAL_ID ? 'Set' : 'Missing', 
      formGuid: HUBSPOT_FORM_GUID ? 'Set' : 'Missing' 
    })

    if (!HUBSPOT_PORTAL_ID || !HUBSPOT_FORM_GUID) {
      console.error('Missing HubSpot configuration')
      return NextResponse.json({ 
        error: 'HubSpot configuration missing',
        details: {
          portalId: !HUBSPOT_PORTAL_ID ? 'missing' : 'present',
          formGuid: !HUBSPOT_FORM_GUID ? 'missing' : 'present'
        }
      }, { status: 500 })
    }

    // Split name into first and last name
    const nameParts = name.split(' ')
    const firstname = nameParts[0] || ''
    const lastname = nameParts.slice(1).join(' ') || ''

    // Prepare HubSpot form data - only required fields
    const hubspotData = {
      fields: [
        { name: 'firstname', value: firstname },
        { name: 'lastname', value: lastname || 'N/A' }, // Provide default if only first name given
        { name: 'email', value: email }
      ]
    }

    // Add industry (required field)
    if (industry) {
      hubspotData.fields.push({ name: 'industry', value: industry })
    }

    // Add optional fields only if they have values and are not empty strings
    if (company && company.trim()) {
      hubspotData.fields.push({ name: 'company', value: company.trim() })
    }
    if (phone && phone.trim()) {
      hubspotData.fields.push({ name: 'phone', value: phone.trim() })
    }

    // Add quiz metadata
    hubspotData.fields.push({ name: 'lead_source', value: lead_source || 'Hyperlocal Marketing Quiz' })
    hubspotData.fields.push({ name: 'quiz_score', value: quiz_score ? quiz_score.toString() : 'N/A' })

    console.log('Sending to HubSpot:', JSON.stringify(hubspotData, null, 2))

    // Submit to HubSpot
    const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`
    console.log('HubSpot URL:', hubspotUrl)
    
    const hubspotResponse = await fetch(hubspotUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotData),
    })

    console.log('HubSpot response status:', hubspotResponse.status)

    if (!hubspotResponse.ok) {
      const errorText = await hubspotResponse.text()
      console.error('HubSpot submission failed:', errorText)
      return NextResponse.json({ 
        error: 'HubSpot submission failed',
        status: hubspotResponse.status,
        details: errorText
      }, { status: hubspotResponse.status })
    }

    const result = await hubspotResponse.json()
    console.log('HubSpot submission successful:', result)

    return NextResponse.json({ success: true, hubspotResult: result })
  } catch (error) {
    console.error('Error in HubSpot submission:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}