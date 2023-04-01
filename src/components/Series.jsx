import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleSeries from './SingleSeries'
import { Link } from 'react-router-dom'
import { Pagination } from '@mui/material'
import useGenres from '../useGenres'
import './series.css'
import { motion } from 'framer-motion'

const Series = () => {


    const BASE_API = 'https://api.themoviedb.org/3'
    const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'

    const [series, setSeries] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setQuery] = useState('')
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [showGenres, setShowGenres] = useState(false)

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
            top: 0,
            behavior: 'smooth'
        }

        )

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchSeries(query);
    }


    useEffect(() => {
        fetchSeries();

    }, [currentPage, selectedGenre])

    useEffect(() => {
        fetchGenres();

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

    return (
        <>
            <div>
                <motion.div className='links' initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>

                    <Link to='/'>
                        <h1><span>M</span>ovie Gallery</h1>
                    </Link>

                </motion.div>
                <motion.form onSubmit={handleSubmit} className='tv-form' initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
                    <input placeholder="Search TV Series" type="text" className='tv-input' onChange={(e) => setQuery(e.target.value)} />
                </motion.form>

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
                            <div className='filter-button'>
                                <motion.button onClick={() => setShowGenres(!showGenres)} >
                                    Hide Filter
                                </motion.button>
                            </div>

                        </div> :



                        <div className='filter-button'>
                            <motion.button onClick={() => setShowGenres(!showGenres)}>
                                Show Filter
                            </motion.button>
                        </div>


                }




                <motion.div className="heading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
                    <h1>Popular Series</h1>
                </motion.div>

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
