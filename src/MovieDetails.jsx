import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './moviedetails.css'

function MovieDetails() {

  const API_URL_ = 'https://api.themoviedb.org/3'
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const API_BACKDROP = 'https://image.tmdb.org/t/p/original/';

  const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'
  const location = useLocation();
  const id = location.state;

  const [movie, setMovie] = useState([]);
  const [actors, setActors] = useState([]);


  const fetchMovie = async () => {
    const { data } = await axios.get(`${API_URL_}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })

    setMovie(data)

  }

  const fetchCast = async () => {
    const API_CAST = `${API_URL_}/movie/${id}`
    const { data } = await axios.get(`${API_CAST}/credits`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })
    console.log('this is the cast data' + data.cast[0].name);
    console.log(data);
    setActors(data.cast)

    // console.log('actors: '+actors);
    // console.log(actors.name);
  }

  useEffect(() => {
    fetchMovie();
    fetchCast();
  }, [])

  return (
    <div className='container'>
      <div className='home'>
        <Link to='/' className='home-text'>
          <h1> Home</h1>
        </Link>
      </div>
      <div className="movie-content">
        <img src={API_IMG + movie.poster_path} alt={movie.title} className='movie-img' />
        <div className='movie-details'>
          {movie.original_language === 'en' ? <h1>{movie.original_title}</h1> : <h1>{movie.title}</h1>}

          <p className='movie-overview'>{movie.overview}</p>
          <p>Release Date : {movie.release_date}</p>
          <p>Rating : {movie.vote_average}</p>
          {actors.slice(0, 6).map((actor) => {
            return <div className='actors'>
              
            <div className='actors-details'>
                {actor.profile_path ? <img src={API_IMG + actor.profile_path} alt={actor.name} /> : <img src='https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg' alt={actor.name}/>}
                
             
                {actor.known_for_department === 'Acting' && <p>{actor.name}</p>}
                
              </div>
              
              
            </div>
          })}
          {/* {actors.map((actor)=>{
            
            return(
              <Actors key={actor.id} {...actor}/>
            )
          })} */}

        </div>
      </div>
      <img src={API_BACKDROP + movie.backdrop_path} alt={movie.title} className='background' />
    </div>
  )
}

export default MovieDetails;
