import {useEffect, useState} from "react"
import "./App.css"
import SearchIcon from "/images/search-icon.svg"
import Movie from "./components/Movie"

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY
// const API_KEY = process.env.VITE_MOVIE_API_KEY

// const API_URL = "http://omdbapi.com?apikey=" + API_KEY
const API_URL = `/api/?apikey=${API_KEY}`

function App() {
    const [searchItem, setSearchItem] = useState("")
    const [movies, setMovies] = useState([])

    const searchMovies = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (!data.Search) {
            throw new Error(`API error! Response: ${JSON.stringify(data)}`);
            }
            console.log(data);
            setMovies(data.Search);
        } catch (error) {
            console.error(error);
        }
    };


    // const searchMovies = async (title) => {
    //     try {
    //         const response = await fetch(`${API_URL}&s=${title}`)
    //         const data = await response.json()
    //         console.log(data)
    //         setMovies(data.Search)
    //     } catch(error) {
    //         console.log(error)
    //     }

    // }

    useEffect(() => {
        searchMovies("Spiderman")
    }, [])

    const handleChange = (e) => {
        const value = e.target.value;

        setSearchItem(value)
    }

    const handleClick = () => {
        searchMovies(searchItem)
    }

    const handleKey = (e) => {
        if (e.keyCode === 13) {
            searchMovies(searchItem)
        }
    }


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movie"
                    value={searchItem}
                    onChange={handleChange}
                    onKeyDown={handleKey}
                />

                <img
                    src={SearchIcon}
                    alt="Search Movie"
                    onClick={handleClick}
                />
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        {console.log("Movies fetched successfully")}
                        {movies.map((movie, index) => {
                            return (<Movie key={index} movie={movie} />)
                        })}
                    </div>
                ) : (
                    <div className="empty">
                        {console.log("No movies found")}
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    )
}


export default App;