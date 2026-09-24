import ContentManager from "./ContentManager";

const AdminContentCamps = () => (
  <ContentManager
    table="camps"
    heading="Detské tábory"
    intro="Turnusy detských táborov na stránke Juniorský golf. Každý riadok je jedna karta tábora."
    order={[{ column: "sort_order" }, { column: "datum" }]}
    newRow={{ nazov: "Nový tábor", sort_order: 99, is_published: false, sold_out: false }}
    fields={[
      { name: "nazov", label: "Názov", titleField: true, placeholder: "Denný tábor - Turnus 1" },
      { name: "datum", label: "Termín", placeholder: "6. – 10. 7. 2026" },
      { name: "lokalita", label: "Lokalita", placeholder: "Hrubá Borša" },
      { name: "popis", label: "Popis", type: "textarea" },
      { name: "plagat", label: "Plagát (PDF alebo obrázok)", type: "image" },
      { name: "sold_out", label: "Vypredané", type: "boolean" },
      { name: "sort_order", label: "Poradie", type: "number" },
      { name: "is_published", label: "Zobraziť na webe", type: "boolean" },
    ]}
  />
);

export default AdminContentCamps;
