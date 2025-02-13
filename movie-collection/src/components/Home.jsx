import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../services/getData';
import '../css/Home.css';

function Home() {
    const { title } = useParams();
    const [filmData, setFilmData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await getData(searchTerm); // Fetch data based on search term
            setFilmData(data);
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`); 
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='formSearch'>
                <input
                    className='searchBar'
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search for a movie..."
                />
                <button type="submit">Search</button>
            </form>
            <div className="movie-grid-container">
                {filmData.map((film) => (
                    <div key={film["#IMDB_ID"]} className='movie-display'>
                        <img src={film["#IMG_POSTER"]} alt={film["#TITLE"]} />
                        <h2>{film["#TITLE"]}</h2>
                        <div className='film-details'>
                            <h2>{film["#YEAR"]}</h2>
                            <h2>#Rank {film["#RANK"]}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
