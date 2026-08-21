import contactHandler from '../api/contact.js'

function createResponse() {
  return {
    statusCode: 0,
    payload: null,
    setHeader() {},
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    },
  }
}

async function submit(body) {
  const response = createResponse()
  await contactHandler({ method: 'POST', body, headers: {}, socket: { remoteAddress: `test-${Math.random()}` } }, response)
  return response
}

const invalid = await submit({ name: '', email: 'not-an-email', message: '' })
const bot = await submit({ name: 'Bot', email: 'bot@example.com', message: 'Test', company: 'Filled' })
const unconfigured = await submit({ name: 'Rounak', email: 'rounak@example.com', message: 'Hello' })

if (invalid.statusCode !== 400) throw new Error(`Expected invalid form to fail with 400; received ${invalid.statusCode}`)
if (bot.statusCode !== 200) throw new Error(`Expected honeypot submission to return 200; received ${bot.statusCode}`)
if (unconfigured.statusCode !== 503) throw new Error(`Expected unconfigured email service to return 503; received ${unconfigured.statusCode}`)

console.log('Contact endpoint validation and honeypot checks passed.')
