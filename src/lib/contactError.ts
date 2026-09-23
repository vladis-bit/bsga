/** Preloží chybu z databázy do zrozumiteľnej hlášky pre návštevníka. */
export const contactErrorMessage = (message?: string | null): string => {
  if (message && /Príliš veľa správ/i.test(message)) {
    return "Z tohto e-mailu prišlo za poslednú hodinu príliš veľa správ. Skúste to prosím neskôr alebo nám napíšte na info@bsga.sk.";
  }
  return "Nastala chyba pri odosielaní. Skúste to prosím znova.";
};
