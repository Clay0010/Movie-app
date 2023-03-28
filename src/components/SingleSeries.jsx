import React from 'react'
import './series.css'
import { Link } from 'react-router-dom';
const Serie = ({ original_name, poster_path, original_language, name, id }) => {

  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  return (
    <Link to={'/series/' + id} state={id}>
    <div className='series-details'>
      
      {
        poster_path ?
          <img src={API_IMG + poster_path} alt={original_name} />
          :
          <img src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' style={{ width: '100%', height: '90%', objectFit: 'cover' }} alt={original_name} />
      }
      <p className='series-name'>{original_language === 'en' ? original_name : name}</p>
    </div>
    </Link>
  )
}

export default Serie
