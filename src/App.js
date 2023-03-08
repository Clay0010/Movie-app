

import {useEffect, useState} from 'react';
import './index.css'
import Movie from './Movie'
import Youtube from 'react-youtube'
import axios from 'axios'


const App = () => {
  
  const [movies, setMovies] = useState([]);
  const [query,setQuery] = useState('')
   

    const API_URL_ = 'https://api.themoviedb.org/3'
const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'


    const handleSearch = (e) => {
      e.preventDefault();
      fetchMovies(query);
  }


  
  

 

  const fetchMovies = async (query) =>{
    const type = query ?  'search/movie' : 'movie/popular'
    const {data} = await axios.get(`${API_URL_}/${type}`, {
      params:{
        api_key: API_KEY,
        query: query,
        language:'en-US'
        
        
      }
    })
    setMovies(data.results)
    
 
  }


  useEffect(()=>{
    fetchMovies();
  },[])
  
 
  return (
    <div>
    
     <div>
     <form onSubmit={handleSearch}>
            
            <input type="search"  name='search' onChange={(e)=> setQuery(e.target.value)} placeholder='Search Movies'/>
            <button type='submit'>Search</button>
            
            
        </form>
     <div>
     {
            movies.map((movie)=><Movie key={movie.id} {...movie} />)
     }
     </div>
      
     </div>
      
      
    </div>
  )
}

export default App;

