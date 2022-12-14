<script>
import { useUserStore } from '@/stores/UserStore.js';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BasicHeader from "@/components/BasicHeader.vue";
import BasicNavigation from "@/components/BasicNavigation.vue";
import BasicButton from "@/components/BasicButton.vue";
import AddMovie from "@/components/icons/AddMovie.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import QuoteIcon from "@/components/icons/QuoteIcon.vue";
import AddmovieForm from "@/components/forms/AddmovieForm.vue";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";


export default {
  name:'MovieList',
  emits:['emitClose', 'updateMovie'],
  components:{BasicHeader, BasicNavigation, BasicButton, AddMovie,SearchIcon, QuoteIcon, AddmovieForm, LoadingSpinner },
  
  setup(){

    const login = useUserStore();
    const router = useRouter();
    const dataIsFetched=ref(false)
    const moviesIsFetched=ref(false)
    const user = ref([]);
    const moviesData=ref([])
    const quotesData=ref([])
    const moviesList=ref([])
    const imageUrl=import.meta.env.VITE_API_BASE_URL_IMAGE



    const addMoviesModal=ref(false);
    const imageDisplay=ref('');

      user.value=login.getUserData
      dataIsFetched.value=true
    onMounted(async () => {
     const res = await axios.get('movies');
     quotesData.value=res.data.quotes
     moviesData.value=res.data
     moviesList.value=res.data
     moviesList.value=(moviesList.value).reverse()
     moviesIsFetched.value=true
    });

    function closeAddMoviesModal(){
      addMoviesModal.value=false
    }
    function movieImage(image){
    return imageUrl+image
    }

   async function updateMovieList(){
        moviesIsFetched.value=false
        const res = await axios.get('movies');
        moviesList.value=res.data
        moviesList.value=(moviesList.value).reverse()
        moviesIsFetched.value=true
    }

     function searchSubmit(locale, ev){
    moviesList.value=moviesData.value
    let target=ev.target.value
    if(target==''){
      moviesList.value=moviesData.value
    }
    if(locale=='en'){
      moviesList.value=[]
       moviesList.value=moviesData.value.filter(x => (x.name.en).includes(target))
    }
    if(locale=='ka'){
      moviesList.value=[]
      moviesList.value=moviesData.value.filter(x => (x.name.ka).includes(target))

    }
    }
    
return {
  addMoviesModal,
  closeAddMoviesModal, 
  moviesList,
  user,
  dataIsFetched,
  moviesIsFetched,
  searchSubmit,
  updateMovieList,
  quotesData,
  movieImage
}
  }
  
}
</script>


