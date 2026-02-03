// app/api/webhooks/stripe/route.ts
// Stripe webhook handler — sends delivery email after successful payment

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

const resend = new Resend(process.env.RESEND_API_KEY)

const DOWNLOAD_URL = process.env.KIT_DOWNLOAD_URL || 'https://echo-legal.com/documents/kits/abd-business-starter-kit.zip'
const SUPPORT_EMAIL = 'support@echo-legal.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'EchoLegal <noreply@echo-legal.com>'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${message}`)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email
    if (!customerEmail) {
      console.error('No customer email in checkout session:', session.id)
      return NextResponse.json({ received: true })
    }

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: customerEmail,
        subject: 'Your Legal Kit is Ready | Legal Kit\'iniz Hazır — EchoLegal',
        html: buildDeliveryEmail(DOWNLOAD_URL),
      })

      console.log(`Delivery email sent to ${customerEmail} for session ${session.id}`)
    } catch (err) {
      console.error('Failed to send delivery email:', err)
    }
  }

  return NextResponse.json({ received: true })
}

function buildDeliveryEmail(downloadUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#f9fafb; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px; border-bottom:1px solid #e5e7eb;">
              <h1 style="margin:0; font-size:20px; font-weight:700; color:#111827;">EchoLegal</h1>
            </td>
          </tr>

          <!-- English Section -->
          <tr>
            <td style="padding:32px 40px 16px;">
              <h2 style="margin:0 0 16px; font-size:18px; font-weight:600; color:#111827;">Thank you for your purchase.</h2>
              <p style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#374151;">
                Your US Business Starter Legal Kit is ready to download. It includes three bilingual (EN/TR) legal templates:
              </p>
              <ul style="margin:0 0 16px; padding-left:20px; font-size:14px; line-height:1.8; color:#374151;">
                <li>Operating Agreement</li>
                <li>Service Agreement</li>
                <li>Non-Disclosure Agreement (NDA)</li>
              </ul>
              <a href="${downloadUrl}" style="display:inline-block; padding:12px 28px; background-color:#111827; color:#ffffff; font-size:14px; font-weight:600; text-decoration:none; border-radius:6px;">
                Download Legal Kit
              </a>
              <p style="margin:12px 0 0; font-size:12px; color:#6b7280; line-height:1.5;">
                If the link doesn&rsquo;t open, please copy/paste it into your browser.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;">
            </td>
          </tr>

          <!-- Turkish Section -->
          <tr>
            <td style="padding:0 40px 32px;">
              <h2 style="margin:0 0 16px; font-size:18px; font-weight:600; color:#111827;">Sat&#305;n al&#305;m&#305;n&#305;z i&#231;in te&#351;ekk&#252;r ederiz.</h2>
              <p style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#374151;">
                ABD Business Starter Legal Kit&rsquo;iniz indirilmeye haz&#305;r. Kit, iki dilli (EN/TR) &#252;&#231; hukuki &#351;ablon i&#231;erir:
              </p>
              <ul style="margin:0 0 16px; padding-left:20px; font-size:14px; line-height:1.8; color:#374151;">
                <li>LLC Ortakl&#305;k S&#246;zle&#351;mesi (Operating Agreement)</li>
                <li>Hizmet S&#246;zle&#351;mesi (Service Agreement)</li>
                <li>Gizlilik S&#246;zle&#351;mesi (NDA)</li>
              </ul>
              <a href="${downloadUrl}" style="display:inline-block; padding:12px 28px; background-color:#111827; color:#ffffff; font-size:14px; font-weight:600; text-decoration:none; border-radius:6px;">
                Legal Kit&rsquo;i &#304;ndir
              </a>
              <p style="margin:12px 0 0; font-size:12px; color:#6b7280; line-height:1.5;">
                Ba&#287;lant&#305; a&#231;&#305;lmazsa linki taray&#305;c&#305;n&#305;za kopyalay&#305;p yap&#305;&#351;t&#305;rmay&#305; deneyin.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px; background-color:#f9fafb; border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 8px; font-size:12px; color:#6b7280; line-height:1.5;">
                Questions? / Sorularınız mı var?
                <a href="mailto:${SUPPORT_EMAIL}" style="color:#111827; text-decoration:underline;">${SUPPORT_EMAIL}</a>
              </p>
              <p style="margin:0; font-size:11px; color:#9ca3af; line-height:1.5;">
                EchoLegal provides legal information and self-help resources. This is not legal advice and does not create an attorney-client relationship.<br>
                EchoLegal hukuki bilgi ve ki&#351;isel kullan&#305;m ama&#231;l&#305; kaynaklar sunar. Bu i&#231;erik hukuki dan&#305;&#351;manl&#305;k de&#287;ildir ve avukat-m&#252;vekkil ili&#351;kisi olu&#351;turmaz.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
