import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch , useSelector} from 'react-redux';
import { addTrailerVideo } from '../utils/moviesSlice';


const VedioBackground = ({movieId}) => {
  const trailerVideo = useSelector(store=>store.movies?.trailerVideo)
  const dispatch = useDispatch();

  const getMovieVideos = async () =>{
    const data = await fetch('https://api.themoviedb.org/3/movie/533535/videos?language=en-US', API_OPTIONS)
    const json = await data.json();
    console.log(json);
    const filterData = json.results.filter((video)=> video.type === "Trailer");
    const trailer=filterData.length? filterData[0] : json.results[0];
    console.log("trailor",trailer)
    dispatch(addTrailerVideo(trailer));

  };

  useEffect(()=>{
    getMovieVideos();
  },[])


  return (
    <div className=" w-full ">
      <iframe
       width="500"
       height ="315"
      src={"https://www.youtube.com/embed/"+trailerVideo?.key}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
    </div>
  )
}

export default VedioBackground