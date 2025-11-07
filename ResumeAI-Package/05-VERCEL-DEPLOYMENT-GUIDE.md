# 🚀 Complete Vercel Deployment & Stripe Integration Guide

## Part 1: Deploy to Vercel (30 minutes)

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Add Stripe integration and prepare for deployment"

# Create a new repository on GitHub (github.com/new)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/resumeai.git
git branch -M main
git push -u origin main
```

### Step 2: Create Vercel Account & Deploy

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" → Choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Click "New Project"
5. Select your `resumeai` repository
6. Click "Import"
7. Vercel will auto-detect Next.js settings
8. Click "Deploy"

**Your app will be live at:** `resumeai.vercel.app`

### Step 3: Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_YOUR_KEY
STRIPE_SECRET_KEY = sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET = whsec_YOUR_KEY
NEXT_PUBLIC_APP_URL = https://resumeai.vercel.app
```

4. Click "Save"
5. Redeploy: Click "Deployments" → Click the latest deployment → Click "Redeploy"

---

## Part 2: Set Up Stripe (1 hour)

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Click "Start now"
3. Sign up with your email
4. Verify your email
5. Complete your account setup

### Step 2: Get Your API Keys

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Click "Developers" in the left sidebar
3. Click "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

5. Copy both keys and save them somewhere safe

### Step 3: Create a Product & Price

1. In Stripe dashboard, click "Products" in the left sidebar
2. Click "Create product"
3. Fill in:
   - **Name:** ResumeAI Pro
   - **Description:** Unlimited resume analyses with detailed feedback
   - **Type:** Service
4. Click "Create product"
5. Scroll down to "Pricing" section
6. Click "Add pricing"
7. Fill in:
   - **Price:** 9.00
   - **Billing period:** Monthly
   - **Currency:** USD
8. Click "Create price"
9. Copy the **Price ID** (starts with `price_`)

### Step 4: Update Your Code with Price ID

Edit `/home/code/resume-optimizer/components/pricing-section.tsx`:

Find this line:
```typescript
priceId: 'price_1QaXXXXXXXXXXXXX', // Replace with actual Stripe price ID
```

Replace with your actual Price ID:
```typescript
priceId: 'price_YOUR_ACTUAL_ID_HERE',
```

### Step 5: Set Up Webhook

1. In Stripe dashboard, click "Webhooks" in the left sidebar
2. Click "Add endpoint"
3. Fill in:
   - **Endpoint URL:** `https://resumeai.vercel.app/api/webhooks/stripe`
   - **Events to send:** Select these events:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
4. Click "Add endpoint"
5. Click on the endpoint you just created
6. Scroll down to "Signing secret"
7. Click "Reveal" and copy the secret (starts with `whsec_`)

### Step 6: Add Webhook Secret to Vercel

1. Go back to Vercel project settings
2. Click "Environment Variables"
3. Add:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** Your webhook secret from Step 5
4. Click "Save"
5. Redeploy your app

---

## Part 3: Test Everything (30 minutes)

### Test Stripe Checkout

1. Go to your live app: `https://resumeai.vercel.app`
2. Scroll to pricing section
3. Click "Start Free Trial" on Pro tier
4. Enter test email: `test@example.com`
5. Click "Start Free Trial"
6. You'll be redirected to Stripe checkout

### Use Stripe Test Card

On the Stripe checkout page:
- **Card Number:** `4242 4242 4242 4242`
- **Expiry:** Any future date (e.g., `12/25`)
- **CVC:** Any 3 digits (e.g., `123`)
- **Name:** Any name
- **Email:** Your email

Click "Pay" → You should see success page!

### Verify in Stripe Dashboard

1. Go to Stripe dashboard
2. Click "Customers" → You should see your test customer
3. Click "Subscriptions" → You should see the subscription
4. Click "Events" → You should see webhook events

---

## Part 4: Go Live with Real Payments (Optional)

### Switch to Live Keys

1. In Stripe dashboard, toggle "View test data" OFF (top right)
2. Go to "Developers" → "API keys"
3. Copy your **Live** keys (start with `pk_live_` and `sk_live_`)
4. Update Vercel environment variables with live keys
5. Redeploy

⚠️ **WARNING:** Live keys will charge real credit cards. Only do this when ready!

---

## Troubleshooting

### "Webhook signature verification failed"

- Make sure `STRIPE_WEBHOOK_SECRET` is set correctly in Vercel
- Redeploy after adding the secret
- Check that webhook URL is exactly: `https://resumeai.vercel.app/api/webhooks/stripe`

### "Failed to create checkout session"

- Check that `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set in Vercel
- Make sure Price ID is correct in `pricing-section.tsx`
- Check browser console for errors

### Payments not showing in Stripe

- Check Stripe dashboard → Events for webhook errors
- Make sure webhook endpoint is active
- Verify webhook secret is correct

---

## What's Next?

After deployment and Stripe setup:

1. ✅ Your app is live and accepting payments
2. ✅ Users can subscribe to Pro tier ($9/month)
3. ✅ You're making money!

### Next improvements:
- Add user authentication (Clerk)
- Add database to store user data
- Integrate Gemini API for real AI analysis
- Add email notifications

---

## Quick Reference

| Item | Value |
|------|-------|
| Live URL | https://resumeai.vercel.app |
| Stripe Dashboard | https://dashboard.stripe.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| API Endpoint | /api/create-checkout-session |
| Webhook Endpoint | /api/webhooks/stripe |

---

## Support

- Vercel Docs: https://vercel.com/docs
- Stripe Docs: https://stripe.com/docs
- Next.js Docs: https://nextjs.org/docs

Good luck! 🚀
