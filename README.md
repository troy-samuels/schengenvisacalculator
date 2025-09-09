# 🌍 ETIAS Calculator

A professional ETIAS and Schengen visa calculator for the 90/180-day rule. Track your trips, ensure compliance, and plan European travel with confidence.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/troy-samuels/schengenvisacalculator)

## ✨ Features

- **🧮 Smart Visa Calculation**: Automatically calculates days remaining in your 90/180 day Schengen allowance
- **📅 Trip Planning**: Plan multiple trips with visual progress tracking
- **👤 User Accounts**: Save and sync your travel history across devices
- **⚡ Real-time Compliance**: Instant feedback on visa compliance status
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **🔒 Secure Authentication**: Powered by Supabase Auth

## 🎯 Live Demo

🔗 **[Try it now →](https://etiascalculator.com)**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth with Google OAuth
- **Deployment**: Vercel with automatic GitHub deployments

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)

### Installation

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/troy-samuels/schengenvisacalculator.git
   cd schengenvisacalculator
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your Supabase credentials to `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   \`\`\`

4. **Set up the database**:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the scripts from the `scripts/` folder in order:
     \`\`\`sql
     -- Run these in your Supabase SQL Editor:
     scripts/setup-database-fixed.sql
     scripts/update-profile-schema.sql
     scripts/verify-user-profile-trigger.sql
     \`\`\`

5. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**:
   Visit `http://localhost:3000` to see the application.

## 📊 Database Schema

The application uses these main tables:

| Table | Description |
|-------|-------------|
| `profiles` | User profile information and preferences |
| `countries` | Schengen area country data with flags |
| `visa_entries` | Individual travel entries and dates |
| `trip_collections` | Grouped trips for better organization |

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | ✅ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | ✅ Yes |

### Supabase Setup

1. Create a new Supabase project
2. Enable Authentication → Providers → Google (optional)
3. Run the SQL scripts in the `scripts/` folder
4. Copy your project URL and API keys to `.env.local`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/troy-samuels/schengenvisacalculator)

1. **One-click deploy** using the button above, or:
2. **Manual deployment**:
   \`\`\`bash
   npm run build
   npx vercel --prod
   \`\`\`
3. **Set environment variables** in Vercel dashboard
4. **Connect GitHub** for automatic deployments

### Other Platforms

The app can also be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- Any Node.js hosting service

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Use TypeScript for type safety
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure mobile responsiveness

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Disclaimer

**This tool provides estimates only.** Schengen visa rules can be complex and subject to change. Always:

- ✅ Consult official embassy websites
- ✅ Verify with immigration lawyers for complex cases
- ✅ Check current visa requirements before travel
- ✅ Keep official documentation of your travels

## 🙏 Acknowledgments

- **Schengen Agreement** countries for visa-free travel
- **shadcn/ui** for beautiful, accessible components
- **Supabase** for backend infrastructure and auth
- **Vercel** for seamless deployment and hosting
- **Travel community** for feedback and feature requests

## 📞 Support

- 🐛 **Bug reports**: [Create an issue](https://github.com/troy-samuels/schengenvisacalculator/issues)
- 💡 **Feature requests**: [Start a discussion](https://github.com/troy-samuels/schengenvisacalculator/discussions)
- 📧 **Contact**: [Your email or contact method]

---

**Made with ❤️ for travelers worldwide** 🌍✈️

*Happy travels and stay compliant!* 🎒
