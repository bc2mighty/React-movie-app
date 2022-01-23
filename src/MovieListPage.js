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
            <div className="col" key={index}>
                <div className="card shadow-sm">
                    <img className="bd-placeholder-img card-img-top" src={movie.Poster}/>
                    <div className="card-body">
                        <h3>{movie.Title}</h3>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <NavLink to={`/${movie.imdbID}`}>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Details</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    })

    return (
        <div>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Movie Search</h1>
                    <p className="lead text-muted">Let's help you search for some awesome movies.</p>
                    <p>
                        <input type="text" value={searchTerm} className="form-control" onChange={handleSearchTerm} placeholder="Search for Movie"/>
                    </p>
                    <p>
                        <button className="btn btn-primary my-2 me-2" onClick={() => fetchMovies(searchTerm)}>Search</button>
                        <button className="btn btn-secondary my-2" onClick={clearResults}>Clear Results</button>
                    </p>
                </div>
                </div>
            </section>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {movieItems}
                        {noMoviesFound ? <h1>No Movies Found</h1> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieListPage;