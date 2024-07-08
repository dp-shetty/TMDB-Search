import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setMovies, setError, filterMovies } from '../store';


function Tmdb() {

  let dispatch = useDispatch();
  let filteredMovies = useSelector(state => state.movie.filteredMovies);
  
  let ipRef = useRef()



  
let apiKey = '85faefcbd5ba923850b627d38b1c7a6c';
let baseUrl = "https://image.tmdb.org/t/p/"
let posterSize = "w400"

let fetchMovies = async (page) => {
  let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`);
  let data = await response.json();
  let firstPageMovie =data.results 

  let uniqueMoviesMap = new Map();

  firstPageMovie.forEach(movie => {
    if (!uniqueMoviesMap.has(movie.title)) {
      uniqueMoviesMap.set(movie.title, movie);
    }
  });


  let uniqueMovies = Array.from(uniqueMoviesMap.values());

  await axios.post("http://localhost:3000/movies", uniqueMovies);

  dispatch(setMovies(uniqueMovies));

};


let delay = (ms) => new Promise((resolve) => {setTimeout(resolve, ms)});


useEffect(()=>{
  fetchMovies(1)
},[])


let getIpValue = async()=>{
  let ipValue = ipRef.current.value.trim().toLowerCase();
  try {
    dispatch(filterMovies(ipValue));
  } catch (error) {
    dispatch(setError(error.message));
  }

  if (!ipValue) {
    console.log("Please enter a search term.");
  }

}




  return (
    <>
    <div id="searchDiv">
    <input type="text" ref={ipRef}/>
    <button onClick={getIpValue}>SEARCH</button>
    </div>

    <div id="movieList">
        {
          filteredMovies && filteredMovies.map(({poster_path,id,title})=>{
           return <div key={id}>
           <h1>{title}</h1>
           <img src={`${baseUrl}${posterSize}${poster_path}`} alt="" />
           </div> 
          })
        }
      </div>
    </>
  )
}

export default Tmdb