<script>
import { Form, Field } from 'vee-validate';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BasicButton from "@/components/BasicButton.vue";
import AddmovieInput from "@/components/inputs/AddmovieInput.vue";
import CheckboxInput from "@/components/inputs/CheckBox.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import AddquoteCamera from "@/components/icons/AddquoteCamera.vue";
import AddquoteArrow from "@/components/icons/AddquoteArrow.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import CloseCheckbox from "@/components/icons/CloseCheckbox.vue";
import basicAxios from "@/config/axios/BasicAxios.js";
import BasicNavigation from "@/components/BasicNavigation.vue";
import { imageUpload } from "@/helpers/ImageUpload/index.js";
import axios from "@/config/axios/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useUserStore } from '@/stores/UserStore.js';




export default {
  name:'AddQuote',
  props:['id'],
  components:{Form, BasicButton, AddmovieInput, CloseIcon,CameraIcon, Field, CloseCheckbox,CheckboxInput, BasicNavigation, LoadingSpinner, AddquoteArrow, AddquoteCamera },
  setup(props, context){

   const router=useRouter();
   const login = useUserStore();


   const imageDisplay=ref('')
   const selectedFile=ref('')
   const currentId=ref('')
   const authUser=ref([])
   const moviesData=ref([])
   const movie=ref([])
   const dataIsFetched=ref(false)
   const selectModal=ref(false)
   const movieChoosen=ref(false)
   const movieName=ref('')
   const movieId=ref(null)

   onMounted(async ()=>{
  authUser.value=login.getUserData
  const resMovies = await axios.get(`movies/${authUser.value.id}`);
  moviesData.value=resMovies.data
  dataIsFetched.value=true

})


     function closePostModal(){
      context.emit('addpostClose')
      }

       function onSubmit(values){
      if(!imageDisplay.value || !movieChoosen.value){
        return;
      }
      const form=new FormData();
      form.append('id', movieId.value);
      form.append('user_id', authUser.value.id);
      form.append('thumbnail', selectedFile.value);
      form.append('quote_en', values.quote_en);
      form.append('quote_ka', values.quote_ka);
      basicAxios.post('quotes/create',form)
    .then((res)=>{
        context.emit('updateQuotes', res.data.attributes)
        context.emit('addpostClose')
        movieChoosen.value=false
        movieId.value=null
        imageDisplay.value=''
        selectedFile.value=''
    })
    .catch((err)=>{
      alert('Something went wrong!')
    })
  
    }

    function handleImageChange(ev){
    imageUpload(ev,selectedFile, imageDisplay);
  }

  function openSelectModal(){
    selectModal.value=!selectModal.value
  }

  function chooseMovie(ev){
    selectModal.value=true
    movieChoosen.value=true
    movieId.value=ev.target.closest('.option').getAttribute('value')
    movieName.value=moviesData.value.find(x => x.id == movieId.value).name

  }

    return {
      closePostModal,
      onSubmit,
      dataIsFetched,
      authUser,
      handleImageChange,
      imageDisplay,
      openSelectModal,
      selectModal,
      moviesData,
      chooseMovie,
      movieChoosen,
      movieName
    }
  }
  
}
</script>


<template>
<div v-if="dataIsFetched">
  <div @click="closePostModal" class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50"></div>
     <div class="absolute w-[45%] md:w-[100vw] md:min-h-[100vh] top-1/2 left-1/2 md:top-0 md:left-0 md:-translate-x-0 md:-translate-y-0 -translate-x-1/2 -translate-y-1/2 bg-[#11101A] rounded-[10px] z-50">
    <div class="flex items-center justify-center border-b border-b-solid border-b-[#f0f0f036] relative backdrop">
      <p class="text-[2.4rem] md:text-[2.2rem] font-medium text-[#fff] pt-[3rem] pb-[2.4rem]">{{ $t('newsFeed.write_new_quote') }}</p>
      <close-icon @click="closePostModal" class="absolute top-1/2 right-[3.6rem] cursor-pointer"/>
    </div>
   <Form @submit="onSubmit" class="w-[100%] p-[3rem] flex flex-col items-center justify-center gap-[2rem]" enctype="multipart/form-data">
      <div class="self-start mb-[1rem]">
      <div class="flex items-center self-start justify-start gap-[1.6rem]">
        <img src="/src/assets/TenenbaumsMovie.png" class="rounded-[100%] w-[6rem] h-[6rem]"/>
        <p class="text-[2rem] text-[#fff]">{{ authUser.name }}</p>
      </div>
      </div>
      
      <addmovie-input rules="required|eng_alphabet" as="textarea" inputName="quote_en" placeholder='"Quote in English"' label="Eng" classLabel="top-[2rem]"></addmovie-input>
      <addmovie-input rules="required|geo_alphabet" as="textarea" inputName="quote_ka" placeholder='"ციტატა ქართულ ენაზე"' label="ქარ" classLabel="top-[2rem]"></addmovie-input>
      
      <div class="w-[100%] h-[100%] relative py-[2.7rem] px-[1.8rem] border-[#6C757D] border border-solid rounded-[5px] bg-inherit">
        <div class="flex items-center gap-[1.2rem]">
          <camera-icon></camera-icon>
          <div class="text-[2rem] text-[#fff] font-normal flex items-center justify-start gap-[8px] md:z-30"><p>{{ $t('newsFeed.drag_and_drop') }} <span class="bg-[#9747ff36] rounded-[2px] p-[1rem]">{{ $t('newsFeed.choose_file') }}</span></p></div>
        </div>
        <img v-if="imageDisplay" :src="imageDisplay" class="h-[100%] max-w-[20%] md:max-w-[45%] rounded-[5px] absolute top-0 right-0" />
      <input @change="handleImageChange" type="file" class="z-50 w-[100%] h-[100%] cursor-pointer absolute top-0 left-0 opacity-0" />
      </div>
      <div @click="openSelectModal" class="w-[100%] h-[100%] relative py-[2.5rem] px-[2.4rem] rounded-[5px] bg-[#000] cursor-pointer">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-[1.2rem]">
          <addquote-camera></addquote-camera>
          <div class="text-[2.4rem] md:text-[1.8rem] text-[#fff] font-normal flex items-center gap-[2rem]"><p>{{ $t('newsFeed.choose_movie') }}</p><span v-show="movieChoosen" class="bg-[#9747ff36] rounded-[2px] p-[1rem] text-[2.4rem] md:text-[1.8rem]">{{$i18n.locale=='en'? movieName.en : movieName.ka}}</span></div>
          </div>
          <div>
          <addquote-arrow></addquote-arrow>
          </div>
          </div>
          <div v-show="selectModal" class="absolute top-[110%] left-0 bg-[#181623]  w-[100%] z-50 border-[#6C757D] border border-solid rounded-[5px] max-h-[18rem] overflow-y-scroll scrollbar">
           <div v-for="movie in moviesData" :key="movie.id" :value="movie.id" @click="chooseMovie" class="px-[10px] py-[6px] flex items-center justify-center cursor-pointer hover:bg-[#36334b] option"><p class="text-[2rem] text-[#fff]">{{ movie.name.en }}</p></div>
          </div>
      </div>

      <basic-button type="submit" class="text-[#fff] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[5px] mt-[2rem] mb-[1.8rem]" width="w-[100%]">{{ $t('newsFeed.post') }}</basic-button>
     </Form>
     </div>
     </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 1rem;
  background: #f4f3f3e3;
  border-radius: 0 5px 5px 0;
  border-right: 0.1px solid #cbc9c9e3;
  border-right: 0.1px solid #cbc9c9e3;
        }
.scrollbar:hover{
   cursor:auto;
}

.scrollbar::-webkit-scrollbar-thumb {
  width: 0.75rem;
  background: #460b92b3;
  border-radius: 0 5px 5px 0;
        }
</style>