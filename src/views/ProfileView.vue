<script>
import { useUserStore } from '@/stores/UserStore.js';
import { ref, onMounted } from "vue";
import BasicNavigation from "@/components/BasicNavigation.vue";
import BasicInput from "@/components/BasicInput.vue";
import ProfileInput from "@/components/ProfileInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
import basicAxios from "@/config/axios/BasicAxios.js";
import ProfileinvalidIcon from "@/components/icons/ProfileinvalidIcon.vue";
import FormHeader from "@/components/FormHeader.vue";
import { imageUpload } from "@/helpers/ImageUpload/index.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import BasicHeader from "@/components/BasicHeader.vue";
import SearchArrow from "@/components/icons/SearchArrow.vue";
import AddEmail from "@/components/icons/AddEmail.vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import DeleteTrash from "@/components/icons/DeleteTrash.vue";





export default {
    name:'Profile',
    components:{BasicHeader, BasicNavigation,BasicInput,Form,Field, InvalidIcon, ErrorMessage,DeleteTrash, ProfileInput, ProfileinvalidIcon,FormHeader, BasicButton, LoadingSpinner, SearchArrow, AddEmail},
  
  setup(){

    const router = useRouter();
    const login = useUserStore();
    const image=ref('')
    const imageError=ref(false)
    const responseError=ref([])
    const emails=ref(null)
    const requestSuccess=ref(false)
    const dataIsFetched=ref(false)
    const newEmailModal=ref(false)


    const user=ref([])
    const imageUrl=ref('')
    const imageDisplay=ref('')
    const selectedFile=ref('')

      user.value =login.getUserData;
      emails.value=login.getUserData.emails
      dataIsFetched.value=true
      


        
      // imageDisplay.value='http://localhost:8000/assets/LaracastImage.png'
      imageDisplay.value='http://localhost:8000/'+user.value.thumbnail
    
    function handleImageChange(ev){
    imageUpload(ev,selectedFile, imageDisplay, imageUrl);
  }

    function onSubmitGoogleProfile(values){
      const form=new FormData();
      form.append('thumbnail', selectedFile.value);
      form.append('name', values.name);
      basicAxios.post('user/profile',form)
    .then((res)=>{
     responseError.value=[];
     requestSuccess.value=true
    })
    .catch((err)=>{
      responseError.value.push(err.response.data.message)
    })
    }

  
    function onSubmit(values){
      const form=new FormData();
      form.append('thumbnail', selectedFile.value);
      form.append('name', values.name);
      form.append('email', values.email);
      form.append('password', values.password);
      basicAxios.post('user/profile',form)
    .then((res)=>{
      responseError.value=[];
      requestSuccess.value=true
    })
    .catch((err)=>{
      responseError.value.push(err.response.data.message)
    })

    }

    function reload(){
      location.reload();
    }

   async function newEmailHandle(values){
    const res= await axios.post('user/newEmail', values)
    emails.value=res.data
    newEmailModal.value=false
    }

   async function deleteEmail(id){
     const res=await axios.post('user/email/'+id)
     emails.value=res.data
    }

    function chooseEmail(email){
      user.value.email=email.address
    }

  

    
return {
  user,
  requestSuccess, 
  reload, 
  onSubmit, 
  imageUrl,
  handleImageChange, 
  imageDisplay, 
  imageError, 
  responseError, 
  onSubmitGoogleProfile,
  dataIsFetched,
  router,
  newEmailModal,
  newEmailHandle,
  emails,
  deleteEmail,
  chooseEmail
  }
  }
  
}
</script>