<template>
  <div class="main w-[100vw] h-[100vh] relative overflow-hidden">
  <basic-header class="z-50"></basic-header>
  <main class="md:px-[3.2rem] md:w-[100vw]">
    <addmovie-form @update-movie="updateMovieList" @emit-close="closeAddMoviesModal" v-if="addMoviesModal" :user="user" axiosEndpoint="movies" class="absolute" name="Add Movie"></addmovie-form>
    <div class="md:hidden">
      <basic-navigation :user="user" :dataIsFetched="dataIsFetched" feed="#fff" movies="#E31221" profile="border-none"></basic-navigation>
    </div>
    <loading-spinner texts="hidden" bgColor="bg-none" location="mt-[20rem]" v-if="!moviesIsFetched"></loading-spinner>
    <div v-else class="bg-gray h-[92.65vh] pr-[8rem] xxl:pr-[8rem] xl:pr-[3rem] llg:pr-[3rem] lg:pr-[3rem] pt-[3rem] md:pr-[0px] md:pt-[3.5rem] md:w-[100%]">
      <div class="w-[100%] flex items-center justify-between mb-[5rem]">
        <div class="text-[2.4rem] md:text-[2.2rem] sm:text-[2rem] font-medium text-[#fff] total">{{ $t('newsFeed.my_list_of') }}<br class="hidden md:block">  <span class="md:text-[1.6rem] sm:text-[1.4rem]">({{ $t('newsFeed.total') }} <span>{{ moviesList.length }}</span>)</span></div>
        <div class="flex items-center justify-center gap-[3rem]">
          <div class="md:hidden text-[2rem] text-[#CED4DA] flex items-center justify-center gap-[1.6rem] border-b-[#6C757D] border-b border-b-solid pb-[0.9rem] hide"><search-icon></search-icon><input @keydown.enter.prevent="searchSubmit($i18n.locale, $event)" :placeholder="$t('newsFeed.search')"/></div>
          <basic-button @click="addMoviesModal=true" type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] md:px-[12px] md:py-[px] rounded-[4px]" width="w-[100%]">
          <div class="flex items-center justify-center gap-[8px]"><add-movie></add-movie><p>{{ $t('newsFeed.add_movie') }}</p></div></basic-button>
        </div>
      </div>
      <div class="w-[100%] md:w-[100%] movies-grid h-[90.3%] overflow-y-scroll scrollHide pb-[1.5rem]">
        <div class="flex flex-col gap-[1.6rem]" v-for="movie in moviesList" :key="movie.id">
          <router-link :to="{ name: 'movie-description', params: { id: movie.id }}"><div :style="'background-image:url('+(movieImage(movie.thumbnail))+')'" class="w-[100%] height rounded-[12px] bg-cover bg-no-repeat bg-center"></div></router-link>
          <p class="text-[2.4rem] font-medium text-[#fff]">{{ $i18n.locale=='en'? movie.name.en : movie.name.ka }}</p>
          <div class="flex items-center justify-start gap-[1.2rem] mt-[2px] md:mt-0">
            <span class="text-[2rem] font-medium text-[#fff]">{{ movie.quotes.length }}</span>
            <quote-icon></quote-icon>
          </div>
        </div>
      </div>
    </div>
    <div></div>

  </main>
  </div>
</template>





<style scoped>
.main{
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);
}
main{
  display: grid;
  grid-template-columns: 1fr 3.6fr;
}
.movies-grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap:5rem;
  row-gap:6rem;
}
.scrollHide::-webkit-scrollbar {
  display: none;
}
.scrollHide {
  scrollbar-width: none; 
}
@media (max-width: 1550px) {
  .movies-grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap:3.2rem;
    row-gap:4.8rem;
  }

}
@media (max-width: 1450px) {
  .movies-grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap:4rem;
    row-gap:5rem;
  }
  main{
  display: grid;
  grid-template-columns: 1fr 3fr;
}
}

@media (max-width: 1250px) {
  .movies-grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap:4rem;
  row-gap:4rem;
  }
  main{
  display: grid;
  grid-template-columns: 1fr 2.1fr;
}
.total{
  font-size: 1.8rem;
}
input::placeholder {
  font-size: 1.8rem;
}
}
@media (max-width: 1050px) {
  main{
  display: grid;
  grid-template-columns: 1fr 1.8fr;
}
.movies-grid{
    column-gap:4rem;
  row-gap:3rem;
  }
.hide{
  display: none;
}
}
  @media (max-width: 920px) {
    main{
      display: grid;
      grid-template-columns: 1fr;
    }
  .movies-grid{
    display: grid;
    grid-template-columns: 1fr;
  }
  
    
  }
input {
 border:none;
 outline: none;
 background: none;
  font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
input::placeholder {
    font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
.height{
  height: 33rem;
}
@media (max-width: 1450px) {
  .height{
    height: 39rem;
  }
}
@media (max-width: 1250px) {
  .height{
    height: 33rem;
  }
}
@media (max-width: 1050px) {
  .height{
    height: 27rem;
  }
}
@media (max-width: 920px) {
  .height{
    height: 63rem;
  }
}
@media (max-width: 720px) {
  .height{
    height: 50rem;
  }
}
@media (max-width: 520px) {
  .height{
    height: 43rem;
  }
}
@media (max-width: 450px) {
  .height{
    height: 27rem;
  }
}

</style>