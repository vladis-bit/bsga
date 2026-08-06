const SK_ORDINALS = [
  "Nultý",
  "Prvý",
  "Druhý",
  "Tretí",
  "Štvrtý",
  "Piaty",
  "Šiesty",
  "Siedmy",
  "Ôsmy",
  "Deviaty",
  "Desiaty",
  "Jedenásty",
  "Dvanásty",
];

/** Slovenská radová číslovka v mužskom rode (1 → "Prvý"). */
export const skOrdinal = (n: number) => SK_ORDINALS[n] ?? `${n}.`;

/** Názov turnaja v tvare "Prvý turnaj BSGA Tour". */
export const tournamentTitle = (n: number, tourLabel = "BSGA Tour") =>
  `${skOrdinal(n)} turnaj ${tourLabel}`;
