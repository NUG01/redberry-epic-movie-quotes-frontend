<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import BasicButton from "@/components/BasicButton.vue";
import AddmovieInput from "@/components/inputs/AddmovieInput.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import SuccessIcon from "@/components/icons/SuccessIcon.vue";
import DeleteTrash from "@/components/icons/DeleteTrash.vue";
import EditPencil from "@/components/icons/EditPencil.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import basicAxios from "@/config/axios/BasicAxios.js";
import BasicNavigation from "@/components/BasicNavigation.vue";
import { imageUpload } from "@/helpers/ImageUpload/index.js";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useUserStore } from '@/stores/UserStore.js';
import CommentsIcon from "@/components/icons/CommentsIcon.vue";
import LikesIcon from "@/components/icons/LikesIcon.vue";
import { Form, Field } from "vee-validate";





export default {
  name:'ViewQuote',
  props:['id'],
  components:{LoadingSpinner,Form,Field, BasicNavigation, CloseIcon, DeleteTrash, EditPencil, AddmovieInput, BasicButton, CameraIcon, CommentsIcon, LikesIcon, SuccessIcon},
  setup(props){

   const router=useRouter();
   const login = useUserStore();

   const authUser=ref([])
   const dataIsFetched=ref(false)
   const quoteUpdated=ref(false)
   const showComments=ref(false)
   const currentId=props.id
   const quoteData=ref([])
   const commentsData=ref([])
   const imageDisplay=ref('')
   const selectedFile=ref('')
   const usersData=ref([])
   const comments=ref([])
   const userEligibilityForChange=ref(null)
   const likes=ref([])
   const likesData=ref([])
   const userImage=ref([])
   const authorImage=ref([])
   const imageUrl=import.meta.env.VITE_API_BASE_URL_IMAGE
    
    
   onMounted(async()=>{
    const res= await axios.get(`quotes/${currentId}/show`);
    authUser.value=login.getUserData
    userImage.value=imageUrl+authUser.value.thumbnail
    quoteData.value=res.data.quote
    authorImage.value=imageUrl+quoteData.value.user.thumbnail
    imageDisplay.value=imageUrl+quoteData.value.thumbnail
    likesData.value=res.data.quote.likes
    likes.value=likesData.value
    commentsData.value=res.data.quote.comments
    comments.value=commentsData.value
    userEligibilityForChange.value= quoteData.value.user_id == authUser.value.id ? true : false;
    dataIsFetched.value=true
   })


function deleteQuote(id){
  if(userEligibilityForChange==null){
      return
  }
    axios.delete(`quotes/${id}`)
    .then((res)=>{
      router.go(-1)
    })
    .catch((err)=>{
      alert('Something went wrong!')
    })
  }

  function onSubmit(values){
    if(!imageDisplay.value){
      return;
    }
    const form=new FormData();
      form.append('quote_id', currentId);
      form.append('thumbnail', selectedFile.value);
      form.append('quote_en', values.quote_en);
      form.append('quote_ka', values.quote_ka);
      form.append("_method", "PATCH");
      basicAxios.post('quotes/'+props.id,form)
      .then((res)=>{
        quoteUpdated.value=true
     })
      .catch((err)=>{
        alert('Something went wrong!')
     })

  }

  watch(quoteUpdated, () => {
    setTimeout(function(){
    quoteUpdated.value=false
    }, 3600);
});

function commentsHandle(){
  showComments.value=!showComments.value
}

  function commentSubmit(values){
    let commentValue=values.comment
      axios.post('comments',{
        body: commentValue,
        quote_id: currentId,
        user_id: authUser.value.id
     }).then(()=>{
        comments.value.push({
          body:commentValue,
          user_id:authUser.value.id,
          user:{
            id: authUser.value.id,
            name: authUser.value.name,
            thumbnail: authUser.value.thumbnail
          }
        });
        document.getElementById('comment').value=''
     }).catch(()=>{
      alert('Something went wrong')
     })
    
  }

  function handleLikes(id){
    axios.post('likes',{
      quote_id: id,
      user_id: authUser.value.id
    })
    .then((res)=>{
      console.log(res)
      likes.value=res.data.attributes
    })
    .catch(()=>{
      alert('Something went wrong')

    })
  }

  
  function handleImageChange(ev){
    imageUpload(ev,selectedFile, imageDisplay);
  }
  function commentAuthorImage(image){
    return imageUrl+image
  }
  const likesQuantity=computed(()=>{
     return likes.value.length
    })
  const likeColor=computed(()=>{
     return likes.value.find(x => x.user_id == authUser.value.id) ? '#F3426C': '#fff'
    })


     function submitComment(){
       document.getElementById('submitComment').click();
   }


    return {
      dataIsFetched,
      authUser,
      router,
      deleteQuote,
      currentId,
      onSubmit, 
      quoteData,
      handleImageChange,
      imageDisplay,
      commentSubmit,
      quoteUpdated,
      commentsData,
      comments,
      usersData,
      userEligibilityForChange,
      showComments,
      commentsHandle,
      handleLikes,
      likes,
      likesQuantity,
      likeColor,
      submitComment,
      commentAuthorImage,
      userImage,
      authorImage
      
    }
  }
  
}
</script>



