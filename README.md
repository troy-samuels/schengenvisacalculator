# 🌍 SchengenTracker

A focused Schengen 90/180 compliance calculator with unique family tracking features. Ensure your family stays compliant and avoid costly overstay fines with professional documentation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/troy-samuels/schengenvisacalculator)

## ✨ Features

### Core Compliance Tools
- **🧮 Precise 90/180 Calculation**: 100% EU-compliant calculations with zero tolerance for errors
- **🚫 Date Overlap Prevention**: Visual indicators prevent scheduling conflicts across trips
- **📅 Unlimited Trip Tracking**: Plan and track multiple European trips with confidence
- **⚡ Real-time Compliance**: Instant feedback on your Schengen compliance status

### Family-First Features (Premium)
- **👨‍👩‍👧‍👦 Family Tracking**: Coordinate up to 4 family members' compliance in one account
- **🔗 Shared Trip Planning**: Visual coordination for family travel planning
- **📧 Smart Alerts**: Email notifications before potential overstay situations
- **📄 Professional Reports**: PDF compliance documentation for border officials

### Premium Experience
- **📱 Mobile-Optimized**: Touch-friendly design with 44px minimum targets
- **🔒 Enterprise Security**: Zero vulnerabilities, secure authentication
- **💾 Offline Support**: PWA with offline calculation capability
- **🎯 Ad-Free Experience**: Clean interface for premium users

## 🎯 Live Demo

🔗 **[Try it now →](https://schengentracker.com)**

## 💰 Pricing

- **FREE**: Basic calculator, 5 trip limit, screenshot export
- **LIFETIME** (£4.99 one-time): Unlimited trips, family tracking, PDF reports, email alerts
- **ANNUAL** (£2.99/year): All lifetime features + SMS alerts, priority support, regulatory updates

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase) with Row Level Security
- **Authentication**: Supabase Auth with enterprise security
- **Payments**: Stripe integration for lifetime and annual subscriptions
- **Deployment**: Vercel with automatic GitHub deployments

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/troy-samuels/schengenvisacalculator.git
   cd schengenvisacalculator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

   Add your credentials to `.env.local`:
   ```env
   # Supabase Database & Auth
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe Payment Processing
   STRIPE_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Pricing Tiers
   STRIPE_PRICE_LIFETIME=price_lifetime_4_99
   STRIPE_PRICE_ANNUAL=price_annual_2_99
   ```

4. **Set up the database**:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the scripts from the `scripts/` folder in order:
     ```sql
     -- Run these in your Supabase SQL Editor:
     scripts/setup-database-fixed.sql
     scripts/update-profile-schema.sql
     scripts/verify-user-profile-trigger.sql
     ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Visit `http://localhost:3000` to see the application.

## 📊 Database Schema

The application uses these main tables:

| Table | Description |
|-------|-------------|
| `profiles` | User profiles with subscription tier and family settings |
| `subscriptions` | Stripe subscription management for lifetime/annual tiers |
| `countries` | Schengen area country data with flags |
| `visa_entries` | Individual travel entries with date conflict prevention |
| `family_members` | Family tracking with shared compliance coordination |
| `alerts` | Smart notification system for overstay prevention |

## 🧪 Testing

We maintain 100% EU compliance through comprehensive testing:

```bash
npm test              # Run fast test suite
npm run test:full     # Complete test suite with performance tests
npm run test:eu       # EU compliance tests only (MANDATORY 100% pass)
npm run validate      # Run all validation tests
npm run benchmark     # Performance benchmarking
```

**Critical Requirements:**
- EU compliance tests must always pass 100% (legal requirement)
- Date overlap prevention must be 100% accurate (core feature)
- Family coordination must work across all devices (competitive advantage)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/troy-samuels/schengenvisacalculator)

1. **One-click deploy** using the button above, or:
2. **Manual deployment**:
   ```bash
   npm run build
   npx vercel --prod
   ```
3. **Set environment variables** in Vercel dashboard (including Stripe keys)
4. **Connect GitHub** for automatic deployments

### Other Platforms

The app can also be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- Any Node.js hosting service

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Development Guidelines

- **Accuracy First**: 100% EU compliance is non-negotiable
- **Family-Centric**: Multi-person tracking is primary competitive advantage
- **Mobile-First**: Every feature must work flawlessly on mobile (44px touch targets)
- **TypeScript**: Use strict typing for calculation accuracy
- **Testing**: All changes must pass EU compliance tests
- **Documentation**: Update docs for any feature changes

## 📈 Business Model

SchengenTracker is a focused compliance tool with sustainable monetization:

- **Target Market**: Families and professionals traveling frequently to Europe
- **Unique Value**: Family coordination features no competitor offers
- **Revenue Model**: £4.99 lifetime + £2.99/year + B2B corporate expansion
- **Growth Strategy**: Organic SEO and word-of-mouth referrals

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Disclaimer

**This tool provides compliance estimates only.** Schengen visa rules can be complex and subject to change. Always:

- ✅ Consult official embassy websites
- ✅ Verify with immigration lawyers for complex cases
- ✅ Check current visa requirements before travel
- ✅ Keep official documentation of your travels
- ✅ Use our PDF compliance reports for border crossings

## 🙏 Acknowledgments

- **EU Schengen Agreement** for enabling visa-free European travel
- **shadcn/ui** for beautiful, accessible components
- **Supabase** for secure backend infrastructure and authentication
- **Stripe** for seamless payment processing
- **Vercel** for reliable deployment and hosting
- **Travel families** for feedback on family coordination features

## 📞 Support

- 🐛 **Bug reports**: [Create an issue](https://github.com/troy-samuels/schengenvisacalculator/issues)
- 💡 **Feature requests**: [Start a discussion](https://github.com/troy-samuels/schengenvisacalculator/discussions)
- 📧 **Business inquiries**: info@schengentracker.com
- 🏢 **Corporate accounts**: Looking for team features? Contact us about our B2B solutions.

---

**Made with ❤️ for traveling families worldwide** 🌍✈️

*Keep your family compliant and travel with confidence!* 👨‍👩‍👧‍👦🎒