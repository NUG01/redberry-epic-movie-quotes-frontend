<script>
import  HomeIcon  from "@/components/icons/HomeIcon.vue";
import  MoviesIcon  from "@/components/icons/MoviesIcon.vue";
import { useUserStore } from '@/stores/UserStore.js';
import { useRouter } from "vue-router";


export default {
  components:{HomeIcon, MoviesIcon},
  props:['feed', 'movies', 'profile', 'user', 'medium', 'logout'],

 setup(props, context){

    const login = useUserStore();
    const router = useRouter();
  



    const user=props.user;
    const image=import.meta.env.VITE_API_BASE_URL_IMAGE+props.user.thumbnail;
    const feedColor=props.feed;
    const moviesColor=props.movies;
    const profileColor=props.profile;
    const medium=props.medium;
    const logout=props.logout;


    function redirectToMoviesPage(){
       router.push({name : 'movie-list'})
    }
    function profilePage(){
       router.push({name : 'profile'})
    }
    function redirectToNewsFeed(){
       router.push({name : 'news-feed'})
}

function closeSideMenu(){
     context.emit('closeMenu')
}
function logoutEmit(){
     context.emit('logoutMenu')
}

   


    return{user,
    redirectToMoviesPage, 
    redirectToNewsFeed, 
    profilePage,
    moviesColor,
    profileColor,
    feedColor,
    user,
    medium,
    closeSideMenu,
    logout,
    logoutEmit,
    image
    }
  }
  
}
</script>


<template>
<div class="flex flex-col items-start justify-center gap-[4.5rem] pl-[7rem] mt-[3rem]" :class="medium">
  <div @click="closeSideMenu" class="flex items-center gap-[1.3rem]">
  <div :class="profileColor" :style="'background-image:url('+image+')'" class="rounded-[100%] w-[6rem] h-[6rem] -translate-x-[25%] bg-cover bg-no-repeat bg-center"></div>
    <div class="flex flex-col ietms-center justify-center">
      <p class="text-[2.4rem] text-[#fff]">{{ user.name }}</p>
      <p @click="profilePage" class="text-[1.6rem] text-[#CED4DA] hover:cursor-pointer">{{ $t('newsFeed.edit_profile') }}</p>
    </div>
  </div>
  <div @click="closeSideMenu" class="flex items-center justify-content gap-[4.2rem]">
    <home-icon :color="feedColor"></home-icon>
    <div @click="redirectToNewsFeed" class="text-[2.4rem] text-[#fff] hover:cursor-pointer">{{ $t('newsFeed.news_feed') }}</div>
  </div>
  <div @click="closeSideMenu" class="flex items-center justify-content gap-[4.2rem]">
    <movies-icon :color="moviesColor"></movies-icon>
    <div @click="redirectToMoviesPage" class="text-[2.4rem] text-[#fff] hover:cursor-pointer">{{ $t('newsFeed.movie_list') }}</div>
</div>
<div v-if="logout" class="mt-[20rem] sm:mt-[75%] w-[100%] flex flex-col items-start gap-[2rem]">
  <div class="flex items-center justify-center w-[77%] gap-[2rem]">
    <div @click="$i18n.locale='en'" :class="[$i18n.locale=='en' ? 'bg-[#cdc9c2] text-[#000]' : 'bg-none text-[#fff]']" class="block flex items-center justify-center hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600] cursor-pointer rounded-[3px] min-w-[4rem] border border-solid border-[#fff]"><p class="text-[1.4rem] px-[5px] py-[4px]">Eng</p></div>
    <div @click="$i18n.locale='ka'" :class="[$i18n.locale=='ka' ? 'bg-[#cdc9c2] text-[#000]' : 'bg-none text-[#fff]']" class="block flex items-center justify-center hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600] cursor-pointer rounded-[3px] min-w-[4rem] border border-solid border-[#fff]"><p class="text-[1.4rem] px-[5px] py-[4px]">Ka</p></div>
  </div>
<button @click="logoutEmit" type="button" class="text-[white] w-[77%] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] hover:bg-[#cdc9c2] hover:text-[#222030] font-medium active:bg-[#b6b1a8] disabled:bg-[#e6e2da] focus:bg-[#a5a199] focus:text-[#222030]">{{ $t('newsFeed.logout') }}</button>

</div>

</div>
  
</template>