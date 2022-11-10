<script>
import { useLoginStore } from '@/stores/LoginStore.js';
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import BasicHeader from "@/components/BasicHeader.vue";
import BasicNavigation from "@/components/BasicNavigation.vue";
import BasicButton from "@/components/BasicButton.vue";
import AddMovie from "@/components/icons/AddMovie.vue";
import HeartIcon from "@/components/icons/HeartIcon.vue";
import DotsIcon from "@/components/icons/DotsIcon.vue";
import EditPencil from "@/components/icons/EditPencil.vue";
import ViewQuote from "@/components/icons/ViewQuote.vue";
import DeleteTrash from "@/components/icons/DeleteTrash.vue";
import DescriptionComment from "@/components/icons/DescriptionComment.vue";
import axios from "@/config/axios/index.js";
import { useMoviesStore } from '@/stores/MoviesStore.js';



export default {
  name:'MovieDescription',
  props:['id'],
  emits:['emit-dots'],
  components:{BasicHeader, BasicNavigation, BasicButton, AddMovie, HeartIcon, DescriptionComment, DotsIcon, DeleteTrash, EditPencil, ViewQuote },
  
  setup(props){

    const login = useLoginStore();
    const router = useRouter();
    const movies = useMoviesStore();


    const addMoviesModal=ref(false);
    const imageDisplay=ref('');
    const movieData=ref({})
    const moviesData=ref({})
    const movieName=ref({})
    const currentId=ref('')


    onMounted(async () => {
      const res = await axios.get("movies");
     saveFetchedData(res);
    // imageDisplay.value='http://localhost:8000/public/images/'+user.value.thumbnail
    });
      

    watch(router.currentRoute,async () => {
      const res = await axios.get("movies");
      saveFetchedData(res);
     });
      
      function saveFetchedData(res){
        movies.saveMovies(res.data)
        movieData.value=movies.getMovies.find(x => x.id == props.id);
        moviesData.value=movies.getMovies
        movieName.value=JSON.parse(JSON.stringify(movieData.value.name))
      }

      function quoteEditModal(id){
        document.getElementById(`movie${id}`).classList.toggle('hidden')
      }

      currentId.value=props.id;
  
    
return {addMoviesModal, movieData, quoteEditModal, movieName, moviesData, currentId}
  }
  
}
</script>


