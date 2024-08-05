import {  useSelector} from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';



const VedioBackground = ({movieId}) => {
  const trailerVideo = useSelector(store=>store.movies?.trailerVideo)
  
   useMovieTrailer(movieId);

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