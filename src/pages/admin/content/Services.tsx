import ContentManager from "./ContentManager";

const AdminContentServices = () => (
  <ContentManager
    table="services"
    heading="Služby"
    intro="Texty a fotky služieb na stránke Služby. Zmeny sa na webe prejavia hneď po uložení."
    order={[{ column: "sort_order" }, { column: "nazov" }]}
    newRow={{ nazov: "Nová služba", sort_order: 99, is_published: false }}
    fields={[
      { name: "nazov", label: "Názov služby", titleField: true },
      {
        name: "popis",
        label: "Popis",
        type: "textarea",
        help: "Text medzi **dvoma hviezdičkami** sa zobrazí tučne.",
      },
      { name: "foto", label: "Fotka", type: "image" },
      { name: "odkaz", label: "Odkaz po kliknutí", placeholder: "/zacni-s-golfom#zlepsuj-sa" },
      { name: "dlzka", label: "Dĺžka", placeholder: "napr. 55 minút" },
      { name: "cena", label: "Cena", placeholder: "napr. 59,99 €" },
      { name: "sort_order", label: "Poradie", type: "number" },
      { name: "is_published", label: "Zobraziť na webe", type: "boolean" },
    ]}
  />
);

export default AdminContentServices;
