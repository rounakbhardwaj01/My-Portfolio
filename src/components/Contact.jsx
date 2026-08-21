import { useState } from 'react'
import { personal } from '../data/personal'
import { ArrowIcon, GithubIcon, LinkedinIcon, MailIcon } from './icons'
import { SectionHeading } from './SectionHeading'

const initialFields = { name: '', email: '', message: '', company: '' }

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Please enter your name.'
  if (!fields.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Please enter a valid email address.'
  if (!fields.message.trim()) errors.message = 'Please write a message.'
  else if (fields.message.trim().length > 5000) errors.message = 'Please keep your message under 5,000 characters.'
  return errors
}

export function Contact({ endpoint }) {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [notice, setNotice] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFields((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      setStatus('error')
      setNotice('Please correct the highlighted fields.')
      return
    }

    setStatus('sending')
    setNotice('')
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fields) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'We could not send your message. Please try again.')
      setFields(initialFields)
      setStatus('success')
      setNotice(result.message)
    } catch (error) {
      setStatus('error')
      setNotice(error.message || 'We could not send your message. Please try again.')
    }
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <SectionHeading eyebrow="Contact" title="Let’s Build Together.">Reach out for opportunities, collaborations, projects, or simply to connect.</SectionHeading>
      <div className="contact-grid">
        <div className="contact-details"><p>Whether you have an idea to explore or an opportunity to discuss, I’d be glad to hear from you.</p><a className="contact-email" href={`mailto:${personal.email}`}><MailIcon />{personal.email}</a><div className="contact-socials"><a href={personal.social.github} target="_blank" rel="noreferrer"><GithubIcon />GitHub</a><a href={personal.social.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon />LinkedIn</a></div></div>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="honeypot" aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" value={fields.company} onChange={handleChange} autoComplete="off" tabIndex="-1" /></div>
          <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" value={fields.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} autoComplete="name" disabled={status === 'sending'} />{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}</div>
          <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" value={fields.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} autoComplete="email" disabled={status === 'sending'} />{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div>
          <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" rows="5" value={fields.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} disabled={status === 'sending'} />{errors.message && <p id="message-error" className="field-error">{errors.message}</p>}</div>
          {notice && <p className={`form-notice ${status}`} role="status">{notice}</p>}
          <button className="button button-primary" type="submit" disabled={status === 'sending'}><span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span><ArrowIcon /></button>
        </form>
      </div>
    </section>
  )
}
