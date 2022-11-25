<script>
import { useUserStore } from '@/stores/UserStore.js';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BasicHeader from "@/components/BasicHeader.vue";
import BasicNavigation from "@/components/BasicNavigation.vue";
import CommentsIcon from "@/components/icons/CommentsIcon.vue";
import LikesIcon from "@/components/icons/LikesIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import AddquoteForm from "@/components/forms/AddquoteForm.vue";
import { useAuthStore } from "@/stores/AuthStore.js";


export default {
  name:'NewsFeed',
  emits:['likedStatus', 'addpostClose', 'updateQuotes'],
  components:{BasicHeader, BasicNavigation, CommentsIcon, LikesIcon, PencilIcon, SearchIcon, LoadingSpinner, AddquoteForm},
  
  setup(){

    const login = useUserStore();
    const router = useRouter();
    const authStore = useAuthStore();


    const dataIsFetched=ref(false)
    const feedDataIsFetched=ref(false)
    const user = ref([]);
    const quoteData=ref([])
    const moviesData=ref([])
    const commentsData=ref([])
    const likesData=ref(null)
    const showComments=ref(false)
    const comments=ref([])
    const likes=ref([])
    const addPost=ref(false)
    const searchActivated=ref(false)
    const quotesList=ref([])
    const authors=ref([])
    const movieAuthors=ref([])



    onMounted(async ()=>{
    const res= await axios.get('quotes');
    const resMovies= await axios.get('movies');
    const resComments= await axios.get(`comments`);
    const resLikes= await axios.get(`likes`);
    likesData.value=resLikes.data
    likes.value=resLikes.data
    quoteData.value=res.data
    moviesData.value=resMovies.data
    quotesList.value=quoteData.value
    for (let i = 0; i < resComments.data.length; i++) {
      authors.value.push(resComments.data[i].user)
      commentsData.value.push(resComments.data[i])
      comments.value.push(resComments.data[i])
    }
    for (let i = 0; i < resMovies.data.length; i++) {
      movieAuthors.value.push(resMovies.data[i].user)
    }
    feedDataIsFetched.value=true
   })

    user.value =login.getUserData;
    if(user.value!=null){
     dataIsFetched.value=true
    }


    function commentSubmit(quote_id, event){
    if(event.target.value==''){
      return
    }else{
      axios.post('comments',{
        body: event.target.value,
        quote_id: quote_id,
        user_id: user.value.id
     }).then((res)=>{
        comments.value.push({
          body:event.target.value,
          user_id:user.value.id,
          quote_id: quote_id
        });
         event.target.value='';
         showComments.value=quote_id
     }).catch(()=>{
      alert('Something went wrong')
     })
    }
    
  }

  function handleLikes(id){
    axios.post('likes',{
      quote_id: id,
      user_id: user.value.id
    })
    .then((res)=>{
      likes.value=res.data.attributes
    })
    .catch(()=>{
      alert('Something went wrong')

    })
  }

  function openAddPostModal(){
    searchActivated.value=false
    addPost.value=!addPost.value
  }
  function searchClicked(){
       searchActivated.value=true
  }

  function updateQuotesIntoArray(data){
    quoteData.value=data
    quotesList.value=data
  }

  function searchSubmit(locale, ev){
    quotesList.value=quoteData.value
    let target=ev.target.value
    if(target==''){
      quotesList.value=quoteData.value
    }
    if(target[0]==='#'){
      let quote=(target).substring((target).indexOf("#")+1)
      if(locale=='en'){
        quotesList.value=quoteData.value.filter(x => (x.quote.en).includes(quote))
     }
     if(locale=='ka'){
       quotesList.value=quoteData.value.filter(x => (x.quote.ka).includes(quote))
      }
    }
    if(target[0]==='@'){
      let movie=(target).substring((target).indexOf("@")+1)
      if(locale=='en'){
        quotesList.value=[]
      const filteredMovies=moviesData.value.filter(x => (x.name.en).includes(movie))
      for (let i = 0; i < filteredMovies.length; i++) {
          for (let k = 0; k < filteredMovies[i].quotes.length; k++) {
              let quote=filteredMovies[i].quotes[k]
              if(quote){
                quotesList.value.push(quote)
              }
         }
      }
  }
     if(locale=='ka'){
      quotesList.value=[]
      const filteredMovies=moviesData.value.filter(x => (x.name.en).includes(movie))
      for (let i = 0; i < filteredMovies.length; i++) {
          for (let k = 0; k < filteredMovies[i].quotes.length; k++) {
              let quote=filteredMovies[i].quotes[k]
              if(quote){
                quotesList.value.push(quote)
              }
         }
      }
      }
    }
  }


   function handleShowComments(id){
    if(showComments.value==id){
    showComments.value=0
    return;
  }
  showComments.value=id
   }

   function quoteAuthor(user_id){
     return movieAuthors.value.find(x => x.id == user_id).name
   }
   function commentAuthor(user_id){
     return authors.value.find(x => x.id == user_id).name
   }


   function commentsQuantity(quote_id){
   return comments.value.filter(x => x.quote_id == quote_id).length
   }
   function likesQuantity(quote_id){
   return likes.value.filter(x => x.quote_id == quote_id).length
   }
   function likesColor(quote_id){
   return likes.value.filter(x => x.quote_id == quote_id).find(x => x.user_id == user.value.id) ? '#F3426C': '#fff'
   }
   function movieName(movie_id){
     return  moviesData.value.find(x => x.id == movie_id).name
   }
   function localeChange(locale, object){
    if(locale=='ka'){
      return object.ka
    }else{
      return object.en
    }
   }
 


    

return {
       user,
       dataIsFetched, 
       commentSubmit,
       quotesList, 
       feedDataIsFetched, 
       moviesData, 
       commentsData, 
       showComments,
       handleShowComments,
       commentSubmit,
       comments,
       handleLikes,
       likesData,
       likes,
       likesQuantity,
       likesColor,
       commentAuthor,
       commentsQuantity,
       quoteAuthor,
       movieName,
       localeChange,
       addPost,
       openAddPostModal,
       searchActivated,
       searchClicked,
       updateQuotesIntoArray,
       searchSubmit
       
    
       }
  }
  
}
</script>


