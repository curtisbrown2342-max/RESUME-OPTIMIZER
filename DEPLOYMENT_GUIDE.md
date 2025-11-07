# 🚀 Deployment Guide - ResumeAI

**Current Status**: Running locally on port 3000  
**Goal**: Deploy to production and start accepting payments

---

## 📋 Pre-Deployment Checklist

- ✅ App is fully functional
- ✅ Zero console errors
- ✅ Responsive design tested
- ✅ SEO metadata configured
- ✅ Logo and OG image added
- ⏳ Ready for production deployment

---

## 🌐 Option 1: Deploy to Vercel (Recommended)

**Why Vercel?**
- ✅ Built for Next.js (optimal performance)
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Built-in analytics
- ✅ Edge functions support
- ✅ Custom domains

### Step 1: Push to GitHub

```bash
# Initialize git repo
cd /home/code/resume-optimizer
git init
git add .
git commit -m "Initial commit: ResumeAI SaaS"

# Create GitHub repo and push
# (Create repo at github.com/new, then:)
git remote add origin https://github.com/YOUR_USERNAME/resume-optimizer.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"
5. Wait for deployment (usually < 2 minutes)

**Result**: Your app is live at `https://resume-optimizer.vercel.app`

### Step 3: Add Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain (e.g., `resumeai.com`)
3. Update DNS records at your domain registrar
4. Wait for DNS propagation (5-30 minutes)

---

## 💳 Step 4: Add Stripe Payment Integration

### 4.1 Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Sign up for free account
3. Get your API keys from Dashboard → API Keys
4. Copy `Publishable Key` and `Secret Key`

### 4.2 Add Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

### 4.3 Install Stripe

```bash
npm install @stripe/react-js @stripe/js stripe
```

### 4.4 Create Checkout Page

Create `app/checkout/page.tsx`:

```typescript
'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: 'price_YOUR_PRICE_ID' }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    
    await stripe?.redirectToCheckout({ sessionId });
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Upgrade to Pro</h1>
      <Button 
        onClick={handleCheckout} 
        disabled={loading}
        size="lg"
      >
        {loading ? 'Loading...' : 'Subscribe Now - $9/month'}
      </Button>
    </div>
  );
}
```

### 4.5 Create Checkout API Route

Create `app/api/checkout/route.ts`:

```typescript
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { priceId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  });

  return NextResponse.json({ sessionId: session.id });
}
```

### 4.6 Create Webhook Handler

Create `app/api/webhooks/stripe/route.ts`:

```typescript
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle events
  switch (event.type) {
    case 'customer.subscription.created':
      // User subscribed - update database
      console.log('Subscription created:', event.data.object);
      break;
    case 'customer.subscription.deleted':
      // User cancelled - update database
      console.log('Subscription deleted:', event.data.object);
      break;
  }

  return NextResponse.json({ received: true });
}
```

### 4.7 Update Pricing Page

Update the pricing page to link to checkout:

```typescript
<Button onClick={() => router.push('/checkout')}>
  Start Free Trial
</Button>
```

---

## 🔐 Step 5: Add User Authentication (Clerk)

### 5.1 Create Clerk Account

