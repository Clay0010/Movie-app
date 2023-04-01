import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router';
import './actor.css'


const Actor = () => {
    const BASE_API = 'https://api.themoviedb.org/3'
    const API_KEY = '632bf4fb465f1296a555eed5ecee4ced'
    const API_IMG = 'https://image.tmdb.org/t/p/original/';
    const location = useLocation();
    const id = location.state;

    const [actorDetails, setActorDetails] = useState({})

    const fetchActorDetails = async () => {
        const { data } = await axios.get(`${BASE_API}/person/${id}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        })

        setActorDetails(data)
    }

    useEffect(() => {
        fetchActorDetails();
    }, [])

    return (
        <div>
            <img src="https://img.freepik.com/free-vector/abstract-blue-light-pipe-speed-zoom-black-background-technology_1142-9120.jpg?w=1060&t=st=1680306337~exp=1680306937~hmac=c6754a13b20830019b4a621cdabb97d02ff1589c2fc73b9b16465b7e4bca99ec" alt="background-image" className='background'/>
            <div className='actor-profile'>
                <div>

                    <img src={API_IMG + actorDetails.profile_path} alt={actorDetails.name} className='actor-image' />
                </div>
                <div>
                    <h1>{actorDetails.name}</h1>
                </div>
                <p>{actorDetails.birthday}</p>

            </div>
        </div>
    )
}

export default Actor
