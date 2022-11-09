import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useMoviesStore = defineStore("useMoviesStore",{
 state(){
  return{
      movies:[],
  }
 },

   getters:{
    getMovies: (state) => state.movies,
 },



    actions:{

    saveMovies(moviesData){
      this.movies=moviesData;
    }

 }
});
