# Apex Fit Club Portal

this person is the owner of gym and this is the logo of gym is dono ko web ka first page pa mix kar ka ik proffesional tarika sa add karo aur ya najam ha is ko najam wala trainer section ma dalna ha aur jo third pic ha wo adeel ha aur 4 pic fasih ha        # APEX FIT CLUB — Prompt for Lovable.dev

> Roman Urdu note: Ye wahi poora specification hai jo pehle di thi, lekin **Lovable** ke liye rewrite ki gayi hai (Lovable React + Tailwind stack use karta hai aur images ko chat mein directly upload karke reference karta hai). Isay Lovable ke naye project chat box mein directly paste kar dein.

---

**IMPORTANT FIRST STEP (do this before pasting the prompt):**
In the Lovable chat, **upload these two images first** as attachments to your message, along with the prompt text below:
1. `apex-fit-club-logo.jpg` (the official logo)
2. `najam-ali-tariq-owner-photo.png` (photo of the owner, Najam Ali Tariq)

Then paste everything below as your prompt in the same message.

---

## PROMPT TO PASTE INTO LOVABLE:

Build a professional, fast, fully responsive website for a gym called **"APEX FIT CLUB"**. Use React + Tailwind. The site must load fast on mobile, tablet, and desktop, follow SEO best practices (semantic HTML, meta tags, alt text, Open Graph tags), and follow standard web security practices (input validation/sanitization on all forms, HTTPS, no exposed sensitive data). Keep the codebase clean and lightweight — no unnecessary libraries.

**Brand assets (attached to this message):**
- Use the attached logo image consistently site-wide — header/navbar, footer, favicon, and social share preview. Don't alter or replace it anywhere.
- Use the attached photo of Najam Ali Tariq (the gym owner) in two places:
  1. As the **homepage hero background image**, with the logo displayed on top of it (top-left corner, reasonable size, not touching the edges), a dark gradient overlay behind the text so it stays readable, and hero text reading **"APEX FIT CLUB"** with a subheading **"Owned & Led by Najam Ali Tariq."**
  2. As his profile photo in the Trainers section (see below).

### Site Sections / Pages (each independently navigable):
Home, About, Services, Trainers, Membership Plans, Timings, Location, Events, Reviews, Register/Join Now, Contact.

### Entry Gate (before the homepage loads):
Show a simple form: "Select Gender" (Male/Female), then Name, Phone Number, and CNIC Number OR — if no CNIC — a B-Form Number field instead, plus Home Address. Based on gender selected, route the visitor into the Gents section or the private Ladies section.
**This form must be optional** — include a clear "Skip / Continue as Guest" button so visitors are never blocked from entering the site.

### Services (list with icons):
Personal Training, Group Fitness Classes, Cardio & CrossFit, Nutritional Counseling, Locker Rooms, Physiotherapist, Yoga Classes.

### Trainers (each with a clickable profile card showing bio, experience, and a direct WhatsApp click-to-chat link using wa.me format):
- **Najam Ali Tariq** — Owner & Head Trainer, 10 years experience, WhatsApp 0330-5966918, uses the attached owner photo, shown with an "Owner" badge.
- **Adeel** — Trainer, 7 years experience, WhatsApp 0333-5210375, placeholder photo for now.
- **Fasih** — Trainer, 5–7 years experience, WhatsApp 0322-4052167, placeholder photo for now.

### Membership Plans & Pricing (clean pricing table):
- Admission Fee: Rs. 1,000
- Strength Training (Monthly): Rs. 2,500
- Cardio (Monthly): Rs. 3,000
- Strength + Cardio (Monthly): Rs. 5,000
- Trial (1 Day): Rs. 200
- One-Day Cardio + Gym Pass: Rs. 400

Highlight these offers as promo banners:
- Pay 6 months upfront → get 1 month FREE
- Pay 1 year upfront → get 2 months FREE

### Gym Timings:
- Gents: 6:00 AM–10:00 AM and 4:00 PM–1:00 AM
- Ladies: 10:00 AM–4:00 PM

### Location:
1st Floor, Madina Tower, Near Punjab Cash & Carry, Range Road, Rawalpindi (directly above Meezan Bank, Range Road — use this as a landmark to pin the map accurately). Embed an interactive Google Map for this address with a "Get Directions" button.

### Registration Form (used for membership signup):
Collect Full Name, Phone, CNIC or B-Form Number, Home Address, Gender, and Selected Membership Plan. Store this securely; make it visible only to the gym admin (Najam Ali Tariq) — never public.

### Live Member Counter:
Show an auto-incrementing counter on the homepage, e.g. "126 Members and Counting" — increments by 1 automatically every time a new registration is successfully submitted.

### Events Section:
Currently empty ("No events scheduled right now — check back soon!"), but still include a working Event Registration Form (same fields as above) ready for when events are added later.

### Reviews Section:
Links to TikTok, Instagram, and Facebook where members can view/leave reviews.

### Contact / Footer (sitewide):
Email: apexfitclub@gmail.com (clickable mailto link), WhatsApp: 0330-5966918 (clickable wa.me link), social icons (TikTok, Instagram, Facebook), embedded Google Map, and full address text.

### Ladies Section (private, gender-restricted):
A fully separate portal mirroring the Gents section structurally — same About, Services, Membership Plans, Timings (Ladies: 10 AM–4 PM), Location, Events, Reviews, Registration Form, Contact — **except do NOT show the Trainers section here at all.** Only reachable through the gender-select gate when "Female" is chosen. It must never be linked from or accessible through the Gents/general section, to protect members' privacy.

### Branding:
Keep the logo, color scheme, and typography fully consistent across both the Gents and Ladies sections.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gym-central-gateway.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a9797b58-55b3-4561-bd9f-a0a6bf584f31).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
