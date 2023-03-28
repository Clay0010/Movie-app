import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleSeries from './SingleSeries'
import { Link } from 'react-router-dom'
import { Pagination } from '@mui/material'
import './series.css'
const Series = () => {


    const BASE_API = 'https://api.themoviedb.org/3'
    const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'

    const [series, setSeries] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [query, setQuery] = useState('')

    const fetchSeries = async (query) => {
        const type = query ? 'search/tv' : 'discover/tv'
        const { data } = await axios.get(`${BASE_API}/${type}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                sort_by: 'popularity.desc',
                page: currentPage,
                query:query
            }
        })
        setSeries(data.results)
        setTotalPages(() => {
            let total = data.total_pages
            let totalpages = Math.min(Math.max(parseInt(total), 1), 500)
            return totalpages
        })
    }

    const handleChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scroll({
            top: 0,
            behavior: 'smooth'
        }

        )

    }

    const handleSubmit = (e)=> {
        e.preventDefault()
        fetchSeries(query);
    }


    useEffect(() => {
        fetchSeries();
    }, [currentPage])

    return (
        <>
            <div>
                <Link to='/'>
                    <h1>Home</h1>
                </Link>
                <form onSubmit={handleSubmit} className='tv-form'>
                    <input type="search" onChange={(e) => setQuery(e.target.value)} placeholder='Search TV series' className='tv-input'/>
                </form>
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
