import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name:     z.string().min(1).max(100),
  email:    z.string().email(),
  message:  z.string().min(1).max(2000),
  consent:  z.literal(true),
  honeypot: z.string().max(0),
})

// Simple in-memory rate limiting (replace with Redis/Upstash for production)
const rateMap = new Map<string, { count: number; reset: number }>()

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per IP per hour
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (entry && now < entry.reset) {
    if (entry.count >= 5) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' } },
        { status: 429 }
      )
    }
    entry.count++
  } else {
    rateMap.set(ip, { count: 1, reset: now + 3600_000 })
  }

  const body = await req.json().catch(() => null)
  const result = schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'One or more fields are invalid.',
          fields: result.error.flatten().fieldErrors,
        },
      },
      { status: 400 }
    )
  }

  const { name, email, message } = result.data

  // Send email via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from:    'contact@gr-media.de',
        to:      'info@gr-media.de',
        subject: `New inquiry from ${name}`,
        text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
      })
    } catch (err) {
      console.error('Email send failed:', err)
      return NextResponse.json({ error: { code: 'SERVER_ERROR', message: 'Failed to send.' } }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