<template>
<loading-spinner texts="hidden" location="pt-[35rem] bg-[#181623]" v-if="!dataIsFetched"></loading-spinner>
  <div v-else class="main w-[100vw] min-h-[100vh] overflow-y-scroll overflow-x-hidden">
    <div @click="router.go(-1)" class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50"></div>
     <div class="bg-[none] w-[100vw] rounded-[10px] z-50 flex items-center justify-center">
     <div class="w-[45%] md:w-[100%] md:min-h-[100vh] bg-[#11101A]">
        <div class="flex items-center justify-center border-b border-b-solid border-b-[#f0f0f036] relative backdrop">
      <p class="text-[2.4rem] font-medium text-[#fff] pt-[3rem] pb-[2.4rem]">{{ $t('newsFeed.view_quote_exact') }}</p>
      <close-icon  @click="router.go(-1)" class="absolute top-1/2 right-[3.6rem] cursor-pointer"/>
      <button v-show="userEligibilityForChange"  @click="deleteQuote(currentId)" class="absolute top-[45%] left-[3.6rem] md:top-1/2 md:-translate-y-[25%] flex items-center gap-[1rem] cursor-pointer">
        <delete-trash></delete-trash>
        <p class="text-[#CED4DA] text-[1.6rem] md:hidden">{{ $t('newsFeed.delete') }}</p>
      </button>
    </div>
       <Form @submit="onSubmit" class="w-[100%] p-[3rem] flex flex-col items-center justify-center gap-[2rem]" enctype="multipart/form-data">
      <div class="flex items-center self-start justify-start gap-[1.6rem]">
      <div :style="'background-image:url('+authorImage+')'" class="rounded-[100%] w-[6rem] h-[6rem] bg-cover bg-no-repeat bg-center"></div>
        <p class="text-[2rem] text-[#fff]">{{ authUser.name }}</p>
      </div>
      

      <addmovie-input :disabled="!userEligibilityForChange" :value="quoteData.quote.en" rules="required|eng_alphabet" as="textarea" inputName="quote_en" label="Eng" classLabel="top-[2rem]"></addmovie-input>
      <addmovie-input :disabled="!userEligibilityForChange" :value="quoteData.quote.ka" rules="required|geo_alphabet" as="textarea" inputName="quote_ka" label="ქარ" classLabel="top-[2rem]"></addmovie-input>
      <div class="w-[100%] h-[45rem] md:h-[27rem] relative py-[2.7rem] px-[1.8rem] border-[#6C757D] border border-solid rounded-[5px] bg-inherit relative">
        <div v-if="userEligibilityForChange" class="bg-[#181623cc] flex flex-col items-center justify-center gap-[1.2rem] px-[2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-[10px]">
          <camera-icon class="mt-[1.6rem]"></camera-icon>
          <p class="mb-[1rem] text-[1.6rem] text-[#fff] font-normal md:text-[1.4rem]">{{ $t('newsFeed.change_photo') }}</p>
        </div>
      <div v-if="imageDisplay" :style="'background-image:url('+imageDisplay+')'" class="h-[100%] w-[100%] rounded-[5px] absolute top-0 right-0 bg-cover bg-no-repeat bg-center"></div>
      <input v-if="userEligibilityForChange" @change="handleImageChange" type="file" class="z-50 w-[100%] h-[100%] cursor-pointer absolute top-0 left-0 opacity-0" />
      </div>
      <div class="w-[100%] border-b border-solid border-[#f0f0f04d] pb-[2.5rem]">
      <div class="flex items-center justify-start gap-[2.4rem] mt-[0.5rem] self-start ">
        <div @click="commentsHandle" class="flex items-center justify-center cursor-pointer gap-[1.2rem]"><span class="text-[#fff] text-[2rem]">{{ comments.length }}</span><comments-icon></comments-icon></div>
        <div class="flex items-center justify-center gap-[1.2rem]"><span class="text-[#fff] text-[2rem]">{{ likesQuantity }}</span><likes-icon @liked-status="handleLikes(currentId)" :fill="likeColor" class="cursor-pointer"></likes-icon></div>
        </div>
      </div>
        <div v-if="showComments" class="self-start w-[100%] max-h-[50rem] overflow-y-scroll scrollbarHide">
        <div class="flex gap-[2.4rem] pt-[1rem]" v-for="comment in comments" :key="comment">
      <div :style="'background-image:url('+commentAuthorImage(comment.user.thumbnail)+')'" class="rounded-[100%] w-[5.2rem] h-[5.2rem] bg-cover bg-no-repeat bg-center"></div>
         <div class="border-b border-solid border-[#f0f0f04d] pb-[2.4rem] pr-[1.2rem] w-[100%] flex flex-col">
          <p class="text-[2rem] font-medium text-[#fff]">{{ comment.user.name }}</p>
          <div><p class="text-[2rem] font-normal text-[#fff] wordwrap">{{ comment.body }}</p></div>
         </div>
        </div>
      </div>
     <Form @submit="commentSubmit" v-if="showComments" class="w-[100%] mt-[1rem] md:self-start">
        <div class="gap-[2.4rem] flex items-center">
      <div :style="'background-image:url('+userImage+')'" class="rounded-[100%] w-[5.2rem] h-[5.2rem] bg-cover bg-no-repeat bg-center"></div>
              <Field rules="required" id="comment" name="comment" as="textarea" @keydown.enter.prevent="submitComment()" :placeholder="$t('newsFeed.write_comment')" class="rounded-[10px] min-w-[100%] max-w-[100%] xxl:min-w-[100%] xxl:max-w-[100%] xl:min-w-[83%] xl:max-w-[83%] llg:min-w-[80%] llg:max-w-[80%] lg:min-w-[80%] lg:max-w-[80%] md:min-w-[90%] md:max-w-[90%] lsm:min-w-[81%] lsm:max-w-[81%] sm:min-w-[70%] sm:max-w-[70%] min-h-[5.2rem] max-h-[5.2rem] bg-[#24222F] px-[2.5rem] py-[1rem]"></Field>
          <button type="submit" id="submitComment" class="w-0 h-0 opacity-0 absolute -top-full -left-full"></button>
        </div>
        </Form>

      <basic-button :disabled="!userEligibilityForChange" type="submit" class="text-[#fff] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[5px] mt-[1.6rem] mb-[1.8rem]" width="w-[100%]">{{ $t('newsFeed.save_changes') }}</basic-button>
     </Form>

     </div>
</div>
    <div class="fixed">
      <basic-navigation :user="authUser" :dataIsFetched="dataIsFetched" feed="#fff" movies="#E31221" profile="border-[2px] border-solid border-[#fff]"></basic-navigation>
    </div>
    <div v-if="quoteUpdated" class="fixed z-50 right-0 top-0 -translate-x-[30%] md:right-1/2 md:translate-x-[50%] translate-y-1/2 md:w-[70%] md:px-[2rem] md:py-[1.2rem] px-[2.4rem] py-[1.5rem] bg-[#BADBCC] rounded-[4px]">
      <div class="flex items-center justify-center gap-[1rem]">
        <success-icon></success-icon>
        <p class="text-[#11101A] text-[1.8rem] font-medium">Quote updated successfully!</p>
      </div>
    </div>
    <div></div>
  </div>
  
</template>


<style scoped>
.main{
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);
  display: grid;
  grid-template-columns: 1.2fr 4fr;
}
.backdrop{
  backdrop-filter: blur(25px);
}
.scrollbarHide::-webkit-scrollbar {
  display: none;
}
.scrollbarHide {
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
textarea {
  resize: none;
  overflow: hidden;
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
.wordwrap { 
  word-break : break-all;
}
</style>