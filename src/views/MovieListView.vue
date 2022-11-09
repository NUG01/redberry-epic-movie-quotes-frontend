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



export default {
  name:'MovieList',
  emits:['emit-close'],
  components:{BasicHeader, BasicNavigation, BasicButton, AddMovie,SearchIcon, QuoteIcon, AddmovieForm },
  
  setup(){

    const login = useLoginStore();
    const router = useRouter();
    const movies = useMoviesStore();


    const addMoviesModal=ref(false);
    const imageDisplay=ref('');
    const moviesData=ref([])

    onMounted(async () => {
      const res = await axios.get("movies");
     movies.saveMovies(res.data)
     moviesData.value=movies.getMovies
      // imageDisplay.value='http://localhost:8000/public/images/'+user.value.thumbnail
      console.log(movies.getMovies, moviesData.value[0].id)
    });


const data=ref({})

function handleCloseEmit(){
  addMoviesModal.value=false
}
    
return {addMoviesModal,handleCloseEmit, moviesData}
  }
  
}
</script>


<template>
  <div class="main w-[100vw] h-[100vh] relative">
  <basic-header></basic-header>
  <main>
    <addmovie-form @emit-close="handleCloseEmit" v-if="addMoviesModal" class="absolute"></addmovie-form>
    <div>
      <basic-navigation feed="#fff" movies="#E31221" profile="border-none"></basic-navigation>
    </div>
    <div class="bg-gray h-[92.65vh] pr-[8rem] pt-[3rem]">
      <div class="w-[100%] flex items-center justify-between mb-[5rem]">
        <div class="text-[2.4rem] font-medium text-[#fff]">My list of movies  (Total <span>{{ moviesData.length }}</span>)</div>
        <div class="flex items-center justify-center gap-[3rem]">
          <div class="text-[2rem] text-[#CED4DA] flex items-center justify-center gap-[1.6rem]"><search-icon></search-icon><span>search</span></div>
          <basic-button @click="addMoviesModal=true" type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[4px]" width="w-[100%]">
          <div class="flex items-center justify-center gap-[8px]"><add-movie></add-movie><p>Add movie</p></div></basic-button>
        </div>
      </div>
      <div class="w-[100%] movies-grid h-[90.3%] overflow-scroll scrollHide pb-[1.5rem]">
        <div class="flex flex-col gap-[1.6rem]" v-for="movie in moviesData" :key="movie.id">
          <img src="/src/assets/TenenbaumsMovie.png" class="w-[100%] rounded-[12px]" />
          <p class="text-[2.4rem] font-medium text-[#fff]">{{ movie.name.en }}</p>
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
</style>