

import React, { useEffect, useState } from 'react';
import './index.css'
import Movie from './Movie'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useGenres from './useGenres';
import Pagination from '@mui/material/Pagination';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [showGenres, setShowGenres] = useState(false);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([])
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  const API_URL_ = 'https://api.themoviedb.org/3'
  const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'
  const selectedGenreIds = useGenres(selectedGenre);


  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(query);
  }
  

  const fetchMovies = async (query) => {
    const type = query ? 'search/movie' : 'discover/movie'
    const { data } = await axios.get(`${API_URL_}/${type}`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: 'en-US',
        with_genres: selectedGenreIds,
        page: currentPage
      }
    })
    setMovies(data.results)
    setTotalPages(()=>{
      let total = data.total_pages
      let totalpages = Math.min(Math.max(parseInt(total), 1), 500)
      return totalpages
    })

  }



  const fetchGenres = async () => {
    const { data } = await axios.get(`${API_URL_}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })

    setGenre(data.genres)
  }

  const handleAdd = (gen) => {
    setSelectedGenre([...selectedGenre, gen])
    setGenre(genre.filter((g) => g.id !== gen.id))
  }

  const handleRemove = (gen) => {
    setGenre([...genre, gen])
    setSelectedGenre(selectedGenre.filter((g) => g.id !== gen.id))
  }

  const handleChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scroll({
      top: 0,
      behavior: 'smooth'
    }

    )

  }



  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [selectedGenreIds, currentPage])

  useEffect(() => {
    fetchGenres();

  }, [])



  return (

    <div>
      <form onSubmit={handleSearch} className='form'>
        <div>
          <Link to='/'>
            <h1>Movies</h1>
          </Link>
          <Link to='/series'>
            <h1>Series</h1>
          </Link>

        </div>
        <input placeholder="Search" type="text" class="input" onChange={(e) => setQuery(e.target.value)} />
      </form>
      <motion.div className="heading">
        <h1>Popular Movies</h1>
      </motion.div>
      <div>

        {
          showGenres ?
            <div>
              <div className='genres'>
                {genre &&
                  genre.map((gen, index) => {
                    return (
                      <div>
                        <p key={index} onClick={() => handleAdd(gen)}>
                          {gen.name}
                        </p>
                      </div>
                    )
                  })}
              </div>
              <div className='selected-genres'>
                {selectedGenre &&
                  selectedGenre.map((gen, index) => {
                    return (
                      <div>
                        <div onClick={() => handleRemove(gen)} className='clickable'>
                          <p key={index} style={{ backgroundColor: 'orange' }} className='g'>{gen.name}
                            <i class="uil uil-times-circle icon"></i>
                          </p>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <div className='filter-button'>
                <button onClick={() => setShowGenres(!showGenres)} >
                  Hide Filter
                </button>
              </div>
            </div>



            :

            <div className='filter-button'>
              <button onClick={() => setShowGenres(!showGenres)} >
                Show Filter
              </button>
            </div>
        }
      </div>


      <div className='card'>
        {
          movies.map((movie) => <Movie key={movie.id} {...movie}/>)
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Pagination count={totalPages} color="secondary" onChange={(e) => handleChange(e.target.textContent)} hideNextButton hidePrevButton className='pagination' />

      </div>

    </div>

  )
}

export default App;

