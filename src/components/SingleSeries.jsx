import React from 'react'
import './series.css'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

const Serie = ({ original_name, poster_path, original_language, name, id }) => {



  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  const transition = {
    duration: 0.6,
    ease: [0.43, 0.13, 0.23, 0.9]
  }

  return (
    <Link to={'/series/' + id} state={id}>
      <motion.div initial='hidden' animate='visible' variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
          y: -80

        },
        visible: {
          scale: 1,
          opacity: 1,
          y: 0

        },

      }}
        transition={transition}
        className='series-details'
      >
      
      {
        poster_path ?
          <img src={API_IMG + poster_path} alt={original_name} />
          :
          <img src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' style={{ width: '100%', height: '90%', objectFit: 'cover' }} alt={original_name} />
      }
      <p className='series-name'>{original_language === 'en' ? original_name : name}</p>
    </motion.div>
    </Link>
  )
}

export default Serie
