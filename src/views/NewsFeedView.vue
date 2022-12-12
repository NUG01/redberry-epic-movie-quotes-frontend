<script>
import { useUserStore } from '@/stores/UserStore.js';
import { onMounted, ref } from "vue";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";
import BasicHeader from "@/components/BasicHeader.vue";
import BasicNavigation from "@/components/BasicNavigation.vue";
import CommentsIcon from "@/components/icons/CommentsIcon.vue";
import LikesIcon from "@/components/icons/LikesIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NewsfeedSpinner from "@/components/NewsfeedSpinner.vue";
import AddquoteForm from "@/components/forms/AddquoteForm.vue";
import { useAuthStore } from "@/stores/AuthStore.js";


export default {
  name:'NewsFeed',
  emits:['likedStatus', 'addpostClose', 'updateQuotes', 'headerSearch'],
  components:{BasicHeader, BasicNavigation, CommentsIcon, LikesIcon, PencilIcon, SearchIcon, LoadingSpinner, AddquoteForm, Form, Field, NewsfeedSpinner},
  
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
    const likesData=ref([])
    const showComments=ref(false)
    const comments=ref([])
    const likes=ref([])
    const addPost=ref(false)
    const searchActivated=ref(false)
    const spinner=ref(false)
    const quotesList=ref([])
    const authors=ref([])
    const movieAuthors=ref([])
    const page=ref(1)
    const noMorePosts=ref(false)

    function paginationData(data){
      for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].likes.length; k++) {
       likesData.value.push(data[i].likes[k])
       likes.value.push(data[i].likes[k])
     }
     }
    for (let i = 0; i < data.length; i++) {
      for (let k = 0; k < data[i].likes.comments; k++) {
       commentsData.value.push(data[i].comments[k])
       comments.value.push(data[i].comments[k])
     }
     }
    for (let i = 0; i < data.length; i++) {
       quoteData.value.push(data[i])
       quotesList.value.push(data[i])
     }
    }

    
       const observeEl=new IntersectionObserver(async function(entries) {
        const ent=entries[0]
        if(!ent.isIntersecting) return;
        spinner.value=true
        page.value++
        const res= await axios.get('quotes?page='+page.value);
        spinner.value=false
        paginationData(res.data.data)
        observeEl.unobserve(ent.target)
        if(res.data.data.length!=0) observeEl.observe(document.querySelector('.last:last-child'));
        if(res.data.data.length==0) noMorePosts.value=true
  
      }, 
      {
        root: null,
        threshold:1,
        rootMargin:"0px",
      }
      );


    onMounted(async ()=>{
      const res= await axios.get('quotes?page='+page.value);
      paginationData(res.data.data)
      feedDataIsFetched.value=true
      if(res.data.data.length==0) noMorePosts.value=true
   })
     setTimeout(() => {
       observeEl.observe(document.querySelector('.last:last-child'))
     }, "1800")


    user.value =login.getUserData;
    if(user.value!=null){
     dataIsFetched.value=true
    }


    function submitComment(quote, event){
      if(event.target.value===''){
        return;
      }
    let commentValue=event.target.value
      axios.post('comments',{
        body: commentValue,
        quote_id: quote.id,
        user_id: user.value.id
     }).then((res)=>{
        quoteData.value.find(x => x.id ==quote.id).comments.push({
          body:commentValue,
          user_id:user.value.id,
          quote_id: quote.id,
          user:{
            name:user.value.name,
            thumbnail: user.value.thumbnail
          },

        });
         document.getElementById('comment'+quote.id).value=''
         document.getElementById('comment'+quote.id).blur()
         showComments.value=quote.id
     }).catch(()=>{
      alert('Something went wrong')
     })
    
  }

  function handleLikes(quote){
    axios.post('likes',{
      quote_id: quote.id,
      user_id: user.value.id
    })
    .then((res)=>{
      if(res.data.message=='Unliked!'){
        quote.likes = quote.likes.filter(function( obj ) {
        return obj.user_id != user.value.id ;
     });
   }
      if(res.data.message=='Liked!'){
        quote.likes.push({
          quote_id: quote.id,
          user_id: user.value.id
        })
      }
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
    quoteData.value.unshift(data)
    quotesList.value.unshift(data)
  }

  function searchSubmit(payload){
    const locale=payload.locale
    let target=payload.event.target.value
    quotesList.value=quoteData.value
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

   function commentsQuantity(quote){
   return quote.comments.length
   }
   function likesQuantity(quote){
   return quote.likes.length
   }
   function likesColor(quote){
   return quote.likes.filter(x => x.quote_id == quote.id).find(x => x.user_id == user.value.id) ? '#F3426C': '#fff'
   }
   function movieName(quote){
     return  quote.movie.name
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
       quotesList, 
       feedDataIsFetched, 
       moviesData, 
       commentsData, 
       showComments,
       handleShowComments,
       comments,
       handleLikes,
       likesData,
       likes,
       likesQuantity,
       likesColor,
       commentsQuantity,
       movieName,
       localeChange,
       addPost,
       openAddPostModal,
       searchActivated,
       searchClicked,
       updateQuotesIntoArray,
       searchSubmit,
       submitComment,
       spinner,
       noMorePosts,
       
    
       }
  }
  
}
</script>


<template>
<div class="main w-[100vw] h-[100vh] bg-[#181623] overflow-x-hidden overflow-y-scroll scrollbar">
  <newsfeed-spinner v-if="spinner" class="fixed z-40 scale-75"></newsfeed-spinner>
<div class="fixed z-50">
  <basic-header @header-search="searchSubmit" search="search"></basic-header>
  </div>
  <div class="w-[100vw] h-[8rem] md:h-[7rem]"></div>

  <main class="w-[100%] h-[93%]">
    <div class="fixed md:hidden">
      <basic-navigation :user="user" :dataIsFetched="dataIsFetched" feed="#E31221" movies="#fff" profile="border-none"></basic-navigation>
    </div>
    <div class="w-[100%] h-[100%] min-w-[32rem] md:hidden"></div>
    
    <loading-spinner bgColor="bg-none" v-if="!feedDataIsFetched" texts="hidden" location="pt-[35rem]"></loading-spinner>

    <div v-else class="bg-gray min-w-[36vw] pb-[7rem]">
      <div v-show="addPost"><addquote-form @update-quotes="updateQuotesIntoArray" @addpost-close="addPost=false"></addquote-form></div>
      <div class="mt-[3.2rem] md:mt-[1.6rem] ml-[0.3rem] flex items-center gap-[2.4rem]">
        <div @click="openAddPostModal" class="relative cursor-pointer overflow-hidden md:w-[100%] md:flex md:items-center md:justify-center" :class="[!searchActivated ? 'w-[75%]' : 'w-[25%]']">
      <textarea disabled :placeholder="$t('newsFeed.new_quote')" class="post cursor-pointer rounded-[10px] max-h-[5.2rem] w-[100%] bg-[#24222F] md:bg-inherit md:w-[85%] pr-[2.5rem] pl-[5.6rem] md:pl-[3.6rem] py-[1rem] overflow-hidden"></textarea> 
        <pencil-icon class="absolute top-0 left-0 translate-x-1/2 translate-y-1/2 md:translate-x-full hover:cursor-pointer"></pencil-icon>
        </div>

      <div @click="searchClicked($i18n.locale, $event)" :class="[searchActivated ? 'w-[75%] border-b-[#6C757D] border-b border-b-solid' : 'w-[25%] cursor-pointer']" class="md:hidden">
        <div  class="flex items-center gap-[1.6rem] pb-[1rem]" :class="[searchActivated ? '' : 'cursor-pointer']">
       <search-icon></search-icon>
        <input @keydown.enter.prevent="searchSubmit({locale:$i18n.locale, event:$event})" :disabled="!searchActivated" type="text" :placeholder="!searchActivated ? $t('newsFeed.search_by') : 'Enter @ to search movies, Enter # to search quotes '" class="w-[100%] pr-[1rem]" :class="[searchActivated ? '' : 'cursor-pointer']"/>
        </div>
      </div>
      </div>
      <div v-for="quote in quotesList" :key="quote" :id="quote.id" class="w-[94rem] h-[auto] md:w-[100vw] lg:w-[61rem] llg:w-[72rem] xl:w-[87rem] xxl:w-[94rem] bg-[#11101A] p-[2.4rem] rounded-[12px] backdrop mt-[2.2rem] last">
        <div class="flex items-center justify-start gap-[1.6rem]">
          <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem] md:w-[4rem] md:h-[4rem]"/>
          <p class="text-[2rem] md:text-[1.8rem] text-[#fff]">{{ quote.user.name }}</p>
        </div>
        <p class="mt-[1.6rem] mb-[2.8rem] text-[2rem] md:text-[1.6rem] text-[#fff] font-normal">“{{ localeChange($i18n.locale, quote.quote) }}” - <span class="text-[#DDCCAA]">{{ localeChange($i18n.locale, movieName(quote)) }}</span></p>
        <div class="border-b border-solid border-[#f0f0f04d] pb-[2.5rem]">
        <img src="/src/assets/InterstellarMovie.png" class="rounded-[10px]"/>
        <div class="flex items-center justify-start gap-[2.4rem] mt-[2.4rem]">
        <div @click="handleShowComments(quote.id)" class="flex items-center justify-center cursor-pointer gap-[1.2rem]"><span class="text-[#fff] text-[2rem]">{{ commentsQuantity(quote) }}</span><comments-icon></comments-icon></div>
        <div class="flex items-center justify-center gap-[1.2rem]"><span class="text-[#fff] text-[2rem]">{{ likesQuantity(quote) }}</span><likes-icon  @liked-status="handleLikes(quote)" :fill="likesColor(quote)" class="cursor-pointer"></likes-icon></div>
        </div>
        </div>
      <div>
        <div v-if="showComments==quote.id" class="max-h-[50rem] overflow-y-scroll scrollbarHide">
        <div v-for="comment in quote.comments" :key="comment" class="flex gap-[2.4rem] pt-[2.4rem]">
         <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem]"/>
         <div class="border-b border-solid border-[#f0f0f04d] pb-[2.4rem] pr-[1.2rem] w-[100%]">
          <p class="text-[2rem] font-medium text-[#fff]">{{ comment.user.name }}</p>
          <p class="text-[2rem] font-normal text-[#fff]">{{ comment.body }}</p>
         </div>
        </div>
        </div>
        <div class="mt-[2.4rem] gap-[2.4rem] flex items-center">
          <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[5.2rem] h-[5.2rem] md:w-[4rem] md:h-[4rem]"/>
          <textarea :id="'comment'+quote.id" :name="'comment'+quote.id" @keydown.enter.prevent="submitComment(quote, $event)" :placeholder="$t('newsFeed.write_comment')" class="rounded-[10px] min-w-[89%] max-w-[89%] min-h-[5.2rem] max-h-[5.2rem] md:min-w-[81%] md:max-w-[81%] md:min-h-[4rem] md:max-h-[4rem] bg-[#24222F] px-[2.5rem] py-[1rem] md:px-[1.6rem] md:py-[0.5rem]"></textarea>
        </div>
      </div>
    </div>
    <p v-if="noMorePosts" class="relative text-[#CED4DA] text-[1.6rem] font-medium translate-y-full flex items-center justify-center">No more posts to load</p>
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
@media (max-width: 920px) {
  main{
    display: grid;
    grid-template-columns: 1fr;
  }
  .scrollbar::-webkit-scrollbar{
display: none;
  }
  .scrollbar:hover{
    scrollbar-width: none;
  }
  .scrollbar::-webkit-scrollbar-thumb {
    display: none;

  }
  textarea::placeholder, textarea {
    font-size:1.6rem;
  }
  
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
.scrollbarHide::-webkit-scrollbar {
  width: 0; 
 display: none;
}
  .scrollbarHide{
          scrollbar-width: none;

        }
.scrollbarHide::-webkit-scrollbar-thumb {
  border-radius: 0 0 0 0;
        }
</style>