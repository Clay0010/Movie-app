import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleSeries from './SingleSeries'
import { Link } from 'react-router-dom'
import { Pagination } from '@mui/material'
import useGenres from '../useGenres'
import './series.css'
import { motion } from 'framer-motion'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Series = () => {


    const BASE_API = 'https://api.themoviedb.org/3'
    const API_KEY = process.env.REACT_APP_API_KEY
    const API_IMG = 'https://image.tmdb.org/t/p/original/';

    const [series, setSeries] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setQuery] = useState('')
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [showGenres, setShowGenres] = useState(false)
    const [nowPlaying, setNowPlaying] = useState([])
    const selectedGenreIds = useGenres(selectedGenre);


    const fetchSeries = async (query) => {
        const type = query ? 'search/tv' : 'discover/tv'
        const { data } = await axios.get(`${BASE_API}/${type}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                sort_by: 'popularity.desc',
                page: currentPage,
                query: query,
                with_genres: selectedGenreIds
            }
        })
        setSeries(data.results)
        setTotalPages(() => {
            let total = data.total_pages
            let totalpages = Math.min(Math.max(parseInt(total), 1), 500)
            return totalpages
        })
    }

    const fetchGenres = async () => {
        const { data } = await axios.get(`${BASE_API}/genre/tv/list`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        })

        setGenre(data.genres)
    }

    const handleChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scroll({
            top: 730,
            behavior: 'smooth'
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchSeries(query);
        window.scroll({
            top: 730,
            behavior: 'smooth'
        })
    }

    const fetchNowPlaying = async () => {
        const { data } = await axios.get(`${BASE_API}/tv/on_the_air`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        })
        setNowPlaying(data.results)
    }


    useEffect(() => {
        fetchSeries();

    }, [currentPage, selectedGenre])

    useEffect(() => {
        fetchGenres();
        fetchNowPlaying();
    }, [])


    const handleAdd = (g) => {
        setSelectedGenre([g, ...selectedGenre])

        setGenre(genre.filter((gen) => gen.id !== g.id))

    }

    const handleRemove = (g) => {
        setGenre([...genre, g])
        setSelectedGenre(selectedGenre.filter((gen) => gen.id !== g.id))
    }

    const transition = {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.9]
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 4500,
        lazyLoad: true,
        draggable: false,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div>
                <div className='navbar'>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition} className='mylinks'>
                        <Link to='/'>
                            <h1><span style={{ color: 'orange' }}>M</span>ovie Gallery</h1>
                        </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition} className='mylinks'>

                        <motion.form onSubmit={handleSubmit} className='tv-form' initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
                            <input placeholder="Search Movies" type="text" className='tv-input' onChange={(e) => setQuery(e.target.value)} />
                        </motion.form>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition} className='mylinks'>

                        <Link to='/'>
                            <h1 style={{ fontSize: 28, fontWeight: 500 }}>Movies</h1>
                        </Link>
                    </motion.div>

                </div>

                <div className='slider'>
                    <Slider {...settings}>
                        {nowPlaying.map((movie,index) => {
                            return (
                                <Link to={'/series/' + movie.id} state={movie.id} className='now-playing'>
                                    <div key={index}>

                                        <img src={API_IMG + movie.poster_path} alt={movie.name} className='now-playing-img' />


                                        {movie.original_language === 'ar' ?
                                            <p className='now-playing-title'>{movie.original_name}</p>
                                            :
                                            <p className='now-playing-title'>{movie.name}</p>
                                        }
                                        <p className='vote'>{movie.vote_average}</p>
                                    </div>
                                </Link>


                            )
                        })}
                    </Slider>



                </div>
                <motion.div className="heading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
                    <h1>Popular Series</h1>
                </motion.div>

                {
                    showGenres ?
                        <div>

                            <div className='genres'>
                                {genre &&
                                    genre.map((gen, index) => {
                                        return (
                                            <motion.div initial={{ scale: 0.7, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={transition}>
                                                <p key={index} onClick={() => handleAdd(gen)} style={{ cursor: 'pointer' }}>
                                                    {gen.name}
                                                </p>
                                            </motion.div>
                                        )
                                    })}
                            </div>
                            <div className='selected-genres'>
                                {selectedGenre &&
                                    selectedGenre.map((gen, index) => {
                                        return (
                                            <div>
                                                <motion.div onClick={() => handleRemove(gen)} className='clickable' initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
                                                    <p key={index} style={{ backgroundColor: 'orange', cursor: 'pointer' }} className='g'>{gen.name}
                                                        <i class="uil uil-times-circle icon"></i>
                                                    </p>
                                                </motion.div>
                                            </div>
                                        )
                                    })}
                            </div>
                            <div className='filter-button' style={{ marginBottom: 25 }}>
                                <motion.button onClick={() => setShowGenres(!showGenres)} >
                                    Hide Filter
                                </motion.button>
                            </div>

                        </div> :



                        <div className='filter-button' style={{ marginBottom: 25 }}>
                            <motion.button onClick={() => setShowGenres(!showGenres)}>
                                Show Filter
                            </motion.button>
                        </div>


                }






                <div className='series-card'>

                    {series.map((serie, index) => {
                        return (

                            <SingleSeries key={index} {...serie} />
                        )
                    })}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <Pagination count={totalPages} color="secondary" onChange={(e) => handleChange(e.target.textContent)} hideNextButton hidePrevButton className='pagination' />

            </div>

        </>
    )
}

export default Series
