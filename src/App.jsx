import { useEffect, useState } from "react";
import ProductTable from "./component/ProductTable";
import ProductCards from "./component/ProductCards";
import ProductForm from "./component/ProductForm";

const initialProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 800,
    category: "Electronics",
    stock: 10,
    description: "",
  },
  {
    id: 2,
    name: "Chair",
    price: 120,
    category: "Furniture",
    stock: 5,
    description: "",
  },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
      setEditingProduct(null);
    } else {
      setProducts([...products, product]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Management</h2>

      <ProductForm
        onSave={handleSave}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setView("table")}>Table</button>
        <button onClick={() => setView("card")} style={{ marginLeft: "10px" }}>
          Cards
        </button>
      </div>

      {view === "table" ? (
        <ProductTable
          products={filteredProducts}
          onEdit={setEditingProduct}
        />
      ) : (
        <ProductCards
          products={filteredProducts}
          onEdit={setEditingProduct}
        />
      )}
    </div>
  );
}

export default App;
