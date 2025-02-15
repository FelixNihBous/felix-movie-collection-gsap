import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../services/getData';
import Popup from './Popup';

import '../css/Home.css';
import Sidebar from './Sidebar.jsx';

function Home() {
    const { title } = useParams();
    const [filmData, setFilmData] = useState([]);
    const [searchedFilm, setSearchedFilm] = useState('');
    const [SelectedImdbId, setSelectedImdbId] = useState()

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        async function fetchedData() {
            try {
                const data = await getData(title);
                setFilmData(data);
            } catch (error) {
                console.error(`Error fetching data: ${error.message}`);
            }
        }
        fetchedData();
    }, [title]);

    const handleSearch = (event) => {
        setSearchedFilm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await getData(searchedFilm);
            setFilmData(data);
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
        }
    };

    return (
        <div className='container'>
            <Sidebar />
            <div className='home-page'>
                <form onSubmit={handleSubmit} className='formSearch'>
                    <input
                        className='searchBar'
                        type="text"
                        value={searchedFilm}
                        onChange={handleSearch}
                        placeholder="Search for a movie..."
                    />
                    <button type="submit">Search</button>
                </form>
                <div className="movie-grid-container">
                    {filmData.map((film) => (
                        <div key={film["#IMDB_ID"]} className='movie-display'>
                            <img 
                                src={film["#IMG_POSTER"]} 
                                alt={film["#TITLE"]} 
                                onClick={() => {
                                    setSelectedMovie(film);
                                    setIsPopupOpen(true);
                                }}
                            />
                            <h2>{film["#TITLE"]}</h2>
                            <div className='film-details'>
                                <h2>{film["#YEAR"]}</h2>
                                <h2>#Rank {film["#RANK"]}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isPopupOpen && (
                <Popup 
                    movie={selectedMovie}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}
        </div>
    );
}

export default Home;
