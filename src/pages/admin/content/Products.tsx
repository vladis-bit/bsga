import ContentManager from "./ContentManager";

const AdminContentProducts = () => (
  <ContentManager
    table="shop_products"
    heading="Obchod"
    intro="Produkty a služby v Obchode. Typ určuje sekciu: merch, sluzba alebo poukazka."
    order={[{ column: "typ" }, { column: "sort_order" }]}
    newRow={{ typ: "merch", nazov: "Nový produkt", sort_order: 99, is_published: false }}
    fields={[
      { name: "nazov", label: "Názov", titleField: true },
      { name: "typ", label: "Typ", help: "merch = predmety, sluzba = služby, poukazka = darčekové poukážky" },
      { name: "cena", label: "Cena", placeholder: "napr. 29.99" },
      { name: "popis", label: "Popis", type: "textarea" },
      { name: "obrazok", label: "Fotka", type: "image" },
      { name: "odkaz_na_kupu", label: "Odkaz na kúpu", placeholder: "https://buy.stripe.com/…" },
      { name: "farby", label: "Farebné varianty", help: "Napr.: Čierna|#0a0a0a; Žltá|#EAB308" },
      { name: "poznamka", label: "Poznámka pod produktom" },
      { name: "sort_order", label: "Poradie", type: "number" },
      { name: "is_published", label: "Zobraziť na webe", type: "boolean" },
    ]}
  />
);

export default AdminContentProducts;
