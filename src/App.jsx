

import React, { useEffect, useState } from 'react';
import './index.css'
import Movie from './Movie'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useGenres from './useGenres';
import Pagination from '@mui/material/Pagination';
import { motion } from 'framer-motion'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const App = () => {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [showGenres, setShowGenres] = useState(false);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([])
  const [totalPages, setTotalPages] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [nowPlaying, setNowPlaying] = useState([])
  const API_URL_ = 'https://api.themoviedb.org/3'
  const API_KEY = process.env.REACT_APP_API_KEY
  const selectedGenreIds = useGenres(selectedGenre);
  const API_IMG = 'https://image.tmdb.org/t/p/original/';


  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(query);
    window.scroll({
      top: 730,
      behavior: 'smooth'
    })
  }

  const fetchNowPlaying = async () => {
    const { data } = await axios.get(`${API_URL_}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: 'en-US'
      }
    })
    setNowPlaying(data.results)
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
    setTotalPages(() => {
      let total = data.total_pages
      let totalpages = Math.min(Math.max(total, 1), 500)
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
      top: 730,
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
    fetchNowPlaying();
  }, [])



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
      <div className='navbar'>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition} className='mylinks'>
          <Link to='/'>
            <h1><span style={{ color: 'orange' }}>M</span>ovie Gallery</h1>
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition} className='mylinks'>

          <motion.form onSubmit={handleSearch} className='tv-form' initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <input placeholder="Search Movies" type="text" className='tv-input' onChange={(e) => setQuery(e.target.value)} />
          </motion.form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition} className='mylinks'>

          <Link to='/series'>
            <h1 style={{ fontSize: 28, fontWeight: 500 }}>Series</h1>
          </Link>
        </motion.div>

      </div>

      <div className='slider'>
        <Slider {...settings}>
          {nowPlaying.map((movie) => {
            return (
              <Link to={'/movie/' + movie.id} state={movie.id} className='now-playing'>
                <div key={movie.id}>

                  <img src={API_IMG + movie.poster_path} alt={movie.original_title} className='now-playing-img' />


                  <p className='now-playing-title'>{movie.original_title}</p>
                  <p className='vote'>{movie.vote_average}</p>
                </div>
              </Link>


            )
          })}
        </Slider>



      </div>



      <motion.div className="heading" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
        <h1>Popular Movies</h1>
      </motion.div>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={transition}>

        {
          showGenres ?
            <div>
              <div className='genres'>
                {genre &&
                  genre.map((gen, index) => {
                    return (
                      <motion.div initial={{ scale: 0.7, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={transition}>
                        <p key={index} onClick={() => handleAdd(gen)}>
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
                          <p key={index} style={{ backgroundColor: 'orange' }} className='g'>{gen.name}
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
            </div>



            :

            <div className='filter-button'>
              <motion.button onClick={() => setShowGenres(!showGenres)}>
                Show Filter
              </motion.button>
            </div>
        }
      </motion.div>


      <div className='card'>
        {
          movies.map((movie) => <Movie key={movie.id} {...movie} />)
        }
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Pagination count={totalPages} color="secondary" onChange={(e) => handleChange(e.target.textContent)} hideNextButton hidePrevButton className='pagination' />

      </div>

    </>

  )
}

export default App;

