<script>
import { ref, onMounted } from "vue";
import { RouterView } from "vue-router";
import axios from "@/config/axios/index.js";
import { useLoginStore } from '@/stores/LoginStore.js';
import { useMoviesStore } from '@/stores/MoviesStore.js';



export default {
  setup(){
    const login = useLoginStore();
    const dataIsFetched=ref(false)
    const usersIsFetched=ref(false)
    const moviesIsFetched=ref(false)
    const movies = useMoviesStore();



  onMounted(async()=>{
    if(login.getAllUser==null){
      const resUsers= await axios.get("users")
      login.updateAllUserData(resUsers.data);
      login.changeUsersFetchedStatus()
      usersIsFetched.value=login.getUsersIsFetched
      }
    if(login.getUserData==null){
      const res= await axios.get("auth-user")
      login.updateUserData(res.data);
      login.changeFetchedStatus()
      dataIsFetched.value=login.getDataIsFetched
      }
    if(movies.getMovies==null){
      const resMovies = await axios.get(`movies/${login.getUserData.id}`);
      movies.saveMovies(resMovies.data);
      movies.changeMoviesFetchedStatus()
      moviesIsFetched.value=movies.getMoviesIsFetched
      }
   })



    return{dataIsFetched, usersIsFetched, moviesIsFetched}
  }
}
</script>

<template>
    <router-view v-if="dataIsFetched && usersIsFetched && moviesIsFetched"></router-view>
</template>

<style>
html{
  font-size: 62.5%;
  outline: none;
  margin:0;
  padding:0;
  box-sizing: border-box;
  overflow-x: hidden;
  width: 100vw;
}
</style>
