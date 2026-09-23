import ContentManager from "./ContentManager";

const AdminContentCoaches = () => (
  <ContentManager
    table="coaches"
    heading="Tréneri"
    intro="Tím na stránke O nás. Každý riadok je jedna karta trénera."
    order={[{ column: "sort_order" }, { column: "meno" }]}
    newRow={{ meno: "Nový tréner", sort_order: 99, is_published: false }}
    fields={[
      { name: "meno", label: "Meno a priezvisko", titleField: true },
      { name: "pozicia", label: "Pozícia", placeholder: "Tréner BSGA · Tréner golfu" },
      { name: "telefon", label: "Telefón" },
      { name: "email", label: "E-mail" },
      { name: "foto", label: "Fotka", type: "image" },
      {
        name: "popis",
        label: "Body v profile",
        type: "textarea",
        help: "Každý riadok = jedna odrážka na zadnej strane karty.",
      },
      {
        name: "ocenenia",
        label: "Ocenenia",
        type: "textarea",
        help: "Každý riadok = jedno ocenenie (zobrazuje sa pri zakladajúcich členoch).",
      },
      { name: "licencia", label: "Licencia" },
      { name: "zakladajuci_clen", label: "Zakladajúci člen", type: "boolean" },
      { name: "sort_order", label: "Poradie", type: "number" },
      { name: "is_published", label: "Zobraziť na webe", type: "boolean" },
    ]}
  />
);

export default AdminContentCoaches;
