import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import contactHandler from './api/contact.js'

function localContactApi() {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (request, response) => {
        const chunks = []
        request.on('data', (chunk) => chunks.push(chunk))
        request.on('end', async () => {
          try {
            request.body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}
          } catch {
            response.statusCode = 400
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ error: 'Invalid request body.' }))
            return
          }

          const apiResponse = {
            statusCode: 200,
            setHeader: (name, value) => response.setHeader(name, value),
            status(code) {
              this.statusCode = code
              return this
            },
            json(payload) {
              response.statusCode = this.statusCode
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify(payload))
              return this
            },
          }

          try {
            await contactHandler(request, apiResponse)
          } catch (error) {
            console.error('Local contact endpoint failed:', error)
            apiResponse.status(500).json({ error: 'We could not send your message. Please try again shortly.' })
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // Server-only variables are loaded for the local contact API; they are never sent to the browser.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), localContactApi()],
  }
})
