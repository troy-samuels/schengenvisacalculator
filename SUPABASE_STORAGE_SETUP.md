# Supabase Storage Setup for EES Guide PDF

## Overview

This guide walks you through setting up Supabase Storage to host the EES Readiness Quick Card PDF for purchasers.

---

## Step 1: Create Storage Bucket

1. Go to **Supabase Dashboard** → Your Project
2. Navigate to **Storage** in the left sidebar
3. Click **"Create a new bucket"**

### Bucket Configuration:

```
Bucket Name: ees_products
Public Bucket: NO (private - access controlled by RLS)
File Size Limit: 10 MB
Allowed MIME Types: application/pdf
```

Click **Create Bucket**

---

## Step 2: Set Row Level Security (RLS) Policies

After creating the bucket, you need to set policies so only purchasers can access the files.

### Navigate to: Storage → ees_products → Policies

Click **"New Policy"** and create the following policies:

### Policy 1: Allow Purchasers to Download

**Policy Name:** `Purchasers can download EES Guide`

**Target Roles:** `authenticated`

**Policy Definition (SELECT):**

```sql
CREATE POLICY "Purchasers can download EES Guide"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'ees_products'
  AND auth.uid() IN (
    SELECT user_id
    FROM public.purchases
    WHERE product = 'ees_guide'
      AND status = 'paid'
  )
);
```

### Policy 2: Admin Upload Access (Optional)

**Policy Name:** `Admins can upload guides`

**Target Roles:** `service_role`

**Policy Definition (INSERT):**

```sql
CREATE POLICY "Admins can upload guides"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'ees_products'
);
```

---

## Step 3: Generate the EES Quick Card PDF

You have two options:

### Option A: Generate Locally (Recommended)

Create a test page to generate and download the PDF:

```bash
# Create a test page
# Visit: http://localhost:3000/admin/generate-ees-pdf
```

**File:** `packages/app/src/app/admin/generate-ees-pdf/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { EESQuickCardGenerator } from '@/lib/services/ees-quick-card-generator'

export default function GenerateEESPDF() {
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const pdfBlob = await EESQuickCardGenerator.generateQuickCard({
        purchasedBy: 'EU Border Authority',
        purchaseDate: new Date(),
      })

      // Download the generated PDF
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'ees-quick-card-v1.pdf'
      a.click()
      URL.revokeObjectURL(url)

      alert('PDF generated successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Generate EES Quick Card PDF</h1>
      <button
        onClick={handleGenerate}
        disabled={generating}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {generating ? 'Generating...' : 'Generate & Download PDF'}
      </button>
    </div>
  )
}
```

### Option B: Server-Side Generation Script

**File:** `scripts/generate-ees-pdf.ts`

```typescript
import { writeFileSync } from 'fs'
import { join } from 'path'

async function generatePDF() {
  // Import the generator
  const { EESQuickCardGenerator } = await import(
    '../packages/app/src/lib/services/ees-quick-card-generator'
  )

  const pdfBlob = await EESQuickCardGenerator.generateQuickCard({
    purchasedBy: 'EU Border Authority',
    purchaseDate: new Date(),
  })

  // Convert blob to buffer
  const buffer = Buffer.from(await pdfBlob.arrayBuffer())

  // Save to file
  const outputPath = join(__dirname, '../ees-quick-card-v1.pdf')
  writeFileSync(outputPath, buffer)

  console.log(`✅ PDF generated: ${outputPath}`)
}

generatePDF().catch(console.error)
```

Run with: `npx tsx scripts/generate-ees-pdf.ts`

---

## Step 4: Upload PDF to Supabase Storage

### Via Supabase Dashboard (Easiest):

1. Go to **Supabase Dashboard** → **Storage** → **ees_products**
2. Click **Upload file**
3. Select your generated `ees-quick-card-v1.pdf`
4. Click **Upload**

### Via API (Programmatic):

```typescript
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const pdfBuffer = readFileSync('./ees-quick-card-v1.pdf')

const { data, error } = await supabase.storage
  .from('ees_products')
  .upload('ees-quick-card-v1.pdf', pdfBuffer, {
    contentType: 'application/pdf',
    upsert: true, // Overwrite if exists
  })

if (error) {
  console.error('Upload failed:', error)
} else {
  console.log('✅ Upload successful:', data)
}
```

---

## Step 5: Verify Download Flow

### Test the Complete Flow:

1. **Purchase Test:**
   ```bash
   # Use Stripe test mode
   # Card: 4242 4242 4242 4242
   # CVC: Any 3 digits
   # Date: Any future date
   ```

2. **Check Purchase Record:**
   ```sql
   SELECT * FROM purchases WHERE product = 'ees_guide' ORDER BY created_at DESC LIMIT 1;
   ```

3. **Test Download:**
   - Navigate to: `https://your-app.com/ees/guide/download`
   - Click "Download PDF Quick Card"
   - Should receive the PDF file

4. **Check Signed URL:**
   ```bash
   curl -X GET https://your-app.com/api/ees-guide/download \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

---

## Step 6: Environment Variables

Ensure these are set in `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_PRICE_EES_GUIDE=price_xxxxxx  # Your EES Guide price ID
```

---

## Troubleshooting

### Error: "Bucket not found"
**Solution:** Create the `ees_products` bucket in Supabase Dashboard

### Error: "Row Level Security policy violation"
**Solution:** Verify the RLS policies are created correctly. Check:
```sql
SELECT * FROM storage.objects WHERE bucket_id = 'ees_products';
```

### Error: "File not found"
**Solution:** Ensure `ees-quick-card-v1.pdf` is uploaded to the bucket

### Download returns 403
**Solution:** Verify user has a purchase record:
```sql
SELECT * FROM purchases WHERE user_id = 'user-id-here' AND product = 'ees_guide';
```

### Signed URL expires
**Solution:** URLs expire after 24 hours. Users can re-download from the download page

---

## File Structure

```
ees_products/
└── ees-quick-card-v1.pdf   # Main product file (2-4 MB)
```

**Future Expansion:**
```
ees_products/
├── ees-quick-card-v1.pdf
├── ees-complete-guide-v1.pdf   # Future: Full guide
├── country-guides/
│   ├── france-ees-guide.pdf
│   └── germany-ees-guide.pdf
└── templates/
    └── ees-checklist-template.pdf
```

---

## Security Checklist

- ✅ Bucket is **private** (not public)
- ✅ RLS policies restrict access to purchasers only
- ✅ Service role key is kept secure (not in client-side code)
- ✅ Signed URLs have 24-hour expiry
- ✅ Purchase verification happens server-side

---

## Next Steps

1. Generate the PDF using Option A or B
2. Upload to `ees_products` bucket
3. Test the download flow
4. Monitor download analytics
5. Update PDF when EES regulations change

**Generated:** 2025-10-07
**Status:** Ready for Production
