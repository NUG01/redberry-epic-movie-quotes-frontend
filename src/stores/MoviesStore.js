import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useMoviesStore = defineStore("useMoviesStore",{
 state(){
  return{
      movies:null,
      moviesIsFetched:false,
  }
 },

   getters:{
    getMovies: (state) => state.movies,
    getMoviesIsFetched: (state) => state.moviesIsFetched,

 },
});
