import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';



const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=c80d123f';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if(data.Search) 
            setMovies(data.Search);
        else
            setMovies([]);
    
    }
    
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);


    return(
        <div className="app">
            <h1>Filmera</h1>


            <div className="search">
                <input 
                 placeholder="search for moveis"
                 value={searchTerm}
                 onChange={(e) => { setSearchTerm((prev) => e.target.value)}}
                />
                <button
                  onClick={() => { searchMovies(searchTerm)}}
                >
                    Search
                </button>
            </div>

            {movies?.length > 0 
                ?
                (
                    <div className="container">
                      {movies.map((movie) => (
                        <MovieCard movie={movie} />
                      ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2> No Movies Found</h2>
                    </div>

                )
            }
            
            
        </div>
    );
}

export default App;