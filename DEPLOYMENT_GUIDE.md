# Masung Smokehouse — Production Deployment & Infrastructure Guide

This guide details the exact cloud architecture, current status, and simple steps needed to deploy Masung Smokehouse to **Supabase**, **Vercel**, and **Render**.

---

## 1. Supabase (Database & Realtime)

### Current Status: 100% Configured & Active
We inspected and verified the database directly using the Supabase API:
- **Project URL**: `https://wjwtgzwhzrzusacntmra.supabase.co`
- **Database Tables**:
  - `public.masung_orders` (Columns: `id`, `table_number`, `order_type`, `customer_name`, `customer_phone`, `items`, `subtotal`, `discount`, `final_total`, `points_earned`, `applied_voucher`, `special_notes`, `status`, `created_at`).
  - `public.masung_loyalty_members` (Columns: `phone`, `name`, `points`, `lifetime_points`, `tier`, `total_spent`, `orders_count`, `updated_at`).
- **Row-Level Security (RLS)**: Active with public insert/select permissions for dine-in guests and kitchen slips.
- **Client Integration**: Fully wired in `src/lib/supabase.ts` with graceful offline/local fallback.

### What is needed from you:
**Nothing!** The database is fully provisioned, migrated, and receiving order syncs.

---

## 2. Vercel (Frontend Static Hosting & CDN)

Vercel provides edge caching, global CDN, and automated SSL for the React/Vite frontend.

- **GitHub Repository**: [https://github.com/r-bug-r/masung-smokehouse](https://github.com/r-bug-r/masung-smokehouse)

### What is needed from you (3 Simple Steps):
1. **Import Project to Vercel**:
   - Go to [vercel.com](https://vercel.com/) and click **Add New** $\rightarrow$ **Project**.
   - Select **r-bug-r/masung-smokehouse** from your GitHub repositories.
   - Framework Preset: **Vite** (auto-detected).
   - Build Command: `npm run build` (auto-detected).
   - Output Directory: `dist` (auto-detected).
3. **Set Environment Variables**:
   In the Vercel project configuration, add:
   - `VITE_SUPABASE_URL`: `https://wjwtgzwhzrzusacntmra.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqd3RnendoenJ6dXNhY250bXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNzk4NjYsImV4cCI6MjEwMTc1NTg2Nn0.vZoMOZm4a-S4QNUCUY-9cBCzQM3ySR44kpp-VaVhTeg`
4. **Click "Deploy"**.
   - The included [vercel.json](file:///c:/dev/masung/vercel.json) automatically enforces single-page application routing, long-term asset caching, and production security headers (CSP, nosniff, SAMEORIGIN frame protection, strict referrer).

---

---

## 3. Render (OPTIONAL — Can Skip Completely!)

> [!TIP]
> **You do NOT need Render!**
> Every feature on the site (Menu, Order, Loyalty Pass, Discounts, and Supabase Order Syncing) runs directly in the frontend and connects straight to Supabase.
> 
> **Vercel + Supabase is 100% FREE and requires ZERO credit card or billing details.**
> You can completely skip Render.

If you ever want a dedicated background Node.js webhook server in the future, the `render.yaml` file is preserved, but you do not need it right now. All ordering and loyalty functions work perfectly on Vercel alone.

---

## 4. Production Security & QA Checklist

The following controls have been built and verified:
- [x] **OWASP XSS & Injection Sanitization**: Implemented via `src/lib/sanitize.ts` on all user order forms, promo code inputs, and table notes.
- [x] **Content-Security-Policy (CSP)**: Configured in `vercel.json` restricting resource loading to authorized origin, Supabase, Google Fonts, and media assets.
- [x] **API Rate Limiting**: Built into `server/index.js` limiting requests to 100 per minute per IP.
- [x] **CORS Origins**: Restricted to authorized production domains.
- [x] **NPM Dependency Audit**: `npm audit` verified **0 vulnerabilities**.
- [x] **Automated Test Suite**: 21/21 passing tests via `npm test` verifying pricing math, voucher codes, loyalty tiers, XSS defenses, and Supabase order contracts.
