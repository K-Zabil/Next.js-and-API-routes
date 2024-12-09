import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [name, setName] = useState('');

    const handleSearchChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        onSearch({ name: newName });
    };

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={handleSearchChange}
                placeholder="Search by product name"
            />
        </div>
    );
};

export default SearchBar;