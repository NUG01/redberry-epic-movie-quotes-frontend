<script>
import { Form, Field } from 'vee-validate';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BasicButton from "@/components/BasicButton.vue";
import AddmovieInput from "@/components/inputs/AddmovieInput.vue";
import CheckboxInput from "@/components/inputs/CheckBox.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import CloseCheckbox from "@/components/icons/CloseCheckbox.vue";
import basicAxios from "@/config/axios/BasicAxios.js";
import BasicNavigation from "@/components/BasicNavigation.vue";
import DeleteTrash from "@/components/icons/DeleteTrash.vue";
import axios from "@/config/axios/index.js";
import { imageUpload } from "@/helpers/ImageUpload/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useUserStore } from '@/stores/UserStore.js';



export default {
  name:'EditQuote',
  emits:['emit-close'],
  props:['id'],
  components:{Form, BasicButton, AddmovieInput, CloseIcon,CameraIcon, Field, CloseCheckbox,CheckboxInput, BasicNavigation, DeleteTrash, LoadingSpinner },
  
   setup(props){
   const login = useUserStore();
   const router=useRouter();


   const imageDisplay=ref('')
   const selectedFile=ref('')
   const currentId=props.id
   const authUser=ref({})
   const dataIsFetched=ref(false)
   const quoteData=ref([])
   const authorImage=ref([])
   const imageUrl=import.meta.env.VITE_API_BASE_URL_IMAGE



onMounted(async ()=>{
  const resQuote=await axios.get(`quotes/${currentId}/details`);
  authUser.value=login.getUserData
  quoteData.value=resQuote.data
  authorImage.value=imageUrl+quoteData.value.quote.user.thumbnail
  imageDisplay.value=imageUrl+quoteData.value.quote.thumbnail
  dataIsFetched.value=true
})


  function handleImageChange(ev){
    imageUpload(ev,selectedFile, imageDisplay);
  }


  function onSubmit(values){
    const form=new FormData();
    form.append('quote_id', currentId);
    form.append('thumbnail', selectedFile.value);
    form.append('quote_en', values.quote_en);
    form.append('quote_ka', values.quote_ka);
    form.append("_method", "PATCH");
    basicAxios.post('quotes/'+currentId,form)
  .then((res)=>{
    router.go(-1)
  })
  .catch((err)=>{
    alert('Something went wrong!')
  })
  }

  function deleteQuote(){
      axios.delete(`quotes/${currentId}`)
      .then((res)=>{
        router.go(-1)
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
    quoteData,
    deleteQuote,
    authUser,
    dataIsFetched,
    authorImage
    }
  }
  
}
</script>




<template>
<div>
<loading-spinner texts="hidden" location="pt-[35rem] bg-[#181623]" v-if="!dataIsFetched"></loading-spinner>
  <div v-else class="main w-[100vw] min-h-[100vh] md:overflow-y-scroll">
    <div @click="router.go(-1)" class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50"></div>
     <div class="absolute w-[45%] md:w-[100%] md:top-0 md:left-0 md:translate-x-0 md:translate-y-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11101A] rounded-[10px] z-50">
    <div class="flex items-center justify-center border-b border-b-solid border-b-[#f0f0f036] relative backdrop">
      <p class="text-[2.4rem] md:text-[2rem] font-medium text-[#fff] pt-[3rem] pb-[2.4rem]">{{ $t('newsFeed.edit_quote') }}</p>
      <close-icon  @click="router.go(-1)" class="absolute top-1/2 right-[3.6rem] cursor-pointer"/>
      <div @click="deleteQuote" class="absolute top-[45%] md:top-1/2 md:-translate-y-[25%] left-[3.6rem] cursor-pointer flex items-center gap-[1rem]">
        <delete-trash></delete-trash>
        <p class="text-[#CED4DA] text-[1.6rem] md:hidden">{{ $t('newsFeed.delete') }}</p>
      </div>
    </div>
       <Form @submit="onSubmit" class="w-[100%] p-[3rem] flex flex-col items-center justify-center gap-[2rem]" enctype="multipart/form-data">
      <div class="flex items-center self-start justify-start gap-[1.6rem]">
      <div :style="'background-image:url('+authorImage+')'" class="rounded-[100%] w-[6rem] h-[6rem] bg-cover bg-no-repeat bg-center"></div>
        <p class="text-[2rem] text-[#fff]">{{ quoteData.quote.user.name }}</p>
      </div>
      
      
      <addmovie-input :value="quoteData.quote.quote.en" rules="required|eng_alphabet" as="textarea" inputName="quote_en" placeholder="Frankly, my dear, I don't give a damn." label="Eng" classLabel="top-[2rem]"></addmovie-input>
      <addmovie-input :value="quoteData.quote.quote.ka" rules="required|geo_alphabet" as="textarea" inputName="quote_ka" placeholder='ციტატა ქართულ ენაზე' label="ქარ" classLabel="top-[2rem]"></addmovie-input>
      
      <div class="w-[100%] h-[45rem] md:h-[27rem] relative py-[2.7rem] px-[1.8rem] border-[#6C757D] border border-solid rounded-[5px] bg-inherit relative">
        <div class="bg-[#181623cc] flex flex-col items-center justify-center gap-[1.2rem] px-[2rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 rounded-[10px]">
          <camera-icon class="mt-[1.6rem]"></camera-icon>
          <p class="mb-[1rem] text-[1.6rem] text-[#fff] font-normal">{{ $t('newsFeed.change_photo') }}</p>
        </div>
      <div v-if="imageDisplay" :style="'background-image:url('+imageDisplay+')'" class="h-[100%] w-[100%] rounded-[5px] absolute top-0 right-0 bg-cover bg-no-repeat bg-center"></div>
      <input @change="handleImageChange" type="file" class="z-50 w-[100%] h-[100%] cursor-pointer absolute top-0 left-0 opacity-0" />
      </div>

      <basic-button type="submit" class="text-[#fff] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[5px] mt-[1rem] mb-[1.8rem]" width="w-[100%]">{{ $t('newsFeed.save_changes') }}</basic-button>
     </Form>
     </div>
   <div>
      <basic-navigation :user="authUser" :dataIsFetched="dataIsFetched" feed="#fff" movies="#E31221" profile="border-[2px] border-solid border-[#fff]"></basic-navigation>
    </div>
    <div></div>
  </div>
</div>
</template>


<style scoped>
.main{
  background: linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%);
  display: grid;
  grid-template-columns: 1.2fr 4fr;
  color:#181623cc
}
.backdrop{
  backdrop-filter: blur(25px);
}
</style>