1. Go to [clerk.com](https://clerk.com)
2. Sign up for free
3. Create a new application
4. Get your API keys

### 5.2 Install Clerk

```bash
npm install @clerk/nextjs
```

### 5.3 Add Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY
CLERK_SECRET_KEY=sk_test_YOUR_KEY
```

### 5.4 Wrap App with Clerk Provider

Update `app/layout.tsx`:

```typescript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### 5.5 Protect Routes

```typescript
import { auth } from '@clerk/nextjs';

export default async function ProtectedPage() {
  const { userId } = auth();
  
  if (!userId) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {userId}!</div>;
}
```

---

## 🤖 Step 6: Add Gemini API Integration

### 6.1 Get Gemini API Key

1. Go to [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key"
3. Create new API key
4. Copy the key

### 6.2 Install Gemini SDK

```bash
npm install @google/generative-ai
```

### 6.3 Add Environment Variable

```env
GEMINI_API_KEY=your_api_key_here
```

### 6.4 Update Analysis API

Update `app/api/analyze-resume/route.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  const { resume } = await request.json();

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze this resume and provide:
1. ATS compatibility score (0-100)
2. Top 5 strengths (as JSON array)
3. Top 5 areas for improvement (as JSON array)
4. Specific keywords to add
5. Industry-specific recommendations

Resume:
${resume}

Respond in JSON format:
{
  "atsScore": number,
  "strengths": ["strength1", "strength2", ...],
  "improvements": ["improvement1", "improvement2", ...],
  "keywords": ["keyword1", "keyword2", ...],
  "recommendations": "text"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const analysis = JSON.parse(text);

  return NextResponse.json(analysis);
}
```

---

## 📊 Step 7: Add Database (PostgreSQL)

### 7.1 Create Database

```bash
createdb -h localhost resume_ai
```

### 7.2 Install Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

### 7.3 Configure Database URL

```env
DATABASE_URL="postgresql://user:password@localhost:5432/resume_ai"
```

### 7.4 Create Schema

Create `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id String @id @default(cuid())
  clerkId String @unique
  email String @unique
  name String?
  subscription String @default("free")
  createdAt DateTime @default(now())
  analyses Analysis[]
}

model Analysis {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  resumeText String
  atsScore Int
  strengths String[]
  improvements String[]
  createdAt DateTime @default(now())
}
```

### 7.5 Run Migrations

```bash
npx prisma migrate dev --name init
```

---

## 🚀 Final Deployment Steps

### 1. Test Locally

```bash
npm run dev
# Visit http://localhost:3000
# Test all features
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Add Stripe, Clerk, Gemini, and database"
git push origin main
```

### 3. Deploy to Vercel

1. Vercel automatically deploys on push
2. Add environment variables in Vercel dashboard
3. Wait for deployment
4. Test live site

### 4. Add Stripe Webhook

1. In Stripe dashboard, go to Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `customer.subscription.created`, `customer.subscription.deleted`
4. Copy webhook secret to `.env.local`

### 5. Monitor & Optimize

- Check Vercel analytics
- Monitor Stripe dashboard
- Track user signups in Clerk
- Monitor database performance

---

## 📈 Success Metrics

After deployment, track:

- **Daily Active Users**: Target 10+ by week 1
- **Conversion Rate**: Target 5-10% free → paid
- **MRR**: Monthly Recurring Revenue
- **Churn Rate**: Target < 5%
- **Customer Acquisition Cost**: Track ad spend

---

## 🆘 Troubleshooting

### Issue: Stripe payment not working
- Check API keys in `.env.local`
- Verify webhook is configured
- Check Stripe dashboard for errors

### Issue: Clerk authentication failing
- Verify API keys
- Check ClerkProvider is wrapping app
- Clear browser cache

### Issue: Gemini API errors
- Verify API key is valid
- Check rate limits
- Ensure prompt format is correct

### Issue: Database connection failing
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Run `npx prisma db push`

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Clerk Docs**: https://clerk.com/docs
- **Gemini Docs**: https://ai.google.dev/docs
- **Prisma Docs**: https://www.prisma.io/docs

---

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Vercel project deployed
- [ ] Custom domain configured
- [ ] Stripe account created
- [ ] Stripe API keys added to Vercel
- [ ] Clerk account created
- [ ] Clerk API keys added to Vercel
- [ ] Gemini API key added to Vercel
- [ ] PostgreSQL database created
- [ ] Prisma migrations run
- [ ] Stripe webhook configured
- [ ] All features tested on production
- [ ] Analytics configured
- [ ] Monitoring set up

---

**Estimated Time**: 2-3 hours for full deployment  
**Cost**: Free tier available for all services (Vercel, Stripe, Clerk, Gemini)

**Next**: Start marketing and acquiring users! 🎉

