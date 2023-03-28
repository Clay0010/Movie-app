import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


const Movie = ({ original_title, poster_path, id, title, original_language }) => {
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';


  const API_TRAILER = 'https://api.themoviedb.org/3/movie'
  const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'
  const [selected, setSelected] = useState('');
  const fetchTrailer = async () => {
    const { data } = await axios.get(`${API_TRAILER}/${id}/videos?api_key=${API_KEY}&language=en-US`)
    const f = data.results.find(vid => vid.name === 'Official Trailer' || vid.name === 'official trailer')
    const h = data.results.find(hi => hi.name === 'Official Trailer [ENG SUB]')
    const k = data.results.find(uk => uk.type === 'Trailer')

    setSelected(f ? f.key || h.key : k.key || data.results[0].key)

  }

  useEffect(() => {
    fetchTrailer();
  }, [])

  return (
    <motion.div initial='hidden' animate='visible' variants={{
      hidden: {
        scale: 0.8,
        opacity: 0,
        y: -80
        
      },
      visible: {
        scale: 1,
        opacity: 1,
        y:0
        
      },
      
    }}
    transition={{
      ease: 'easeInOut', duration:0.5
    }}
    >

      <Link to={'/movie/' + id} state={id}>
        <div className='movie'>
          {poster_path ? <img src={API_IMG + poster_path} alt={original_title} /> : <img src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' style={{ width: '500' }} alt={original_title} />}
          <div className="content">
            {original_language === 'en' ? <h1>{original_title}</h1> : <h1>{title}</h1>}
          </div>
        </div>
      </Link>
    </motion.div>

  )
}
export default Movie; 