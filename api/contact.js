import { Resend } from 'resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME_LENGTH = 100
const MAX_MESSAGE_LENGTH = 5000
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5

const requestsByIp = new Map()

function sanitize(value) {
  return value.replace(/[<>]/g, '').trim()
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function isRateLimited(request) {
  const forwardedFor = request.headers?.['x-forwarded-for']

  const ip = String(
    Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor || request.socket?.remoteAddress || 'unknown'
  )
    .split(',')[0]
    .trim()

  const now = Date.now()
  const record = requestsByIp.get(ip)

  if (!record || now - record.startedAt > RATE_LIMIT_WINDOW_MS) {
    requestsByIp.set(ip, {
      startedAt: now,
      count: 1,
    })

    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count += 1

  return false
}

export default async function handler(request, response) {
  // Only allow POST requests.
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')

    return response.status(405).json({
      error: 'Method not allowed.',
    })
  }

  const {
    name = '',
    email = '',
    message = '',
    company = '',
  } = request.body ?? {}

  const cleanName = sanitize(String(name))
  const cleanEmail = sanitize(String(email)).toLowerCase()
  const cleanMessage = sanitize(String(message))

  // Honeypot:
  // Bots may fill this hidden field.
  // If they do, silently accept the request without sending an email.
  if (String(company).trim()) {
    return response.status(200).json({
      message: 'Message received.',
    })
  }

  // Rate limiting.
  if (isRateLimited(request)) {
    return response.status(429).json({
      error: 'Too many messages sent. Please wait a minute and try again.',
    })
  }

  // Required fields.
  if (!cleanName || !cleanEmail || !cleanMessage) {
    return response.status(400).json({
      error: 'Name, email, and message are required.',
    })
  }

  // Email validation.
  if (!EMAIL_PATTERN.test(cleanEmail)) {
    return response.status(400).json({
      error: 'Please provide a valid email address.',
    })
  }

  // Length validation.
  if (
    cleanName.length > MAX_NAME_LENGTH ||
    cleanMessage.length > MAX_MESSAGE_LENGTH
  ) {
    return response.status(400).json({
      error: 'Your message is too long. Please shorten it and try again.',
    })
  }

  // Read environment variables.
  const {
    RESEND_API_KEY,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
  } = process.env

  if (
    !RESEND_API_KEY ||
    !CONTACT_TO_EMAIL ||
    !CONTACT_FROM_EMAIL
  ) {
    return response.status(503).json({
      error: 'Contact email has not been configured yet.',
    })
  }

  // Create Resend client.
  const resend = new Resend(RESEND_API_KEY)

  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
  })

  // Send email through Resend.
  const { data, error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: [CONTACT_TO_EMAIL],
    replyTo: cleanEmail,
    subject: `Portfolio enquiry from ${cleanName}`,

    text: `Sender name: ${cleanName}
Sender email: ${cleanEmail}
Submitted: ${submittedAt} IST

Message:
${cleanMessage}`,

    html: `
      <h2>New portfolio enquiry</h2>

      <p>
        <strong>Sender name:</strong>
        ${escapeHtml(cleanName)}
      </p>

      <p>
        <strong>Sender email:</strong>
        <a href="mailto:${escapeHtml(cleanEmail)}">
          ${escapeHtml(cleanEmail)}
        </a>
      </p>

      <p>
        <strong>Submitted:</strong>
        ${escapeHtml(submittedAt)} IST
      </p>

      <hr />

      <p style="white-space: pre-line">
        ${escapeHtml(cleanMessage)}
      </p>
    `,
  })

  // Resend returned an error.
  if (error) {
    console.error('Contact email provider failed:', error)

    return response.status(502).json({
      error: 'We could not send your message. Please try again shortly.',
    })
  }

  // Email successfully sent.
  console.log('Contact email sent successfully:', data)

  return response.status(200).json({
    message: 'Thanks — your message has been sent.',
  })
}