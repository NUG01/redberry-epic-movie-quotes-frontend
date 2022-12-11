<script>
import { Form, Field } from 'vee-validate';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BasicButton from "@/components/BasicButton.vue";
import AddmovieInput from "@/components/inputs/AddmovieInput.vue";
import CheckboxInput from "@/components/inputs/CheckBox.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
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
  components:{Form, BasicButton, AddmovieInput, CloseIcon,CameraIcon, Field, CloseCheckbox,CheckboxInput, BasicNavigation, LoadingSpinner },
  setup(props){

   const router=useRouter();
   const login = useUserStore();


   const imageDisplay=ref('')
   const selectedFile=ref('')
   const currentId=ref('')
   const authUser=ref([])
   const moviesData=ref([])
   const movie=ref([])
   const genres=ref([])
   const dataIsFetched=ref(false)

  currentId.value=props.id

onMounted(async ()=>{
  authUser.value=login.getUserData
  const res = await axios.get(`movies/${props.id}/details`);
  movie.value=res.data.movie
  genres.value=res.data.genres
  dataIsFetched.value=true

})

   function handleImageChange(ev){
    imageUpload(ev,selectedFile, imageDisplay);
  }

     function onSubmit(values){
      if(!imageDisplay.value){
        return;
      }
      const form=new FormData();
      form.append('id', currentId.value);
      form.append('user_id', login.getUserData.id);
      form.append('thumbnail', selectedFile.value);
      form.append('quote_en', values.quote_en);
      form.append('quote_ka', values.quote_ka);
      basicAxios.post('quotes',form)
    .then((res)=>{
      router.push({ name: 'movie-description', params: { id: currentId.value } })
    })
    .catch((err)=>{
      alert('Something went wrong!')
    })
  
    }
  

    return {
    imageDisplay, 
    handleImageChange, 
    router, 
    onSubmit,
    authUser,
    movie,
    dataIsFetched,
    genres
    }
  }
  
}
</script>



<template>
<loading-spinner texts="hidden" location="pt-[35rem] bg-[#181623]" v-if="!dataIsFetched"></loading-spinner>
  <div v-else class="main w-[100vw] min-h-[100vh] md:overflow-y-scroll">
    <div @click="router.go(-1)" class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50"></div>
     <div class="absolute w-[52%] md:w-[100vw] md:top-0 md:left-0 md:translate-x-0 md:translate-y-0 md:min-h-[100vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11101A] rounded-[10px] z-50">
    <div class="flex items-center justify-center border-b border-b-solid border-b-[#f0f0f036] relative backdrop">
      <p class="text-[2.4rem] md:txt-[2rem] font-medium text-[#fff] pt-[3rem] pb-[2.4rem]">{{ $t('newsFeed.add_quote_exact') }}</p>
      <close-icon  @click="router.go(-1)" class="absolute top-1/2 right-[3.6rem] cursor-pointer"/>
    </div>
       <Form @submit="onSubmit" class="w-[100%] p-[3rem] flex flex-col items-center justify-center gap-[2rem]" enctype="multipart/form-data">
      <div class="self-start mb-[0.5rem]">
      <div class="flex items-center self-start justify-start gap-[1.6rem] mb-[3rem]">
        <img src="/src/assets/TenenbaumsMovie.png" class="rounded-[100%] w-[6rem] h-[6rem]"/>
        <p class="text-[2rem] text-[#fff]">{{ authUser.name }}</p>
      </div>
       <div class="flex items-center gap-[3rem] md:gap-[1.2rem]">
          <img src="/src/assets/TenenbaumsMovie.png" class="rounded-[12px] w-[30%] inline-block"/>
          <div class="flex flex-col justify-center gap-[2.4rem] md:gap-0">
            <p class="text-[2.4rem] md:text-[1.6rem] md:order-1 text-[#DDCCAA] font-medium">{{ $i18n.locale=='en'? movie.name.en : movie.name.ka }}</p>
              <div class="flex items-center gap-[8px] md:gap-[5px] md:order-3">
              <p v-for="genre in genres" :key="genre.id" class="font-semibold text-[#fff] text-[1.8rem] md:text-[1.4rem] px-[10px] py-[2px] md:px-[7px] md:py-[2px] bg-[#6C757D] inline-block rounded-[4px]">{{ genre.name }}</p>
            </div>
            <div class="flex items-center gap-[1rem] md:order-2 md:mb-[0.7rem]">
              <p class="text-[#CED4DA] text-[1.8rem] md:text-[1.6rem] font-bold">{{ $t('newsFeed.director') }}:</p>
              <p class="text-[#fff] text-[1.8rem] md:text-[1.6rem] font-medium">{{ $i18n.locale=='en'? movie.director.en : movie.director.ka }}</p>
            </div>
          </div>
       </div>
      </div>
      
      <addmovie-input rules="required|eng_alphabet" as="textarea" inputName="quote_en" placeholder='"Quote in English"' label="Eng" classLabel="top-[2rem]"></addmovie-input>
      <addmovie-input rules="required|geo_alphabet" as="textarea" inputName="quote_ka" placeholder='"ციტატა ქართულ ენაზე"' label="ქარ" classLabel="top-[2rem]"></addmovie-input>
      
      <div class="w-[100%] h-[100%] relative py-[2.7rem] px-[1.8rem] border-[#6C757D] border border-solid rounded-[5px] bg-inherit mt-[2rem]">
        <div class="flex items-center gap-[1.2rem]">
          <camera-icon></camera-icon>
          <div class="md:hidden text-[2rem] text-[#fff] font-normal flex items-center justify-start gap-[8px]"><p>{{ $t('newsFeed.drag_and_drop') }}
             <span class="bg-[#9747ff36] rounded-[2px] p-[1rem]">{{ $t('newsFeed.choose_file') }}</span>
             </p></div>
             <div class="hidden md:block text-[#fff] text-[1.6rem] flex items-center justify-between">
             <span class="md:z-40">{{ $t('newsFeed.upload_image') }}</span> 
          <span class="bg-[#9747ff36] rounded-[2px] p-[1rem] ml-[3rem]">{{ $t('newsFeed.choose_file') }}</span>
             </div>
        </div>
        <img v-if="imageDisplay" :src="imageDisplay" class="h-[100%] max-w-[20%] md:max-w-[45%] md:z-30 rounded-[5px] absolute top-0 right-0" />
      <input @change="handleImageChange" type="file" class="z-50 w-[100%] h-[100%] cursor-pointer absolute top-0 left-0 opacity-0" />
      </div>

      <basic-button type="submit" class="text-[#fff] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[5px] mt-[3.2rem] mb-[1.8rem]" width="w-[100%]">{{ $t('newsFeed.add_quote') }}</basic-button>
     </Form>
     </div>
   <div>
      <basic-navigation :user="authUser" :dataIsFetched="dataIsFetched" feed="#fff" movies="#E31221" profile="border-[2px] border-solid border-[#fff]"></basic-navigation>
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
</style>