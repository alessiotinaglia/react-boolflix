import SearchBar from './SearchBarComponent'; 

function Header({ onSearch }) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <img src="/download.jpg" alt="Medusa" width="45" height="60" />
                    <strong>
                        <a className="navbar-brand text-danger fs-1">MEDUSA</a>
                    </strong>
                    <ul className="navbar-nav d-flex align-items-center">
                        <li className="nav-item"><a className="nav-link text-white" href="#home">Home</a></li>
                        <li className="nav-item"><a className="nav-link text-white" href="#about">Serie TV</a></li>
                        <li className="nav-item"><a className="nav-link text-white" href="#contact">Film</a></li>
                        <li className="nav-item"><a className="nav-link text-white" href="#contact">La mia lista</a></li>
                    </ul>
                    <SearchBar onSearch={onSearch} />
                </div>
            </nav>
        </header>
    );
}

export default Header;
