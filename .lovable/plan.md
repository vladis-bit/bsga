

## Nahradenie dokumentov vo footri

### Súčasný stav
Footer obsahuje odkazy na dva PDF dokumenty v `public/documents/`:
- `BSGA_Obchodne_Podmienky_2026.pdf` 
- `BSGA_Zasady_ochrany_osobnych_udajov.pdf`

### Nahrané nové dokumenty
- `BSGA_Obchodne_Podmienky_2026_upravene.pdf` - aktualizované obchodné podmienky (platné od 9.3.2026)
- `BSGA_Zasady_ochrany_osobnych_udajov_updated.pdf` - aktualizované GDPR zásady (platné od 8.3.2026)

### Plán implementácie

1. **Kopírovať nové PDF súbory** do `public/documents/`:
   - `BSGA_Obchodne_Podmienky_2026_upravene.pdf` → `public/documents/BSGA_Obchodne_Podmienky_2026.pdf` (nahradenie)
   - `BSGA_Zasady_ochrany_osobnych_udajov_updated.pdf` → `public/documents/BSGA_Zasady_ochrany_osobnych_udajov.pdf` (nahradenie)

2. **Aktualizovať stránky GDPR.tsx a TermsAndConditions.tsx** - ak obsahujú statický text z dokumentov, môže byť potrebné ich synchronizovať s novými verziami.

Cesty v `Footer.tsx` zostanú nezmenené (`/documents/...`), len sa nahradia obsahy súborov.

