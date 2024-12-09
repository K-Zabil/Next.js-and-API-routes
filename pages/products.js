import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';

export default function Products({ initialProducts, initialTotalItems, initialQuery }) {
    const [filteredProducts, setFilteredProducts] = useState(initialProducts);
    const [currentPage, setCurrentPage] = useState(Number(initialQuery.page) || 1);
    const [totalPages, setTotalPages] = useState(Math.ceil(initialTotalItems / 5));
    const [query, setQuery] = useState(initialQuery);

    const handleFilterChange = async (filters) => {
        const updatedQuery = { ...query, ...filters, page: 1 };
        setQuery(updatedQuery);

        const queryString = new URLSearchParams(updatedQuery).toString();
        const response = await fetch(`/api/products?${queryString}`);
        const data = await response.json();
        
        setFilteredProducts(data.products);
        setTotalPages(Math.ceil(data.totalItems / 5));
        setCurrentPage(1);
    };
    
    const handleSearch = async (searchQuery) => {
        const updatedQuery = { ...query, search: searchQuery.name, page: 1 };
        setQuery(updatedQuery);
        
        const queryString = new URLSearchParams(updatedQuery).toString();
        const response = await fetch(`/api/products?${queryString}`);
        const data = await response.json();

        setFilteredProducts(data.products);
        setTotalPages(Math.ceil(data.totalItems / 5));
        setCurrentPage(1);
    };

    const handlePageChange = async (newPage) => {
        setCurrentPage(newPage);

        const updatedQuery = { ...query, page: newPage };
        setQuery(updatedQuery);

        const queryString = new URLSearchParams(updatedQuery).toString();
        const response = await fetch(`/api/products?${queryString}`);
        const data = await response.json();

        setFilteredProducts(data.products);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <Filters onFilterChange={handleFilterChange} />
            <ProductList products={filteredProducts} />

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const response = await fetch(`http://localhost:3000/api/products?${new URLSearchParams(query)}`);
    const data = await response.json();

    return {
        props: { initialProducts: data.products, initialTotalItems: data.totalItems, initialQuery: query },
    };
}