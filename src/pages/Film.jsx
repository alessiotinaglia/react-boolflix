import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import { FaStar, FaRegStar, FaPlay } from 'react-icons/fa';
import Flag from 'react-world-flags';


function FilmETelefilm() {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [loadingMovies, setLoadingMovies] = useState(false);
    const [loadingTvShows, setLoadingTvShows] = useState(false);
    const { query } = useGlobalContext();

    const [selectedCard, setSelectedCard] = useState(null);

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

    const closeOverlay = () => setSelectedCard(null);

    // Stelline voto
    const drawStars = (voteAverage) => {
        const totalStars = 5;
        const stars = [];
        const filledStars = Math.ceil(voteAverage / 2);

        for (let i = 1; i <= totalStars; i++) {
            if (i <= filledStars) {
                stars.push(<FaStar key={i} />);
            } else {
                stars.push(<FaRegStar key={i} />);
            }
        }

        return stars;
    };

    const languageToCountryCode = {
        en: 'US',
        it: 'IT',
        fr: 'FR',
        de: 'DE',
        es: 'ES',
    };

    const getCountryCode = (languageCode) => {
        return languageToCountryCode[languageCode.toLowerCase()] || 'US';
    };

    return (
        <section className='p-5'>
            {selectedCard && (
                <div className="overlay" onClick={closeOverlay}>
                    <div className="overlay-content">
                        <div className="play-icon-container">
                            <FaPlay className="play-icon" />
                        </div>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${selectedCard.poster_path}`}
                            alt={selectedCard.title || selectedCard.name}
                        />
                        <div className='text'>
                            <h5><strong>Titolo: </strong>{selectedCard.title || selectedCard.name}</h5>
                            <p><strong>Descrizione: </strong>{selectedCard.overview || 'Descrizione non disponibile'}</p>
                            <p><strong>Paese: </strong><Flag code={getCountryCode(selectedCard.original_language)} style={{ width: 30, height: 20, marginLeft: '10px' }} /></p>
                            <div className='stars'>
                                <p><strong>Voto: </strong><span className="stars-container">{drawStars(selectedCard.vote_average)}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <h3 className='p-3 text-white'>Film in evidenza</h3>
            <div className="row">
                {loadingMovies ? (
                    <div>Caricamento film...</div>
                ) : movies.length > 0 ? (
                    movies.map((movie) => (
                        <div className="col-md-2" key={movie.id}>
                            <div
                                className="card m-3 movie-card"
                                style={{ width: '18rem' }}
                                onClick={() => setSelectedCard(movie)}
                            >
                                <div className="play-container">
                                    <FaPlay className="play-icon" />
                                </div>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    className="card-img-top"
                                    alt={movie.title}
                                />
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">
                                    {movie.overview || 'Descrizione non disponibile'}
                                </p>
                                <p className="card-text">
                                    <strong>Paese: </strong><Flag code={getCountryCode(movie.original_language)} style={{ width: 30, height: 20, marginLeft: '10px' }} />
                                </p>
                                <p className="card-text">
                                    <strong>Voto:</strong> {drawStars(movie.vote_average)}
                                </p>
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
                            <div
                                className="card m-3 movie-card"
                                style={{ width: '18rem' }}
                                onClick={() => setSelectedCard(tvShow)}
                            >
                                <div className="play-container">
                                    <FaPlay className="play-icon" />
                                </div>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                                    className="card-img-top"
                                    alt={tvShow.name}
                                />
                                <h5 className="card-title">{tvShow.name}</h5>
                                <p className="card-text">
                                    {tvShow.overview || 'Descrizione non disponibile'}
                                </p>
                                <p className="card-text">
                                    <strong>Paese: </strong><Flag code={getCountryCode(tvShow.original_language)} style={{ width: 30, height: 20, marginLeft: '10px' }} />
                                </p>
                                <p className="card-text">
                                    <strong>Voto:</strong> {drawStars(tvShow.vote_average)}
                                </p>
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
