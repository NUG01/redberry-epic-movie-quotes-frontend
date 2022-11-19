<script>
import { useLoginStore } from '@/stores/LoginStore.js';
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
import { useMoviesStore } from '@/stores/MoviesStore.js';
import { getJwtToken } from "@/helpers/jwt/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";




export default {
  name:'MovieList',
  emits:['emit-close'],
  components:{BasicHeader, BasicNavigation, BasicButton, AddMovie,SearchIcon, QuoteIcon, AddmovieForm, LoadingSpinner },
  
  setup(){

    const login = useLoginStore();
    const router = useRouter();
    const dataIsFetched=ref(false)
    const moviesIsFetched=ref(false)
    const user = ref([]);
    const moviesData=ref([])
    const moviesList=ref([])


    const addMoviesModal=ref(false);
    const imageDisplay=ref('');

      user.value=login.getUserData
      dataIsFetched.value=login.getDataIsFetched
    onMounted(async () => {
     const res = await axios.get(`movies/${user.value.id}`);
     moviesData.value=res.data
     moviesList.value=res.data
     moviesIsFetched.value=true
      // imageDisplay.value='http://localhost:8000/public/images/'+user.value.thumbnail
    });

    function closeAddMoviesModal(){
      addMoviesModal.value=false
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
  searchSubmit
}
  }
  
}
</script>


<template>
  <div class="main w-[100vw] h-[100vh] relative overflow-hidden">
  <basic-header class="z-50"></basic-header>
  <main>
    <addmovie-form @emit-close="closeAddMoviesModal" v-if="addMoviesModal" :user="user" axiosEndpoint="movies" class="absolute" name="Add Movie"></addmovie-form>
    <div>
      <basic-navigation :user="user" :dataIsFetched="dataIsFetched" feed="#fff" movies="#E31221" profile="border-none"></basic-navigation>
    </div>
    <loading-spinner texts="hidden" bgColor="bg-none" location="mt-[20rem]" v-if="!moviesIsFetched"></loading-spinner>
    <div v-else class="bg-gray h-[92.65vh] pr-[8rem] pt-[3rem]">
      <div class="w-[100%] flex items-center justify-between mb-[5rem]">
        <div class="text-[2.4rem] font-medium text-[#fff]">{{ $t('newsFeed.my_list_of') }}  ({{ $t('newsFeed.total') }} <span>{{ moviesList.length }}</span>)</div>
        <div class="flex items-center justify-center gap-[3rem]">
          <div class="text-[2rem] text-[#CED4DA] flex items-center justify-center gap-[1.6rem] border-b-[#6C757D] border-b border-b-solid pb-[0.9rem]"><search-icon></search-icon><input @keydown.enter.prevent="searchSubmit($i18n.locale, $event)" :placeholder="$t('newsFeed.search')"/></div>
          <basic-button @click="addMoviesModal=true" type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[4px]" width="w-[100%]">
          <div class="flex items-center justify-center gap-[8px]"><add-movie></add-movie><p>{{ $t('newsFeed.add_movie') }}</p></div></basic-button>
        </div>
      </div>
      <div class="w-[100%] movies-grid h-[90.3%] overflow-scroll scrollHide pb-[1.5rem]">
        <div class="flex flex-col gap-[1.6rem]" v-for="movie in moviesList" :key="movie.id">
          <router-link :to="{ name: 'movie-description', params: { id: movie.id }}"><img src="/src/assets/TenenbaumsMovie.png" class="w-[100%] rounded-[12px]" /></router-link>
          <p class="text-[2.4rem] font-medium text-[#fff]">{{ $i18n.locale=='en'? movie.name.en : movie.name.ka }}</p>
          <div class="flex items-center justify-start gap-[1.2rem] mt-[2px]">
            <span class="text-[2rem] font-medium text-[#fff]">10</span>
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
</style>