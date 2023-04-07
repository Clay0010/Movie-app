import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router';
import './actor.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Particle from '../particles/Particles'

const Actor = () => {
    const BASE_API = 'https://api.themoviedb.org/3'
    const API_KEY = process.env.REACT_APP_API_KEY
    const API_IMG = 'https://image.tmdb.org/t/p/original/';
    const MOVIE_IMG = 'https://image.tmdb.org/t/p/w300/';
    const location = useLocation();
    const id = location.state;
    const [actorDetails, setActorDetails] = useState({})
    const [actorMovies, setActorMovies] = useState([])
    const [actorSeries, setActorSeries] = useState([])

    const fetchActorDetails = async () => {
        const { data } = await axios.get(`${BASE_API}/person/${id}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        })
        setActorDetails(data)
    }

    const fetchActorMovies = async () => {
        const { data } = await axios.get(`${BASE_API}/person/${id}/movie_credits`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        })
        setActorMovies(data.cast)
    }
    const fetchActorSeries = async () => {

        const { data } = await axios.get(`${BASE_API}/person/${id}/tv_credits`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        })
        setActorSeries(data.cast)
    }

    useEffect(() => {
        fetchActorDetails();
        fetchActorMovies();
        fetchActorSeries();
    }, [])

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
            slidesToSlide: 1 //  optional, default to 1.
        }
    };

    return (
        <>
            <div className='actor-link'>

                <Link to='/' className='actor-links'>
                    Home
                </Link>
                <Link to='/series' className='actor-links'>
                    Series
                </Link>
            

            </div>
        <div className='container'>
            
            <div className='actor-profile'>
                
                <div className='actor-info'>
                    
                    <div>
                        <img src={API_IMG + actorDetails.profile_path} alt={actorDetails.name} className='actor-image' />
                    </div>
                    <div>
                        <h1>{actorDetails.name}</h1>
                    </div>
                    <p>{actorDetails.birthday}</p>
                        <p>{actorDetails.place_of_birth}</p>
                </div>

                <div className='actor-related-movies'>
                    <h2 className='center'>Movies</h2>
                    <Carousel
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={6000}
                        
                    >
                        {actorMovies.slice(0, 20).map((movie) => {
                            return (
                                <Link to={'/movie/' + movie.id} state={movie.id}>
                                    <div className='similar-movie-details'>
                                {
                                    movie.poster_path ? <img src={MOVIE_IMG + movie.poster_path} alt={movie.original_title} className='actor-movie-image' />
                                        :
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png' alt={movie.original_title} className='actor-movie-image' />
                                }

                                <p>{movie.original_title}</p>
                            </div>
                            </Link>
                            )
                        })}
                    </Carousel>
                </div>
                <div className='actor-related-movies'>
                    <h2 className='center'>TV Series</h2>
                    <Carousel
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={6000}
                    >
                        {actorSeries.slice(0, 20).map((movie) => {
                            return (
                                <Link to={'/series/' + movie.id} state={movie.id}>
                                    <div className='similar-movie-details'>
                                {
                                    movie.poster_path ? <img src={MOVIE_IMG + movie.poster_path} alt={movie.original_title} className='actor-movie-image' />
                                        :
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png' alt={movie.original_title} className='actor-movie-image' />
                                }
                                <p>{movie.original_name}</p>
                            </div>
                            </Link>

                            )
                        })}
                    </Carousel>
                </div>
            </div>
            <Particle /> 

        </div>
        </>
    )
}

export default Actor;
