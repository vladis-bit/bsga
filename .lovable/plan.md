

## Plan: Fix voucher images on Shop page

The previous voucher image files were likely corrupted (the diff shows they went from empty to binary content). The user has re-uploaded the correct images.

### Steps

1. **Replace voucher image assets** -- Copy the 3 new uploads to `src/assets/`:
   - `user-uploads://1-4.png` → `src/assets/voucher-50.png` (50€)
   - `user-uploads://2-4.png` → `src/assets/voucher-100.png` (100€)
   - `user-uploads://3-2.png` → `src/assets/voucher-200.png` (200€)

2. **No code changes needed** -- `Shop.tsx` and `VoucherCard.tsx` already import and use these assets correctly. The images just need to be valid files.

