import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

function MovieDetailPage() {
    const {movieId} = useParams()

    const [ movieDetail, setMovieDetail ] = useState({})

    useEffect(() => {
        fetchMovieDetailsById(movieId)
    }, [])

    const fetchMovieDetailsById = (movieId) => {
        const movieDetailhUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=bc9a9b07`
        fetch(movieDetailhUrl)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setMovieDetail(result)
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <img src={movieDetail.Poster}/>
            <h5>{movieDetail.Title}</h5>
            <p>{movieDetail.Plot}</p>
            <p>Released: {movieDetail.Released}</p>
            <p>Director: {movieDetail.Director}</p>
            <p>Writer: {movieDetail.Writer}</p>
            <p>Actors: {movieDetail.Actors}</p>
            <p>Awards: {movieDetail.Awards}</p>
        </div>
    )
}

export default MovieDetailPage