<template>
<div class="overflow-x-hidden overflow-y-scroll">
  <loading-spinner v-if="!dataIsFetched" texts="hidden" bgColor="bg-none" location="mt-[20rem]"></loading-spinner>
  <div v-else class="main w-[100vw] bg-[#181623] min-h-[100vh]">
  <basic-header></basic-header>
  <main>
    <div v-if="newEmailModal" @click="newEmailModal=false" class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-40"></div>
    <div v-if="newEmailModal" class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11101A] w-[54rem] lsm:w-[100vw]">
    <div class="border-b border-b-solid border-b-[#ced4da34] w-[100%] px-[3.2rem] py-[2.4rem]">
      <p class="font-medium text-[2.4rem] text-[#fff]">Add new Email</p>
    </div>
      <Form @submit="newEmailHandle" class="px-[4rem] pb-[2.4rem] pt-[4.2rem]">
        <div class="flex flex-col items-center mb-[5.4rem] gap-[8px]">
        <label for="new_email" class="text-[1.6rem] text-[#fff] self-start">New email</label>
        <Field name="new_email" type="email" id="new_email" rules="email|required" placeholder="Enter new email" class="w-[100%] h-[4.2rem] rounded-[4.8px] text-[1.6rem] pl-[17px]"/>
        </div>
        <div class="flex items-center justify-end gap-[3rem]">
          <p @click="newEmailModal=false" class="text-[#D9D9D9] text-[2rem] cursor-pointer">Cancel</p>
          <button type="submit" class="bg-[#E31221] px-[17px] py-[9px] rounded-[4.8px]"><p class="text-[2rem] text-[#fff]">Add</p></button>
        </div>
      </Form>
    </div>
    <div v-if="requestSuccess" class="absolute w-[100vw] h-[100vh] top-0 left-0">
       <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="reload"></div>
       <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <form-header>
        {{ $t('newsFeed.profile_updated') }}
        <template v-slot:secondaryText>
         {{ $t('newsFeed.reload_page') }}<br><br><span v-if="!user.google_id">{{ $t('newsFeed.if_email_changed') }}<br>{{ $t('newsFeed.dont_forget_confirm') }}</span>
        </template>
      </form-header>
      <div class="flex items-center justify-center">
        <basic-button type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]" @click="reload">{{ $t('newsFeed.reload_page') }}</basic-button>
      </div>
       </div>
    </div>
   
   
    <div class="md:hidden">
      <basic-navigation :user="user" :dataIsFetched="dataIsFetched" feed="#fff" movies="#fff" profile="border-[2px] border-solid border-[#E31221]"></basic-navigation>
    </div>
    <div class="bg-gray md:bg-[#24222F] md:mt-[3rem] relative">
      <p class="font-medium text-[2.4rem] text-[#fff] mt-[3rem] md:mt-[12rem] md:hidden">{{ $t('newsFeed.my_profile') }}</p>
        <search-arrow @click="router.push({name:'news-feed'})" class="hidden md:block absolute top-0 left-0 -translate-y-[150%] translate-x-[180%]"></search-arrow>
      <div v-if="user.google_id" class="bg-[#11101A] md:bg-inherit w-[90rem] md:w-[100vw] lg:w-[55rem] xl:w-[70rem] h-[auto] mt-[12rem] rounded-[12px] backblur relative">
        <Form @submit="onSubmitGoogleProfile" class="w-[100%] mb-[12rem] px-[24%] md:px-[3rem] lg:px-[15%] xl:px-[20%] pb-[10%] flex flex-col items-center" enctype="multipart/form-data">
          <div class="relative inline-block -translate-y-[31%]">
            <!-- <img src='http://127.0.0.1:8000/assets/LaracastImage.png' class="rounded-[100%] w-[19rem] h-[19rem]"> -->
            <img v-if="imageDisplay" :src='imageDisplay' class="rounded-[100%] w-[19rem] h-[19rem]">
            <p class="text-[2rem] text-[#fff] text-center mt-[8px]">{{ $t('newsFeed.upload_photo') }}</p>
             <input type="file" @change="handleImageChange" class="w-[100%] h-[100%] absolute top-0 left-0 opacity-0" />
          </div>
           <div v-if="responseError.length>0" @click="responseError=[]" id="responseError" class="mt-[2rem] px-[6px] py-[4px] cursor-pointer border border-solid border-[#EC9524] bg-[#ec952234] text-[#fff] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]"><span class="flex items-center justify-between gap-[1rem]"><p>{{ responseError[0] }}</p><profileinvalid-icon/></span></div>        
          <div class="flex flex-col w-[100%]">
         <profile-input rules='required|min:8|max:15' :vModel="user.name" name="name" type="name" width="w-[100%]" :label="$t('landing.name')"/>
         <profile-input disabled='pointer-events-none opacity-[70%] mt-[3rem]' :vModel="user.email" name="googleEmail" type="email" width="w-[100%]" :label="$t('landing.email')"/>
          </div>
          <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px] absolute bottom-0 right-0 translate-y-[180%] md:right-[2.4rem]">{{ $t('newsFeed.save_changes') }}</basic-button>  
       </Form>
      </div>
      
      <div v-if="!user.google_id"  class="bg-[#11101A] md:bg-inherit w-[90rem] md:w-[100vw] lg:w-[60rem] llg:w-[70rem] xl:w-[70rem] h-[auto] mt-[12rem] rounded-[12px] backblur relative">
        <Form id="form" @submit="onSubmit" enctype="multipart/form-data" class="w-[100%] mb-[12rem] px-[9%] md:px-[3rem] lg:px-[7%] xl:px-[8%] pb-[10%] flex flex-col items-center">
          <div class="relative flex flex-col items-center justify-center inline-block -translate-y-[31%]">
            <img v-if="imageDisplay" :src='imageDisplay' class="rounded-[100%] w-[19rem] h-[19rem]">
            <p class="text-[2rem] text-[#fff] text-center mt-[8px]">{{ $t('newsFeed.upload_photo') }}</p>
            <input type="file" @change="handleImageChange" class="w-[100%] h-[100%] absolute top-0 left-0 opacity-0" />
          </div>
           <div v-if="responseError.length>0" @click="responseError=[]" id="responseError" class="mt-[2rem] px-[6px] py-[4px] cursor-pointer border border-solid border-[#EC9524] bg-[#ec952234] text-[#fff] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]"><span class="flex items-center justify-between gap-[1rem]"><p>{{ responseError[0] }}</p><profileinvalid-icon/></span></div>        
          <div class="flex flex-col w-[100%] gap-[2rem]">

          <profile-input rules='required|min:8|max:15|lower_case' :vModel="user.name" name="name" type="name" width="w-[60%]" :label="$t('landing.name')"/>
          
          <div class="flex items-center gap-[2.4rem] lsm:gap-[1.2rem]">
          <profile-input rules='email|required' :vModel="user.email" name="email" type="email" width="w-[60%]" :label="$t('landing.email')"/>
          <div class="translate-y-[25%]">
            <p class="text-[1.8rem] text-[#CED4DA]">Primary Email</p>
          </div>
          </div>
          
          
          <div v-for="email in emails" v-show="email.address!=user.email" :key="email.id" class="flex items-center lsm:flex-col lsm:items-start lsm:justify-start gap-[2.4rem] lsm:gap-0">
          <profile-input :vModel="email.address" :name="'email'+email.id" type="email" width="w-[60%] pointer-events-none" :label="$t('landing.email')"/>
          <div class="translate-y-[25%] flex items-center justify-center gap-[1.8rem] lsm:self-end">
            <p @click="chooseEmail(email)" class="text-[1.8rem] text-[#CED4DA] cursor-pointer">Make this primary</p>
            <div class="h-[2rem] w-[1px] bg-[#6C757D]"></div>
            <delete-trash @click="deleteEmail(email.id)" class="cursor-pointer"></delete-trash>
          </div>
          </div>

          <button @click="newEmailModal=true" type="button" class="flex items-center justify-center self-start gap-[8px] border border-[#ffffffb4] border-solid rounded-[4.8px] px-[10px] py-[6px]">
            <add-email></add-email>
            <p class="text-[1.6rem] text-[#fff]">Add new email</p>
          </button>

          <profile-input rules='required|min:8|max:15|lower_case'  name="password" type="password" width="w-[60%]" placeholder="••••••••••" :label="$t('landing.password')"/>
          </div>
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px] absolute bottom-0 right-0 translate-y-[180%] md:right-[2.4rem]">{{ $t('newsFeed.save_changes') }}</basic-button>  
      </Form>
      </div>
    </div>
    <div></div>

  </main>
  </div>
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
@media (max-width: 1500px) {
  main{
    display: grid;
    grid-template-columns: 0.75fr auto;
  }
  
}
@media (max-width: 1360px) {
  main{
    display: grid;
    grid-template-columns: 0.82fr auto;
  }
  
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
.scrollHide::-webkit-scrollbar {
  display: none;
}
.scrollHide {
  scrollbar-width: none; 
}
.backblur{
  backdrop-filter: blur(25px);
}
input::placeholder {
  font-weight: 400;
  font-size: 1.6rem;
  color:  #6C757D;
}
 input:disabled::placeholder {
  color:  rgba(87, 92, 97, 0.3);
}
</style>