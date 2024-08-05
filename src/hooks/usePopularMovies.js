import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../utils/moviesSlice';
import { useEffect } from 'react';

const usePopularMovies =() =>{
    const dispatch=useDispatch();

  const getPopularMovies=async()=>{
  const data= await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
  const json =await data.json();
  dispatch(addPopularMovies(json.results));

};
// making api call inside useEffect so when compo is rendered its called only once
//put [] to avoid infinite api calls

useEffect(()=>{
  getPopularMovies();

},[])
}

export default usePopularMovies;