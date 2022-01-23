import { useState } from "react"
import { NavLink } from "react-router-dom"

function MovieListPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [movies, setMovies] = useState([])

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const fetchMovies = (movieName) => {
        const searchUrl = `https://www.omdbapi.com/?s=${movieName}&apikey=bc9a9b07`
        fetch(searchUrl)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setMovies(result.Search)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const movieItems = movies.map((movie, index) => {
        return (
            <div key={index}>
                <img src={movie.Poster}/>
                <h3>{movie.Title}</h3>
                <NavLink to={`/${movie.imdbID}`}>
                    <button>Details</button>
                </NavLink>
            </div>
        )
    })

    return (
        <div>
            <h1>MovieListPage</h1>
            Search: <input type="text" onChange={handleSearchTerm}/>
            <button onClick={() => fetchMovies(searchTerm)}>Search</button>
            {movieItems}
        </div>
    )
}

export default MovieListPage