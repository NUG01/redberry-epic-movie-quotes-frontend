<script>
import { useUserStore } from '@/stores/UserStore.js';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import QuoteList from "@/components/QuoteList.vue";
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
import AddmovieForm from "@/components/forms/AddmovieForm.vue";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";




export default {
  name:'MovieDescription',
  props:['id'],
  emits:['emitDots', 'updateMovie', 'quotesQuantity'],
  components:{BasicHeader, QuoteList, BasicNavigation, BasicButton, AddMovie, HeartIcon, LoadingSpinner, DescriptionComment, DotsIcon, DeleteTrash, EditPencil, ViewQuote, AddmovieForm },
  
  setup(props){

    const login = useUserStore();
    const router = useRouter();
    const dataIsFetched=ref(false)



    const addMoviesModal=ref(false);
    const imageDisplay=ref('');
    const movieData=ref([])
    const moviesData=ref([])
    const movieName=ref([])
    const authUser=ref([])
    const currentId=props.id
    const quotesLength=ref('')
    const genres=ref([])
    const quotes=ref([])

      onMounted(async ()=>{
       authUser.value=login.getUserData
       const res = await axios.get(`movie/${currentId}`);
       genres.value=res.data.genres
       movieData.value=res.data.movie
       quotes.value=res.data.quotes
       movieName.value=JSON.parse(JSON.stringify(movieData.value.name))
       quotesLength.value=res.data.quotes.length  
       dataIsFetched.value=true
     
        })

       async function updateMovie(){
        dataIsFetched.value=false
          const res = await axios.get(`movie/${currentId}`);
          movieData.value=res.data.movie
          genres.value=res.data.genres
          quotes.value=res.data.quotes
          quotesLength.value=res.data.quotes.length 
          movieName.value=JSON.parse(JSON.stringify(movieData.value.name))
          dataIsFetched.value=true
        }

        function updateQuantity(data){
          quotesLength.value=data.length   
        }
     
    // imageDisplay.value='http://localhost:8000/public/images/'+user.value.thumbnail
 
    

      function handleCloseEmit(){
       addMoviesModal.value=false
      }


      function deleteMovie(id){
        axios.delete(`movies/${id}`)
        .then((res)=>{
          router.push({name: 'movie-list'})
        })
        .catch((err)=>{
          alert('Something went wrong!')
        })
      }
  
    
return {
addMoviesModal, 
movieData,  
movieName, 
moviesData, 
currentId, 
addMoviesModal, 
handleCloseEmit,
deleteMovie,
quotesLength,
authUser,
dataIsFetched,
updateMovie,
updateQuantity,
genres,
quotes
}
  }
  
}
</script>


<template>
  <div class="main w-[100vw] h-[100vh] relative main overflow-x-hidden">
  <basic-header></basic-header>
  <loading-spinner texts="hidden" bgColor="bg-none" location="mt-[20rem]" v-if="!dataIsFetched"></loading-spinner>
  <main v-else>
  <addmovie-form @update-movie="updateMovie" :user="authUser" @emit-close="handleCloseEmit" v-if="addMoviesModal" axiosEndpoint="update-movie" class="absolute z-50" :name="$t('newsFeed.edit_movie')" 
  :name_en="movieData.name.en" 
  :name_ka="movieData.name.ka" 
  :director_en="movieData.director.en" 
  :director_ka="movieData.director.ka" 
  :description_en="movieData.description.en" 
  :description_ka="movieData.description.ka" 
  :id="currentId"
   ></addmovie-form>

    <div>
      <basic-navigation :user="authUser" :dataIsFetched="dataIsFetched" feed="#fff" movies="#E31221" profile="border-none"></basic-navigation>
    </div>
    <div>
      <div class="text-[2.4rem] font-medium text-[#fff] mt-[3rem]">{{ $t('newsFeed.movie_description') }}</div>
      <div class="mt-[3rem] listGrid">
        
        <div class="w-[100%]">
          <div class="mb-[4rem]">
          <img src="/src/assets/LordofRingsMovie.png" class="w-[100%] rounded-[12px]"/>
          <div class="mt-[4rem] flex items-center w-[55%]">
            <div>
            <p class="font-normal text-[2.4rem] text-[#fff] mr-[1.6rem]">{{ $t('newsFeed.quotes') }} ({{ $t('newsFeed.total') }} <span>{{ quotesLength }}</span>)</p>
            </div>
            <div class="w-[1px] h-[2.4rem] bg-[#6C757D]"></div>
            <div class="inline-block ml-[1.6rem]">
            <router-link :to="{ name: 'quote-add', params: { id: currentId }}"><basic-button  type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[4px]" width="w-[100%]">
          <div class="flex items-center justify-center gap-[8px]"><add-movie></add-movie><p>{{ $t('newsFeed.add_quote') }}</p></div></basic-button></router-link>
            </div>
          </div>
          </div>
            <quote-list v-if="quotesLength>0" @quotes-quantity="updateQuantity" :quotes="quotes" :id="currentId"></quote-list>
        </div>
        
        <div class="h-[100%] pr-[8rem]">
          <div class="mb-[3rem]">
            <div class="mb-[2.4rem] flex items-center justify-between">
              <p class="text-[2.4rem] text-[#DDCCAA] font-medium">{{ $i18n.locale=='en'? movieName.en : movieName.ka }}</p>
              <div class="flex items-center justify-center bg-[#24222F] px-[2.7rem] py-[1rem] rounded-[10px]">
                <edit-pencil @click="addMoviesModal=true" class="mr-[2.5rem] cursor-pointer"></edit-pencil>
                <div class="bg-[#6C757D] w-[1px] h-[1.8rem]"></div>
                <delete-trash @click="deleteMovie(currentId)" class="ml-[2.5rem] cursor-pointer"></delete-trash>
              </div>
            </div>
            <div class="flex items-center gap-[8px]">
              <p v-for="genre in genres" :key="genre.id" class="font-semibold text-[#fff] text-[1.8rem] px-[10px] py-[2px] bg-[#6C757D] inline-block rounded-[4px]">{{ genre.name }}</p>
            </div>
          </div>
          <div class="flex justify-center flex-col gap-[2rem] pl-[1.2rem]">
            <div class="flex items-center gap-[1rem]">
              <p class="text-[#CED4DA] text-[1.8rem] font-bold">{{ $t('newsFeed.director') }}:</p>
              <p class="text-[#fff] text-[1.8rem] font-medium">{{ $i18n.locale=='en'? movieData.director.en : movieData.director.ka }}</p>
            </div>
            <p class="text-[#CED4DA] text-[1.8rem] font-normal">
             {{ $i18n.locale=='en'? movieData.description.en : movieData.description.ka }}
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