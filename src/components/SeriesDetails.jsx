import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const SeriesDetails = () => {

  const location = useLocation();
  const id = location.state;
  const API_URL_ = 'https://api.themoviedb.org/3'
  const API_IMG = 'https://image.tmdb.org/t/p/w300';
  const API_BACKDROP = 'https://image.tmdb.org/t/p/original/';
  const API_TRAILER = 'https://api.themoviedb.org/3/tv'
  const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'

  const [series, setSeries] = useState([])
  const [actors, setActors] = useState([]);
  const [selected, setSelected] = useState('');
  const [seriesGenre, setSeriesGenre] = useState([])
  const [similar, setSimilar] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [latest, setLatest] = useState([]);

  const fetchTv = async () => {
    const { data } = await axios.get(`${API_URL_}/tv/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })

    setSeries(data)
    setSeriesGenre(data.genres)


  }

  const fetchCast = async () => {
    const API_CAST = `${API_URL_}/tv/${id}`
    const { data } = await axios.get(`${API_CAST}/credits`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })

    
    setActors(data.cast)

  }

  const fetchTrailer = async () => {
    const { data } = await axios.get(`${API_TRAILER}/${id}/videos?api_key=${API_KEY}&language=en-US`)
    const f = data.results.find(vid => vid.type === 'Trailer' || vid.name === 'Official trailer')
    const h = data.results.find(hi => hi.name === 'Official Trailer [ENG SUB]')

    setSelected(f ? f.key || h.key : data.results[0].key)

  }

  const fetchSimilar = async () => {

    const API_SIMILAR = `${API_URL_}/tv/${id}/similar`
    const { data } = await axios.get(API_SIMILAR, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })

    setSimilar(data.results)
  }

  const fetchRecommendation = async () => {
    const { data } = await axios.get(`${API_URL_}/tv/${id}/recommendations`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })
    setRecommendations(data.results)
  }

  const fetchLatest = async () => {
    const { data } = await axios.get(`${API_URL_}/tv/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })
    setLatest(data.results)
  }


  useEffect(() => {
    fetchTv();
    fetchCast();
    fetchTrailer();
    fetchLatest();
    fetchSimilar();
    fetchRecommendation();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [id])

  return (
    <div className="container">
      <div className='home'>
        <Link to='/' className='home-text'>
          <h1> Home</h1>
        </Link>
      </div>
      <div className='movie-content'>

        <img src={API_IMG + series.poster_path} alt={series.name} className='movie-img' />
        {series.backdrop_path ? <img src={API_BACKDROP + series.backdrop_path} alt={series.title} className='background' /> : <img src={API_BACKDROP + series.poster_path} alt={series.title} className='background' />}
        <div className='movie-details'>
          <div style={{ display: 'flex' }}>
            {series.original_language === 'en' ? <h1 className='movie-title'>{series.original_name}</h1> : <h1 className='movie-title'>{series.name}</h1>}
          </div>

          <p className='movie-overview'>{series.overview}</p>
          <p>Release Date : {series.first_air_date}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i class='bx bxl-imdb'></i>
            <p>{parseFloat(series.vote_average).toFixed(1)}</p>
          </div>
          <h4>Actors : </h4>

          <div className='actors'>
            {
              actors.slice(0, 6).map((actor, index) => {
                return (

                  <div className='actors-details' key={index}>
                    {actor.profile_path ? <img src={API_IMG + actor.profile_path} alt={actor.name} className='series-actors'/> : <img src='https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg' alt={actor.name} />}
                    {
                      actor.known_for_department === 'Acting' && <p className='actor-name'>{actor.name}</p>
                    }
                  </div>
                )
              })}
          </div>
          <div className='genresM'>

            <div className='genres-names'>

              {seriesGenre.map((gen,index) => {
                return (
                  <p className='movieGenre' key={index}>{gen.name}</p>
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

              <div style={{display:'flex', justifyContent:'center', padding: 20}}>
                <h1>SIMILAR TV SERIES</h1>
              </div>
      <div className='test'>
        {/* //checking if this movie have similar movies from the api returned value 
          if so then execute the code below that will show the similar movie and if not 
          then execute the code below (**starts with recommendations.map**)which gets a list of recommended movies for a movie. */}
        {similar.length === 0 ? similar.slice(0, 20).map((single, index) => {
          return (
            <Link to={'/series/' + similar.id} state={similar.id}>

              <div key={index} className='similar-movie-details'>

                {single.poster_path ? <img src={API_IMG + single.poster_path} alt={single.name} /> :
                  single.backdrop_path ? <img src={API_IMG + single.backdrop_path} alt={single.name} /> :
                    <img src='https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg' alt={single.title} />}
                {single.original_language === 'en' ? <p>{single.original_name}</p> :
                  <p>{single.name}</p>
                }

              </div>
            </Link>
          )
        }
        ) : recommendations.map((recommended, index) => {
          return (
            <Link to={'/series/' + recommended.id} state={recommended.id}>
              <div key={index} className="similar-movie-details">
                {recommended.poster_path ? <img src={API_IMG + recommended.poster_path} alt={recommended.name} /> :
                  recommended.backdrop_path ? <img src={API_IMG + recommended.backdrop_path} alt={recommended.name} /> :
                    <img src='https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg' alt={recommended.name} />}

                {recommended.original_language === 'en' ? <p>{recommended.original_name}</p> :
                  <p>{recommended.name}</p>
                }
              </div>
            </Link>
          )
        })

        // here 
        ||

        latest.map((lat, index) => {
          return (
            <Link to={'/series/' + lat.id} state={lat.id}>
              <div key={index} className='similar-movie-details'>
                {lat.poster_path ? <img src={API_IMG + lat.poster_path} alt={lat.name} /> :
                  lat.backdrop_path ? <img src={API_IMG + lat.backdrop_path} alt={lat.name} /> :
                    <img src='https://eagle-sensors.com/wp-content/uploads/unavailable-image.jpg' alt={lat.name} />}

                {lat.original_language === 'en' ? <p>{lat.original_name}</p> :
                  <p>{lat.title}</p>
                }
              </div>
            </Link>
          )
        })

        }


      </div>


    </div>
    
  )
}

export default SeriesDetails;
