

## Problem

The Footer component (`src/components/Footer.tsx`) links to PDF documents (`/documents/BSGA_Obchodne_Podmienky_2026.pdf` and `/documents/BSGA_Zasady_ochrany_osobnych_udajov.pdf`) instead of the new web page routes (`/obchodne-podmienky` and `/gdpr`).

## Plan

### Step 1: Update Footer links

In `src/components/Footer.tsx`, change the two legal document links from `<a href="/documents/...pdf">` to React Router `<Link to="/obchodne-podmienky">` and `<Link to="/gdpr">` respectively. Remove `target="_blank"` and `rel="noopener noreferrer"` since these will now be internal page navigations.

This requires importing `Link` from `react-router-dom` in Footer.tsx (if not already imported).

### Files to edit
- `src/components/Footer.tsx` — change 2 links from PDF URLs to internal routes

