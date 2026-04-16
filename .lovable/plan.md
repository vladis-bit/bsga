

# Lovable Cloud vs. Supabase – porovnanie

## Čo je čo?

**Lovable Cloud** = backend zabudovaný priamo do Lovable. Postavený **na Supabase** ako základe, ale spravovaný a fakturovaný cez Lovable. Nepotrebuješ žiadny externý účet – všetko je v jednom rozhraní.

**Supabase (priame pripojenie)** = vlastný Supabase účet pripojený k Lovable projektu. Spravuješ ho samostatne na supabase.com, fakturácia ide priamo cez Supabase.

Technologicky je to **to isté pod kapotou** (PostgreSQL, Auth, Storage, Edge Functions). Rozdiel je v tom, **kto to spravuje a ako sa platí**.

## Hlavné rozdiely

| Oblasť | Lovable Cloud | Supabase (priame) |
|---|---|---|
| Setup | 1 klik, žiadny účet navyše | Vlastný účet na supabase.com, prepojenie cez API kľúče |
| Správa | Všetko v Lovable UI | Cez Supabase dashboard |
| Fakturácia | Cez Lovable workspace | Cez Supabase priamo |
| Free tier | $25/mesiac Cloud kredit + $1 AI kredit | 500 MB DB, 1 GB storage, 50k MAU zdarma |
| AI funkcie (Lovable AI) | Áno, integrované | Nie automaticky |
| Vhodné pre | Väčšinu projektov, jednoduchosť | Pokročilých používateľov, ktorí už majú Supabase ekosystém |

## Náklady – konkrétne čísla

### Lovable Cloud
- **Free $25/mesiac Cloud + $1 AI** – platí pre každý workspace (do začiatku 2026)
- Usage-based: platíš len za to, čo prekročíš nad $25
- **Free plán Lovable**: nemôžeš dobíjať Cloud balance → ak prekročíš $25, služba sa pozastaví
- **Pro plán a vyššie**: môžeš dobíjať v Settings → Cloud & AI balance
- Pre malý web (BSGA – kontaktné formuláre, newsletter, pár klientov v DB) typicky **úplne zadarmo**

### Supabase priamo
- **Free plán**: 500 MB databáza, 1 GB storage, 5 GB bandwidth, 50 000 mesačných aktívnych používateľov, 2 aktívne projekty. Projekty sa po 1 týždni nečinnosti pauznú.
- **Pro plán: $25/mesiac** – 8 GB DB, 100 GB storage, 250 GB bandwidth, 100k MAU, žiadne pauzovanie, denné zálohy
- **Team: $599/mesiac**, **Enterprise: na vyžiadanie**
- Nad limity sa platí extra (napr. ďalšia DB kapacita, bandwidth)

## Praktické porovnanie pre BSGA

Pre váš projekt (kontaktné formuláre, newsletter, prípadne admin login):

- **Lovable Cloud**: pravdepodobne **$0/mesiac** – $25 free kredit pokryje všetko s rezervou. Najjednoduchšie riešenie.
- **Supabase priamo**: tiež **$0/mesiac** na Free pláne, ale projekt sa pauzne pri nečinnosti (problém pre produkčný web) → reálne by ste potrebovali Pro $25/mesiac.

## Moje odporúčanie

Pre BSGA jednoznačne **Lovable Cloud**:
- Setup 1 klik, bez externého účtu
- $25 free kredit pokryje vaše potreby
- Všetko v jednom rozhraní (kód + DB + Auth)
- Plus prístup k Lovable AI bez ďalšieho setupu

Supabase priamo má zmysel iba ak už máte existujúci Supabase projekt, alebo potrebujete pokročilé funkcie spravované samostatne.

**Zdroje:**
- Lovable Cloud pricing: https://docs.lovable.dev/integrations/cloud
- Supabase pricing: https://supabase.com/pricing

---

Toto bola čisto informačná odpoveď, žiadne zmeny v kóde nie sú potrebné. Ak chceš, môžem rovno zapnúť Lovable Cloud a niečo konkrétne postaviť (napr. uložiť kontaktné formuláre do DB).