<template>
<div class="main w-[100vw] h-[100vh] bg-[#181623] overflow-x-hidden overflow-y-scroll scrollbar">
<div class="fixed z-50">
  <basic-header></basic-header>
  </div>
  <div class="w-[100vw] h-[8rem]"></div>

  <main class="w-[100%] h-[93%]">
    <div class="fixed">
      <basic-navigation :user="user" :dataIsFetched="dataIsFetched" feed="#E31221" movies="#fff" profile="border-none"></basic-navigation>
    </div>
    <div class="w-[100%] h-[100%] min-w-[32rem]"></div>
    
    <loading-spinner bgColor="bg-none" v-if="!feedDataIsFetched" texts="hidden" location="pt-[35rem]"></loading-spinner>

    <div v-else class="bg-gray min-w-[36vw]">
      <div v-show="addPost"><addquote-form @update-quotes="updateQuotesIntoArray" @addpost-close="addPost=false"></addquote-form></div>
      <div class="mt-[3.2rem] ml-[0.3rem] flex items-center gap-[2.4rem]">
        <div @click="openAddPostModal" class="relative cursor-pointer overflow-hidden" :class="[!searchActivated ? 'w-[75%]' : 'w-[25%]']">
      <textarea disabled :placeholder="$t('newsFeed.new_quote')" class="post cursor-pointer rounded-[10px] max-h-[5.2rem] w-[100%] bg-[#24222F] pr-[2.5rem] pl-[5.6rem] py-[1rem] overflow-hidden"></textarea> 
        <pencil-icon class="absolute top-0 left-0 translate-x-1/2 translate-y-1/2 hover:cursor-pointer"></pencil-icon>
        </div>

      <div @click="searchClicked($i18n.locale, $event)" :class="[searchActivated ? 'w-[75%] border-b-[#6C757D] border-b border-b-solid' : 'w-[25%] cursor-pointer']">
        <div  class="flex items-center gap-[1.6rem] pb-[1rem]" :class="[searchActivated ? '' : 'cursor-pointer']">
       <search-icon></search-icon>
        <input @keydown.enter.prevent="searchSubmit($i18n.locale, $event)" :disabled="!searchActivated" type="text" :placeholder="!searchActivated ? $t('newsFeed.search_by') : 'Enter @ to search movies, Enter # to search quotes '" class="w-[100%] pr-[1rem]" :class="[searchActivated ? '' : 'cursor-pointer']"/>
        </div>
      </div>
      </div>
      <div v-for="quote in quotesList" :key="quote" class="w-[94rem] h-[auto] bg-[#11101A] p-[2.4rem] rounded-[12px] backdrop mt-[2.2rem]">
        <div class="flex items-center justify-start gap-[1.6rem]">
          <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem]"/>
          <p class="text-[2rem] text-[#fff]">{{ quoteAuthor(quote.user_id) }}</p>
        </div>
        <p class="mt-[1.6rem] mb-[2.8rem] text-[2rem] text-[#fff] font-normal">“{{ localeChange($i18n.locale, quote.quote) }}” - <span class="text-[#DDCCAA]">{{ localeChange($i18n.locale, movieName(quote.movie_id)) }}</span></p>
        <div class="border-b border-solid border-[#f0f0f04d] pb-[2.5rem]">
        <img src="/src/assets/InterstellarMovie.png" class="rounded-[10px]"/>
        <div class="flex items-center justify-start gap-[2.4rem] mt-[2.4rem]">
        <div @click="handleShowComments(quote.id)" class="flex items-center justify-center cursor-pointer gap-[1.2rem]"><span class="text-[#fff] text-[2rem]">{{ commentsQuantity(quote.id) }}</span><comments-icon></comments-icon></div>
        <div class="flex items-center justify-center gap-[1.2rem]"><span class="text-[#fff] text-[2rem]">{{ likesQuantity(quote.id) }}</span><likes-icon  @liked-status="handleLikes(quote.id)" :fill="likesColor(quote.id)" class="cursor-pointer"></likes-icon></div>
        </div>
        </div>
      <div>
        <div v-if="showComments==quote.id">
        <div v-for="comment in comments.filter(x => x.quote_id == quote.id)" :key="comment" class="flex gap-[2.4rem] pt-[2.4rem]">
         <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem]"/>
         <div class="border-b border-solid border-[#f0f0f04d] pb-[2.4rem] pr-[1.2rem] w-[100%]">
          <p class="text-[2rem] font-medium text-[#fff]">{{ commentAuthor(comment.user_id) }}</p>
          <p class="text-[2rem] font-normal text-[#fff]">{{ comment.body }}</p>
         </div>
        </div>
        </div>
        <div class="mt-[2.4rem] gap-[2.4rem] flex items-center">
          <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem]"/>
          <textarea @keydown.enter.prevent="commentSubmit(quote.id, $event)" :placeholder="$t('newsFeed.write_comment')" class="rounded-[10px] min-w-[91.5%] max-w-[91.5%] min-h-[5.2rem] max-h-[5.2rem] bg-[#24222F] px-[2.5rem] py-[1rem]"></textarea>
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
  grid-template-columns: 1.2fr auto 1fr;
}
.backdrop{
  backdrop-filter: blur(25px);
}
.scrollHide::-webkit-scrollbar {
  display: none;
}
.scrollHide {
  scrollbar-width: none; 
}
textarea::placeholder {
    font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
input::placeholder {
    font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
.post::placeholder {
    font-weight: 400;
    color: #fff;
    font-size: 2rem;
}
.post {
  resize: none;
  font-weight: 400;
    color: #fff;
    font-size: 2rem;
}
textarea {
  resize: none;
  font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
input {
 border:none;
 outline: none;
 background: none;
  font-weight: 400;
    color: #CED4DA;
    font-size: 2rem;
}
.scrollbar::-webkit-scrollbar {
  width: 1.5rem;
  background: none;
  border-radius: 0 0 0 0;
        }
.scrollbar:hover{
   cursor:auto;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #222030;
  border-radius: 0 0 0 0;
        }
</style>