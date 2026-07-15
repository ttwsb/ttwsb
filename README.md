# TTWSB Website — Demo Preview

### Latest revision — what changed
- Fixed the "Apply Now" button text being unreadable in the navigation bar.
- Replaced the placeholder logo with the official TTWSB logo (`assets/logo.png`) site-wide, plus a matching favicon.
- Updated registration number (**Reg. RAJS-616/2026**) and founding year (**2026**) across Home/About.
- Membership ID format changed to `TTWSB-000001/2026` style (serial/year).
- Committee page now shows the real **Advisory Panel (5)** and **Executive Committee (21)** — names, mobile numbers, designations and photos, sourced from the provided PDF (names/roles) and Word file (photos, matched by mobile number).
- Added a credit line at the bottom of every page: "All rights reserved to Mahbub Hassan, Technical Editor, TTWSB".


A front-end demo of the **Tvet Trainer Welfare Society of Bangladesh (TTWSB)** website, built to preview with your executive committee before the real domain (`ttwsb.org`) and hosting go live.

## What's included

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, notices, about snapshot, membership highlights, committee teaser |
| `about.html` | History, mission/vision, objectives |
| `committee.html` | All 21 executive committee members (grid, from `js/members-data.js`) |
| `membership.html` | Eligibility, benefits, fee table |
| `apply.html` | 3-step membership application: info → payment → digital ID card with QR |
| `verify.html` | Search/verify a member by ID (also reads `?id=` from a QR scan) |
| `contact.html` | Contact info + message form |

## ⚠️ Important — this is a static front-end demo

GitHub Pages (and any plain static host) can only serve files — it **cannot run a real payment gateway, send real emails, or store data permanently**. So in this demo:

- **Payment** on `apply.html` is simulated ("Pay Now (Demo)") — no money is charged.
- **Member ID generation** happens instantly in the browser after the simulated payment.
- **Email confirmation** is shown as a message only — no email is actually sent.
- **Member records** (`js/members-data.js`) are sample data, plus anything you generate during your demo session is held in memory and **resets when the page reloads** — there's no real database yet.
- **QR codes** are fully functional — they encode a link to `verify.html?id=...`, so scanning one really does open the verification page and look up the ID against the sample/demo data.

This is enough to demonstrate the full user experience to your committee. For the real `ttwsb.org` launch, see "Going live" below.

## Preview it yourself right now

Just open `index.html` in a browser — no build step, no install needed. (Some browsers restrict local file access slightly; if anything looks off, use the "Run a local server" option below.)

Run a local server (optional, closer to how it'll behave when hosted):
```bash
cd ttwsb-site
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy the demo to GitHub Pages (free, public link to share)

1. Create a new **public** GitHub repository, e.g. `ttwsb-demo`.
2. Upload every file in this folder, keeping the folder structure (`css/`, `js/`, and the `.html` files) — either drag-and-drop on github.com ("Add file → Upload files") or via git:
   ```bash
   git init
   git add .
   git commit -m "TTWSB demo site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ttwsb-demo.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` → `/ (root)` → Save**.
4. After a minute, your demo will be live at:
   `https://<your-username>.github.io/ttwsb-demo/`
5. Share that link with your committee.

Once you actually buy `ttwsb.org`, you can point its DNS at this same GitHub Pages site (add a `CNAME` file) — or, better, move to the real backend described below and deploy there instead.

## Customize before you show the committee

- **Committee members**: the `ADVISORY_PANEL` and `EXECUTIVE_COMMITTEE` arrays in `js/members-data.js` now hold your real 2026–2029 committee (5 advisors + 21 executive members, with photos, mobile numbers, and designations). Edit that file directly for any future changes (new term, reshuffles, etc.).
- **Organization details**: search each `.html` file for `[registration authority & number to be added]`, the placeholder address, phone, and email, and replace with real details.
- **Fees**: update the amounts in `membership.html` and `apply.html`.
- **Colors/branding**: all colors are CSS variables at the top of `css/styles.css` (`:root { --navy-900: ...; --amber-500: ...; }`) — change once, applies everywhere.
- **Logo**: currently a simple gear/monogram built in SVG (no image file needed). Swap in a real logo image if you have one.

## Going live — what a *real* version needs

To make membership applications, payment, ID generation, email, and verification actually work in production, you'll need a backend in addition to this front-end. At a high level:

1. **A server + database** (e.g. Node.js/Express, PHP/Laravel, or a service like Firebase/Supabase) to store member records permanently and generate sequential Member IDs.
2. **A real payment gateway** — in Bangladesh, common choices are **SSLCommerz**, **bKash Merchant API**, or **Nagad**, integrated so a successful payment triggers your backend to create the member record.
3. **Transactional email** (e.g. SendGrid, Mailgun, or Amazon SES) so a confirmation + Member ID is emailed automatically after payment.
4. **An admin panel** for the committee to review applications, mark members active/inactive, and handle renewals.
5. **HTTPS hosting** for the backend (the static front-end can stay on GitHub Pages, or move alongside the backend) and the `ttwsb.org` domain pointed at it.

I'm glad to help build any of these pieces (e.g., a working backend, a real payment integration, or an admin dashboard) once you're ready — just let me know which part to tackle next.
