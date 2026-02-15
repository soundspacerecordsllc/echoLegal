# EchoLegal Quick Start

## Deploy in 30 Minutes

### 1. Get Stripe Payment Links (15 min)

1. Login to Stripe: https://dashboard.stripe.com
2. Create product "NDA Template" - $20
3. Create payment link → After payment redirect to: `https://echo-legal.com/download-success`
4. Copy payment link
5. Repeat for Service Agreement

### 2. Deploy to Vercel (10 min)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial EchoLegal"
git remote add origin https://github.com/YOUR-USERNAME/echolegal.git
git push -u origin main
```

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import from GitHub
4. Add environment variables:
   ```
   NEXT_PUBLIC_STRIPE_NDA_LINK=https://buy.stripe.com/YOUR-LINK
   NEXT_PUBLIC_SITE_URL=https://echo-legal.com
   ```
5. Click "Deploy"

### 3. Connect Domain (5 min)

In Vercel:
1. Settings → Domains → Add `echo-legal.com`

In your domain provider:
1. Add A record: `@` → `76.76.21.21`
2. Add CNAME: `www` → `cname.vercel-dns.com`

The site will be live at echo-legal.com once DNS propagation completes.

---

## Test Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Adding New Contracts (10 min each)

1. Copy `app/[lang]/contracts/nda/page.tsx`
2. Rename to your contract
3. Edit content (title, description, clauses)
4. Add to `app/[lang]/contracts/page.tsx` list
5. Create Stripe payment link
6. Git push

---

## Additional Resources

Refer to README.md for:
- Complete documentation
- Troubleshooting
- Payment setup details
- Content management

**Support**: support@echo-legal.com
