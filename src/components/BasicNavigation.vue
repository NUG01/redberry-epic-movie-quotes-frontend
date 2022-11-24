<script>
import  HomeIcon  from "@/components/icons/HomeIcon.vue";
import  MoviesIcon  from "@/components/icons/MoviesIcon.vue";
import { useUserStore } from '@/stores/UserStore.js';
import { useRouter } from "vue-router";


export default {
  components:{HomeIcon, MoviesIcon},
  props:['feed', 'movies', 'profile','dataIsFetched', 'user'],

 setup(props){

    const login = useUserStore();
    const router = useRouter();
  



    const user=props.user;
    const dataIsFetched=props.dataIsFetched;
    const feedColor=props.feed;
    const moviesColor=props.movies;
    const profileColor=props.profile;


    function redirectToMoviesPage(){
       router.push({name : 'movie-list'})
    }
    function profilePage(){
       router.push({name : 'profile'})
    }
    function redirectToNewsFeed(){
       router.push({name : 'news-feed'})
}

   


    return{user,
    redirectToMoviesPage, 
    redirectToNewsFeed, 
    profilePage,
    moviesColor,
    profileColor,
    feedColor,
    dataIsFetched,
    user,
    dataIsFetched
    }
  }
  
}
</script>


<template>
<div v-if="dataIsFetched" class="flex flex-col items-start justify-center gap-[4.5rem] pl-[7rem] mt-[3rem]">
  <div class="flex items-center gap-[1.3rem]">
    <img src="/src/assets/InterstellarMovie.png" :class="profileColor" class="rounded-[100%] w-[6rem] h-[6rem] -translate-x-[25%]"/>
    <div class="flex flex-col ietms-center justify-center">
      <p class="text-[2.4rem] text-[#fff]">{{ user.name }}</p>
      <p @click="profilePage" class="text-[1.6rem] text-[#CED4DA] hover:cursor-pointer">{{ $t('newsFeed.edit_profile') }}</p>
    </div>
  </div>
  <div class="flex items-center justify-content gap-[4.2rem]">
    <home-icon :color="feedColor"></home-icon>
    <div @click="redirectToNewsFeed" class="text-[2.4rem] text-[#fff] hover:cursor-pointer">{{ $t('newsFeed.news_feed') }}</div>
  </div>
  <div class="flex items-center justify-content gap-[4.2rem]">
    <movies-icon :color="moviesColor"></movies-icon>
    <div @click="redirectToMoviesPage" class="text-[2.4rem] text-[#fff] hover:cursor-pointer">{{ $t('newsFeed.movie_list') }}</div>
</div>
</div>
  
</template>



<style scoped>

</style>