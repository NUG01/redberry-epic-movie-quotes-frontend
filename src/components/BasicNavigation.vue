<script>
import  HomeIcon  from "@/components/icons/HomeIcon.vue";
import  MoviesIcon  from "@/components/icons/MoviesIcon.vue";
import { useLoginStore } from '@/stores/LoginStore.js';
import { onMounted, ref, computed} from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";


export default {
  components:{HomeIcon, MoviesIcon},
  props:['feed', 'movies', 'profile'],

 setup(props){

    const login = useLoginStore();
    const router = useRouter();

    
    
    const users = ref({});
  
     onMounted(async () => {
       const res = await axios.get("auth-user");
      login.updateUserData(res.data);
      users.value =res.data;
    });



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

   


    return{users,
    redirectToMoviesPage, 
    redirectToNewsFeed, 
    profilePage,
    moviesColor,
    profileColor,
    feedColor
    }
  }
  
}
</script>


<template>
<div class="flex flex-col items-start justify-center gap-[4.5rem] pl-[7rem] mt-[3rem]">
  <div class="flex items-center gap-[1.3rem]">
    <img src="/src/assets/InterstellarMovie.png" :class="profileColor" class="rounded-[100%] w-[6rem] h-[6rem] -translate-x-[25%]"/>
    <div class="flex flex-col ietms-center justify-center">
      <p class="text-[2.4rem] text-[#fff]">{{ users.name }}</p>
      <p @click="profilePage" class="text-[1.6rem] text-[#CED4DA] hover:cursor-pointer">Edit your profile</p>
    </div>
  </div>
  <div class="flex items-center justify-content gap-[4.2rem]">
    <home-icon :color="feedColor"></home-icon>
    <div @click="redirectToNewsFeed" class="text-[2.4rem] text-[#fff] hover:cursor-pointer">News feed</div>
  </div>
  <div class="flex items-center justify-content gap-[4.2rem]">
    <movies-icon :color="moviesColor"></movies-icon>
    <div @click="redirectToMoviesPage" class="text-[2.4rem] text-[#fff] hover:cursor-pointer">List of movies</div>
</div>
</div>
  
</template>



<style scoped>

</style>