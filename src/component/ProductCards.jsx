function ProductCards({ products }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <h3>{p.name}</h3>
            <p>Price: ${p.price}</p>
            <p>Category: {p.category}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductCards;
