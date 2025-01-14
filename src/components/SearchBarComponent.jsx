import { useGlobalContext } from '../context/GlobalContext';

function SearchBar() {
    const { query, setQuery } = useGlobalContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            setQuery(query); 
        }
    };

    return (
        <form className="d-flex ms-auto" role="search" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Cerca un film o una serie TV"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Cerca</button>
        </form>
    );
}

export default SearchBar;