<template>
  <div class="main w-[100vw] h-[100vh] relative main overflow-x-hidden">
  <basic-header></basic-header>
  <main>
    <div>
      <basic-navigation feed="#fff" movies="#E31221" profile="border-none"></basic-navigation>
    </div>
    <div>
      <div class="text-[2.4rem] font-medium text-[#fff] mt-[3rem]">Movie description</div>
      <div class="mt-[3rem] listGrid">
        
        <div class="w-[100%]">
          <div class="mb-[4rem]">
          <img src="/src/assets/LordofRingsMovie.png" class="w-[100%] rounded-[12px]"/>
          <div class="mt-[4rem] flex items-center w-[55%]">
            <div>
            <p class="font-normal text-[2.4rem] text-[#fff] mr-[1.6rem]">Quotes (total <span>{{ moviesData.length }}</span>)</p>
            </div>
            <div class="w-[1px] h-[2.4rem] bg-[#6C757D]"></div>
            <div class="inline-block ml-[1.6rem]">
            <router-link :to="{ name: 'quote-add', params: { id: currentId }}"><basic-button  type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[4px]" width="w-[100%]">
          <div class="flex items-center justify-center gap-[8px]"><add-movie></add-movie><p>Add quote</p></div></basic-button></router-link>
            </div>
          </div>
          </div>
          <div class="flex flex-col gap-[4rem] h-[17%]">
            <div class="px-[3.2rem] py-[2.4rem] w-[100%] bg-[#09090f] rounded-[10px]" v-for="movie in moviesData" :key="movie">
            <div class="relative">
              <dots-icon @emit-dots="quoteEditModal(movie.id)" class="absolute top-0 right-0 cursor-pointer z-50"></dots-icon>
              <div :id="'movie'+movie.id" class="p-[4rem] bg-[#24222F] hidden flex flex-col justify-center gap-[3rem] absolute top-[2rem] right-0 translate-x-[87%] rounded-[10px] z-50">
                   <div class="flex items-center gap-[1.6rem]">
                    <view-quote></view-quote>
                   <router-link :to="{ name: 'quote-details', params: { id: movie.id }}"><p class="text-[1.6rem] text-[#fff] cursor-pointer">View Quote</p></router-link>
                   </div>
                   <div class="flex items-center gap-[1.6rem]">
                    <edit-pencil></edit-pencil>
                    <router-link :to="{ name: 'quote-edit', params: { id: movie.id }}"><p class="text-[1.6rem] text-[#fff] cursor-pointer">Edit</p></router-link>
                   </div>
                   <div class="flex items-center gap-[1.6rem]">
                    <delete-trash></delete-trash>
                    <p class="text-[1.6rem] text-[#fff] cursor-pointer">Delete</p>
                   </div>
              </div>
              <div class="flex items-center gap-[3.1rem] pb-[2.4rem] border-b border-b-[#f0f0f036] border-b-solid">
                <img src="/src/assets/LordofRingsMovie.png" class="w-[30%] rounded-[2px]"/>
                <p class="text-[2.4rem] text-[#CED4DA]">"Frankly, my dear, I don'tgive a damn." </p>
                </div>
              <div class="flex items-center gap-[3.2rem] mt-[2.4rem]">
                <div class="flex items-center gap-[1.6rem]">
                  <span class="text-[2rem] text-[#fff]">3</span>
                  <description-comment></description-comment>
                </div>
                <div class="flex items-center gap-[1.6rem]">
                  <span class="text-[2rem] text-[#fff]">10</span>
                  <heart-icon></heart-icon>
               </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        
        <div class="h-[100%] pr-[8rem]">
          <div class="mb-[3rem]">
            <div class="mb-[2.4rem] flex items-center justify-between">
              <p class="text-[2.4rem] text-[#DDCCAA] font-medium">{{ movieName.en }}</p>
              <div class="flex items-center justify-center bg-[#24222F] px-[2.7rem] py-[1rem] rounded-[10px]">
                <router-link :to="{ name: 'quote-edit', params: { id: currentId }}"><edit-pencil class="mr-[2.5rem] cursor-pointer"></edit-pencil></router-link>
                <div class="bg-[#6C757D] w-[1px] h-[1.8rem]"></div>
                <delete-trash class="ml-[2.5rem] cursor-pointer"></delete-trash>
              </div>
            </div>
            <div class="flex items-center gap-[8px]">
              <p v-for="genre in movieData.genre" :key="genre" class="font-semibold text-[#fff] text-[1.8rem] px-[10px] py-[2px] bg-[#6C757D] inline-block rounded-[4px]">{{ genre }}</p>
            </div>
          </div>
          <div class="flex justify-center flex-col gap-[2rem] pl-[1.2rem]">
            <div class="flex items-center gap-[1rem]">
              <p class="text-[#CED4DA] text-[1.8rem] font-bold">Director:</p>
              <p class="text-[#fff] text-[1.8rem] font-medium">NICK CASSAVETES</p>
            </div>
            <p class="text-[#CED4DA] text-[1.8rem] font-normal">
              In a nursing home, resident Duke reads a romance story to an old woman who has senile dementia with memory loss. In the late 1930s, wealthy seventeen year-old Allie Hamilton is spending summer vacation in Seabrook. Local worker Noah Calhoun meets Allie at a carnival 
            </p>
          </div>
        </div>
      
      </div>
    </div>
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
.listGrid{
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  column-gap: 2rem;
}

 .scrollbar::-webkit-scrollbar {
  width: 1.5rem;
  background: #454554bb;
  border-radius: 0 10px 10px 0;
  border-right: 0.1px solid #454554bb;
  border-right: 0.1px solid #454554bb;
}

.scrollbar::-webkit-scrollbar-thumb {
  width: 1rem;
  background: #bdbdbde3;
  border-radius: 0 10px 10px 0;
}
</style>