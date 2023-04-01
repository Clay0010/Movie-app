import React, { useEffect, useState  } from 'react'
import Slider from "react-slick";
import axios from 'axios'
import { useLocation } from 'react-router';
import './actor.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Particles from '../partical/Partical'


const Actor = () => {
    const BASE_API = 'https://api.themoviedb.org/3'
    const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'
    const API_IMG = 'https://image.tmdb.org/t/p/original/';
    const MOVIE_IMG = 'https://image.tmdb.org/t/p/w300/';

    const location = useLocation();
    const id = location.state;

    const [actorDetails, setActorDetails] = useState({})
    const [actorMovies, setActorMovies] = useState([])
    const fetchActorDetails = async () => {
        const { data } = await axios.get(`${BASE_API}/person/${id}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        })

        setActorDetails(data)
    }

    const fetchActorMovies =async () =>{
        const {data} = await axios.get(`${BASE_API}/person/${id}/movie_credits`,{
            params:{
                api_key: API_KEY,
                language: 'en-US'
            }
        })

        setActorMovies(data.cast)
    }

    useEffect(() => {
        fetchActorDetails();
        fetchActorMovies();
    }, [])


  

    return (
        <div>
        <Particles className='particle'/>
           
            <div className='actor-profile'>
                <div>

                    <img src={API_IMG + actorDetails.profile_path} alt={actorDetails.name} className='actor-image' />
                </div>
                <div>
                    <h1>{actorDetails.name}</h1>
                </div>
                <p>{actorDetails.birthday}</p>

                <h2>Movies</h2>
            <div className='actor-movies'>

            
                 {actorMovies.slice(0,20).map((movie)=>{
                      return (<div>
                      <img src={MOVIE_IMG + movie.poster_path} alt="" />
                      <p>{movie.original_title}</p>
                      </div>
                      )
                      
                      
                      
                     })}
                    

                   
                     </div>

                </div>
            </div>
                
        
    )
}

export default Actor
