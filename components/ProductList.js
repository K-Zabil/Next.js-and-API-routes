const ProductList = ({ products }) => {
    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price} $</p>
                        <p>Rating: {product.rating} ⭐</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;