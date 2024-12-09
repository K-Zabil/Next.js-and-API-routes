import { useState, useEffect } from 'react';

const Filters = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('');

    const handleFilterChange = () => {
        onFilterChange({ category, minPrice, maxPrice, sort });
    };

    useEffect(() => {
        handleFilterChange();
    }, [category, minPrice, maxPrice, sort]);

    return (
        <div>
            <h2>Filters</h2>
            <div>
                <label>
                    Category:
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home Appliances">Home Appliances</option>
                        <option value="Furniture">Furniture</option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Min Price:
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Max Price:
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Sort by:
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default Filters;