import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            onSearch(query);
        }
    };

    return (
        <form className="d-flex ms-auto" role="search" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search for a movie"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Cerca</button>
        </form>
    );
}

export default SearchBar;
