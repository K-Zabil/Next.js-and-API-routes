const products = [
  { id: 1, name: "TV", category: "Electronics", price: 30000, rating: 4 },
  { id: 2, name: "Sneakers", category: "Clothing", price: 5000, rating: 5 },
  { id: 3, name: "Smartphone", category: "Electronics", price: 25000, rating: 3 },
  { id: 4, name: "Laptop", category: "Electronics", price: 60000, rating: 4 },
  { id: 5, name: "Washing Machine", category: "Home Appliances", price: 15000, rating: 4 },
  { id: 6, name: "Headphones", category: "Electronics", price: 7000, rating: 4 },
  { id: 7, name: "Sofa", category: "Furniture", price: 25000, rating: 5 },
  { id: 8, name: "Refrigerator", category: "Home Appliances", price: 45000, rating: 5 },
  { id: 9, name: "Shirt", category: "Clothing", price: 1500, rating: 3 },
  { id: 10, name: "Jacket", category: "Clothing", price: 4000, rating: 4 },
  { id: 11, name: "Air Conditioner", category: "Home Appliances", price: 25000, rating: 4 },
  { id: 12, name: "Microwave", category: "Home Appliances", price: 12000, rating: 3 },
  { id: 13, name: "Smartwatch", category: "Electronics", price: 12000, rating: 5 },
  { id: 14, name: "Pants", category: "Clothing", price: 3000, rating: 4 },
  { id: 15, name: "Blender", category: "Home Appliances", price: 5000, rating: 4 },
  { id: 16, name: "Printer", category: "Electronics", price: 8000, rating: 3 },
  { id: 17, name: "T-shirt", category: "Clothing", price: 1000, rating: 5 },
  { id: 18, name: "Toaster", category: "Home Appliances", price: 2500, rating: 4 },
  { id: 19, name: "Camera", category: "Electronics", price: 20000, rating: 5 },
  { id: 20, name: "Shoes", category: "Clothing", price: 4000, rating: 4 }
];

export default function handler(req, res) {
  const { category, minPrice, maxPrice, sort, page = 1, limit = 5, search } = req.query;
  let filteredProducts = products;

  if (category) filteredProducts = filteredProducts.filter(product => product.category === category);
  if (minPrice) filteredProducts = filteredProducts.filter(product => product.price >= parseInt(minPrice));
  if (maxPrice) filteredProducts = filteredProducts.filter(product => product.price <= parseInt(maxPrice));
  if (search) filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));


  if (sort) {
    filteredProducts = filteredProducts.sort((a, b) => {
      if (sort === "price") {
        return a.price - b.price;
      } else if (sort === "rating") {
        return a.rating - b.rating;
      }
      return 0;
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.status(200).json({
    products: paginatedProducts,
    totalItems: filteredProducts.length
  });
}