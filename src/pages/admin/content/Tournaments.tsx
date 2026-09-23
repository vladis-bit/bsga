import ContentManager from "./ContentManager";

const AdminContentTournaments = () => (
  <ContentManager
    table="tour_events"
    heading="Turnaje BSGA Tour"
    intro="Turnaje na stránke Tour vrátane archívu. Rok určuje, do ktorej sezóny turnaj patrí."
    order={[{ column: "rok", ascending: false }, { column: "cislo_turnaja" }]}
    newRow={{ rok: new Date().getFullYear(), cislo_turnaja: 1, lokalita: "Nový turnaj", is_published: false }}
    fields={[
      { name: "lokalita", label: "Miesto konania", titleField: true },
      { name: "rok", label: "Rok (sezóna)", type: "number" },
      { name: "cislo_turnaja", label: "Číslo turnaja v sezóne", type: "number" },
      { name: "datum", label: "Dátum", placeholder: "15.5.2026" },
      { name: "partner_prezentujuci", label: "Prezentujúci partner" },
      { name: "obrazok", label: "Fotka", type: "image" },
      { name: "odkaz_lokalita", label: "Odkaz na mapu" },
      { name: "odkaz_vysledky", label: "Odkaz na výsledky" },
      { name: "odkaz_galeria", label: "Odkaz na galériu" },
      { name: "promo_letak", label: "Odkaz na promo leták (PDF)" },
      { name: "is_published", label: "Zobraziť na webe", type: "boolean" },
    ]}
  />
);

export default AdminContentTournaments;
