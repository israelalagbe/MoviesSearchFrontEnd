import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from './store/actions/movie';

function App() {
  const dispatch = useDispatch();
  const { movies, total } = useSelector((state)=>state.movie); 
  useEffect(()=>{
    dispatch(fetchMovies())
  },[dispatch]);
  return (
    <div className="App">
      Hello world {total} <br />
      {movies.map((movie)=><div>{movie.title}</div>)} 
    </div>
  );
}

export default App;
