import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

function FilmETelefilm() {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(false);
    const [loadingTvShows, setLoadingTvShows] = useState(false);
    const { query } = useGlobalContext();

    const fetchMovies = async (query = '') => {
        setLoadingMovies(true);
        let url = `https://api.themoviedb.org/3/trending/movie/week`;

        if (query) {
            url = `https://api.themoviedb.org/3/search/movie`;
        }

        try {
            const response = await axios.get(url, {
                params: {
                    api_key: 'e99307154c6dfb0b4750f6603256716d',
                    language: 'it-IT',
                    query,
                },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Errore durante il recupero dei film:', error);
        } finally {
            setLoadingMovies(false);
        }
    };

    const fetchTvShows = async (query = '') => {
        setLoadingTvShows(true);
        let url = `https://api.themoviedb.org/3/trending/tv/week`;

        if (query) {
            url = `https://api.themoviedb.org/3/search/tv`;
        }

        try {
            const response = await axios.get(url, {
                params: {
                    api_key: 'e99307154c6dfb0b4750f6603256716d',
                    language: 'it-IT',
                    query,
                },
            });
            setTvShows(response.data.results);
        } catch (error) {
            console.error('Errore durante il recupero delle serie TV:', error);
        } finally {
            setLoadingTvShows(false);
        }
    };

    useEffect(() => {
        fetchMovies(query);
        fetchTvShows(query);
    }, [query]);

    return (
        <section className='p-5'>
            <h3 className='p-3 text-white'>Film in evidenza</h3>
            <div className="row">
                {loadingMovies ? (
                    <div>Caricamento film...</div>
                ) : movies.length > 0 ? (
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
                                    <p className="card-text">
                                        {movie.overview || 'Descrizione non disponibile'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Nessun film trovato.</div>
                )}
            </div>

            <h3 className='p-3 text-white'>Serie TV in evidenza</h3>
            <div className="row">
                {loadingTvShows ? (
                    <div>Caricamento serie TV...</div>
                ) : tvShows.length > 0 ? (
                    tvShows.map((tvShow) => (
                        <div className="col-md-2" key={tvShow.id}>
                            <div className="card m-3 movie-card" style={{ width: '18rem' }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                                    className="card-img-top"
                                    alt={tvShow.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{tvShow.name}</h5>
                                    <p className="card-text">
                                        {tvShow.overview || 'Descrizione non disponibile'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Nessuna serie TV trovata.</div>
                )}
            </div>
        </section>
    );
}

export default FilmETelefilm;
