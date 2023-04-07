import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './moviedetails.css'
import Carousel from 'react-multi-carousel'
function MovieDetails() {

  const API_URL_ = 'https://api.themoviedb.org/3'
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const API_BACKDROP = 'https://image.tmdb.org/t/p/original/';
  const API_TRAILER = 'https://api.themoviedb.org/3/movie'

  const API_KEY = process.env.REACT_APP_API_KEY
  const location = useLocation();
  const id = location.state;

  const [movie, setMovie] = useState([]);
  const [actors, setActors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [selected, setSelected] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [latest, setLatest] = useState([]);
  const [movieGenre, setMovieGenre] = useState([])

  const fetchMovie = async () => {
    const { data } = await axios.get(`${API_URL_}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })

    setMovie(data)
    setMovieGenre(data.genres)

  }

  const fetchCast = async () => {
    const API_CAST = `${API_URL_}/movie/${id}`
    const { data } = await axios.get(`${API_CAST}/credits`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })

    // console.log(data);
    setActors(data.cast)



  }

  const fetchSimilar = async () => {

    const API_SIMILAR = `${API_URL_}/movie/${id}/similar`
    const { data } = await axios.get(API_SIMILAR, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })

    setSimilar(data.results)
  }

  const fetchTrailer = async () => {
    const { data } = await axios.get(`${API_TRAILER}/${id}/videos?api_key=${API_KEY}&language=en-US`)
    const f = data.results.find(vid => vid.name === 'Official Trailer' || vid.name === 'official trailer')
    const h = data.results.find(hi => hi.name === 'Official Trailer [ENG SUB]')

    setSelected(f ? f.key || h.key : data.results[0].key)

  }

  const fetchRecommendation = async () => {
    const { data } = await axios.get(`${API_URL_}/movie/${id}/recommendations`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })
    setRecommendations(data.results)
  }

  // const fetchWatchProviders = async () => {
  //   const { data } = await axios.get(`${API_URL_}/movie/${id}/watch/providers`, {
  //     params: {
  //       api_key: API_KEY

  //     }
  //   })


  //   setWatchProviders(data.results);

  //   // console.log(Object.entries(watchProviders).map((pro)=> pro.));
  // }


  const fetchLatest = async () => {
    const { data } = await axios.get(`${API_URL_}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })
    setLatest(data.results)

  }




  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };



  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchSimilar();
    fetchTrailer();
    fetchRecommendation();
    // fetchWatchProviders();
    fetchLatest();
    // fetchReviews();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [id])



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
          <div style={{ display: 'flex' }}>
            {movie.original_language === 'en' ? <h1>{movie.original_title}</h1> : <h1>{movie.title}</h1>}
          </div>
          <p className='movie-overview'>{movie.overview}</p>
          <p>Release Date : {movie.release_date}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i class='bx bxl-imdb'></i>
            <p>{parseFloat(movie.vote_average).toFixed(1)}</p>
          </div>
          <h4>Actors : </h4>

          <div className='actors'>
            {
              actors.slice(0, 6).map((actor, index) => {
                return (
                  <Link to={'/actor/' + actor.id} state={actor.id}>
                    <div className='actors-details' key={index}>
                      {actor.profile_path ? <img src={API_IMG + actor.profile_path} alt={actor.name} className='series-actors' /> : <img src='https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg' alt={actor.name} />}
                      {
                        actor.known_for_department === 'Acting' && <p>{actor.name}</p>
                      }
                    </div>
                  </Link>
                )
              })}
          </div>

          <div className='genresM'>

            <div className='genres-names'>

              {movieGenre.map((gen) => {
                return (
                  <p className='movieGenre'>{gen.name}</p>
                )
              })}
            </div>
            <div className='f'>
              <a href={`https://www.youtube.com/watch?v=${selected}`} target="_blank" rel="noopener noreferrer" className='trailer'>
                <i class='bx bxs-videos bx-tada-hover' title='Trailer'></i>
              </a>

            </div>


          </div>


        </div>


      </div>

      {movie.backdrop_path ? <img src={API_BACKDROP + movie.backdrop_path} alt={movie.title} className='background' /> : <img src={API_BACKDROP + movie.poster_path} alt={movie.title} className='background' />}

      <div className='similar-movies'>
        <div className='similar-heading'>
          <h1>Similar Movies </h1>
        </div>
        <Carousel
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={6000}
          draggable={false}
          
        >
          {/* //checking if this movie have similar movies from the api returned value 
          if so then execute the code below that will show the similar movie and if not 
          then execute the code below (**starts with recommendations.map**)which gets a list of recommended movies for a movie. */}
          {similar.length !== 0 ? similar.slice(0, 20).map((single, index) => {
            return (
              <Link to={'/movie/' + single.id} state={single.id}>

                <div key={index} className='similar-movie-details'>

                  {single.poster_path ? <img src={API_IMG + single.poster_path} alt={single.title} style={{ padding: 40, height: 400 }} /> :
                    single.backdrop_path ? <img src={API_IMG + single.backdrop_path} alt={single.title} style={{ padding: 40, height: 400 }} /> :
                      <img src='https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg' alt={single.title} style={{ padding: 40, height: 400 }} />}
                  {single.original_language === 'en' ? <p>{single.original_title}</p> :
                    <p>{single.title}</p>
                  }

                </div>
              </Link>
            )
          }
          ) : recommendations.map((recommended, index) => {
            return (
              <Link to={'/movie/' + recommended.id} state={recommended.id}>
                <div key={index} className="similar-movie-details">
                  {recommended.poster_path ? <img src={API_IMG + recommended.poster_path} alt={recommended.title} /> :
                    recommended.backdrop_path ? <img src={API_IMG + recommended.backdrop_path} alt={recommended.title} /> :
                      <img src='https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg' alt={recommended.title} />}

                  {recommended.original_language === 'en' ? <p>{recommended.original_title}</p> :
                    <p>{recommended.title}</p>
                  }
                </div>
              </Link>
            )
          })

          // here 
          ||

          latest.map((lat, index) => {
            return (
              <Link to={'/movie/' + lat.id} state={lat.id}>
                <div key={index} className='similar-movie-details'>
                  {lat.poster_path ? <img src={API_IMG + lat.poster_path} alt={lat.title} /> :
                    lat.backdrop_path ? <img src={API_IMG + lat.backdrop_path} alt={lat.title} /> :
                      <img src='https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg' alt={lat.title} />}

                  {lat.original_language === 'en' ? <p>{lat.original_title}</p> :
                    <p>{lat.title}</p>
                  }
                </div>
              </Link>
            )
          })

          }


        </Carousel>


      </div>
    </div>
  )
}

export default MovieDetails;
