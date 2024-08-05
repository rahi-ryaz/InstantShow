import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';

const useNowPlayingMovies =() =>{
    const dispatch=useDispatch();

  const getNowPlayingMovies=async()=>{
  const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
  const json =await data.json();
  console.log(json.results);
  dispatch(addNowPlayingMovies(json.results));

};
// making api call inside useEffect so when compo is rendered its called only once
//put [] to avoid infinite api calls

useEffect(()=>{
  getNowPlayingMovies();

},[])
}

export default useNowPlayingMovies;