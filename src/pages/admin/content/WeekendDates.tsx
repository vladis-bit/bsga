import ContentManager from "./ContentManager";

const AdminContentWeekendDates = () => (
  <ContentManager
    table="weekend_course_dates"
    heading="Termíny víkendového kurzu zelenej karty"
    intro="Termíny zobrazené na stránke Začni s golfom v časti Víkendový kurz. Formát napr. „3. – 4. 10. 2026“."
    order={[{ column: "sort_order" }, { column: "created_at" }]}
    newRow={{ datum: "Nový termín", sort_order: 100, is_published: false }}
    fields={[
      { name: "datum", label: "Termín", titleField: true, placeholder: "3. – 4. 10. 2026" },
      { name: "poznamka", label: "Poznámka (voliteľné)", placeholder: "napr. posledné miesta" },
      { name: "sort_order", label: "Poradie", type: "number" },
      { name: "sold_out", label: "Vypredané", type: "boolean" },
      { name: "is_published", label: "Zobraziť na webe", type: "boolean" },
    ]}
  />
);

export default AdminContentWeekendDates;
