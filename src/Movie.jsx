import React, { useEffect,useState } from 'react'
import Youtube from 'react-youtube';
import axios from 'axios';
import {Link} from 'react-router-dom'
const Movie = ({original_title, vote_average, overview, poster_path, release_date, id, title, original_language}) =>{
  const API_IMG = 'https://image.tmdb.org/t/p/w500/';
  
  
  const API_TRAILER = 'https://api.themoviedb.org/3/movie'
  const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'
  const [selected, setSelected]  = useState('');
  const fetchTrailer = async () => {
    const {data} = await axios.get(`${API_TRAILER}/${id}/videos?api_key=${API_KEY}&language=en-US`)
    const f = data.results.find(vid => vid.name === 'Official Trailer' || vid.name === 'official trailer')  
    const h = data.results.find(hi => hi.name === 'Official Trailer [ENG SUB]')   
    
    setSelected(f ? f.key || h.key : data.results[0].key )
    
  }

  useEffect(()=>{
    fetchTrailer();
  },[])
  
  return (
    
    <div className='movie'>
      {poster_path ? <img src={API_IMG + poster_path} />: <img src='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' style={{width:500}}/>}
    <div className="content">
    {original_language === 'en' ? <h1>{original_title}</h1> : <h1>{title}</h1>}
      
    
      
      {selected ? <a href={`https://www.youtube.com/watch?v=${selected}`} target="_blank" className='trailer'>Trailer</a> : 'Sorry No Available Trailers Found (404)'}
      
      </div>
      <Link to={'/movie/' + id} state={id} className='show-details'>
          Show Details
        </Link>
    </div>
    
  )
}
export default Movie; 