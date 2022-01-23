import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

function MovieListPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [movies, setMovies] = useState([])
    const [noMoviesFound, setNoMoviesFound] = useState(false)

    useEffect(() => {
        let term = localStorage.getItem("searchTerm")
        if (term) {
            fetchMovies(term)
        }
    }, [])

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const fetchMovies = (movieName) => {
        const searchUrl = `https://www.omdbapi.com/?s=${movieName}&apikey=bc9a9b07`
        localStorage.setItem("searchTerm", movieName)
        fetch(searchUrl)
            .then(response => response.json())
            .then(result => {
                if (result.Error) {
                    setMovies([])
                    setNoMoviesFound(true)
                    return false
                }
                setMovies(result.Search)
                setNoMoviesFound(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const clearResults = () => {
        setMovies([])
        setSearchTerm('')
        localStorage.removeItem("searchTerm")
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
            &nbsp;&nbsp;&nbsp;
            <button onClick={() => fetchMovies(searchTerm)}>Search</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={clearResults}>Clear Results</button>
            {movieItems}
            {noMoviesFound ? <h1>No Movies Found</h1> : null}
        </div>
    )
}

export default MovieListPage