import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = (posterPath) => {
    console.log(posterPath,"card")
  return (
    <div className="w-36 m-2 ">
        <img  alt="Movie card" src={IMG_CDN_URL+posterPath.posterPath}/>

    </div>
  )
}

export default MovieCard