import { useState, useEffect } from 'react';
import axios from 'axios';

function Card() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = () => {
            const url = 'https://api.themoviedb.org/3/discover/movie?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT';

            axios.get(url)
                .then((response) => {
                    setMovies(response.data.results);
                })
                .catch((error) => {
                    console.error('Errore durante il recupero dei film:', error);
                });
        };

        fetchMovies();
    }, []);

    return (
        <main className="m-20 p-4">
            <div className="row">
                <div className="col-12 mt-6">
                    <div className="row">
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <div className="col-md-2" key={movie.id}>
                                    <div className="card m-3 movie-card" style={{ width: '18rem' }}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            className="card-img-top"
                                            alt={movie.title}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.title}</h5>
                                            <p className="card-text">{movie.overview ? movie.overview : 'Descrizione non disponibile'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Nessun film trovato.</div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Card;
