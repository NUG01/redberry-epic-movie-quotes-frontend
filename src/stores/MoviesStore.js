import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useMoviesStore = defineStore("useMoviesStore",{
 state(){
  return{
      movies:[],
      quotes:[]
  }
 },

   getters:{
    getMovies: (state) => state.movies,
    getQuotes: (state) => state.quotes,
 },



    actions:{

    saveMovies(moviesData){
      this.movies=moviesData;
    },
    saveQuotes(quotesData){
      this.quotes=quotesData;
    }

 }
});
