<script>
import { useLoginStore } from '@/stores/LoginStore.js';
import { onMounted, ref } from "vue";
import BasicHeader from "@/components/BasicHeader.vue";
import BasicNavigation from "@/components/BasicNavigation.vue";
import BasicInput from "@/components/BasicInput.vue";
import ProfileInput from "@/components/ProfileInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import { Form, Field, ErrorMessage } from 'vee-validate';
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
import axios from "@/config/axios/index.js";
import ProfileinvalidIcon from "@/components/icons/ProfileinvalidIcon.vue";
import FormHeader from "@/components/FormHeader.vue";


export default {
    name:'Profile',
    components:{BasicHeader, BasicNavigation,BasicInput,Form,Field, InvalidIcon, ErrorMessage, ProfileInput, ProfileinvalidIcon,FormHeader, BasicButton},
  
  setup(){

    const login = useLoginStore();
    const image=ref('')
    const imageError=ref(false)
    const responseError=ref([])
    const requestSuccess=ref(false)

    const user=ref({})
    const imageUrl=ref('')
    const imageDisplay=ref('')

   onMounted(async () => {
      const res = await axios.get("auth-user");
      login.updateUserData(res.data);
      user.value =res.data;
      imageDisplay.value='http://localhost:8000/'+user.value.thumbnail
    });

    function handleChange(ev){
      const file=ev.target.files[0]

      const reader= new FileReader();
      reader.onload= () =>{
        imageUrl.value=reader.result
        imageDisplay.value=reader.result
      }
      reader.readAsDataURL(file)
    }

    function onSubmitGoogleProfile(values){
    axios.patch('update-profile/google',{
      name: values.name,
      thumbnail: imageUrl.value
    })
    .then((res)=>{
     responseError.value=[];
     requestSuccess.value=true
    })
    .catch((err)=>{
      responseError.value.push(err.response.data.message)
    })
    }

  
    function onSubmit(values){
      axios.patch('update-profile',{
      name: values.name,
      email: values.email,
      password: values.password,
      thumbnail: imageUrl.value
    })
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

  

    
return {
  user,
  requestSuccess, 
  reload, 
  onSubmit, 
  imageUrl,
  handleChange, 
  imageDisplay, 
  imageError, 
  responseError, 
  onSubmitGoogleProfile}
  }
  
}
</script>


<template>
  <div class="main w-[100vw] bg-[#181623] min-h-[100vh]">
  <basic-header></basic-header>
  <main>
    <div v-if="requestSuccess" class="absolute w-[100vw] h-[100vh] top-0 left-0">
       <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="reload"></div>
       <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <form-header>
        Profile has been updated
        <template v-slot:secondaryText>
         Reload page to see changes<br><br><span v-if="!user.google_id">If you changed yor email address<br>don't forget to confirm it</span>
        </template>
      </form-header>
      <div class="flex items-center justify-center">
        <basic-button type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]" @click="reload">Reload page</basic-button>
      </div>
       </div>
    </div>
   
   
    <div>
      <basic-navigation feed="#fff" movies="#fff" profile="border-[2px] border-solid border-[#E31221]"></basic-navigation>
    </div>
    <div class="bg-gray">
      <p class="font-medium text-[2.4rem] text-[#fff] mt-[3rem]">My profile</p>
      <div v-if="user.google_id" class="bg-[#11101A] w-[90rem] h-[auto] mt-[12rem] rounded-[12px] backblur relative">
        <Form @submit="onSubmitGoogleProfile" class="w-[100%] mb-[12rem] px-[24%] pb-[10%] flex flex-col items-center" enctype="multipart/form-data">
          <div class="relative inline-block -translate-y-[31%]">
            <img v-if="imageDisplay" :src='imageDisplay' class="rounded-[100%] w-[19rem] h-[19rem]">
            <p class="text-[2rem] text-[#fff] text-center mt-[8px]">Upload new photo</p>
             <input type="file" @change="handleChange" class="w-[100%] h-[100%] absolute top-0 left-0 opacity-0" />
          </div>
           <div v-if="responseError.length>0" @click="responseError=[]" id="responseError" class="mt-[2rem] px-[6px] py-[4px] cursor-pointer border border-solid border-[#EC9524] bg-[#ec952234] text-[#fff] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]"><span class="flex items-center justify-between gap-[1rem]"><p>{{ responseError[0] }}</p><profileinvalid-icon/></span></div>        
          <div class="flex flex-col w-[100%]">
         <profile-input rules='required|min:8|max:15' :vModel="user.name" name="name" type="name" label="Name"/>
          <label for="googleEmail" class="text-[1.6rem] text-[#ffffff] mb-[0.8rem]">Email</label>
          <input name="googleEmail" :value="user.email" class="border border-[#CED4DA] border-solid text-[#232323] text-[1.6rem] px-[13px] py-[7px] rounded-[4px] bg-[#CED4DA] w-[100%] focus:outline-none focus:shadow-focus-shadow disabled:bg-[#E9ECEF]" disabled/>
          </div>
          <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px] absolute bottom-0 right-0 translate-y-[180%]">Save changes</basic-button>  
       </Form>
      </div>
      
      <div v-if="!user.google_id"  class="bg-[#11101A] w-[90rem] h-[auto] mt-[12rem] rounded-[12px] backblur relative">
        <Form id="form" @submit="onSubmit" class="w-[100%] mb-[12rem] px-[24%] pb-[10%] flex flex-col items-center">
          <div class="relative flex flex-col items-center justify-center inline-block -translate-y-[31%]">
            <img v-if="imageDisplay" :src='imageDisplay' class="rounded-[100%] w-[19rem] h-[19rem]">
            <p class="text-[2rem] text-[#fff] text-center mt-[8px]">Upload new photo</p>
            <input type="file" @change="handleChange" class="w-[100%] h-[100%] absolute top-0 left-0 opacity-0" />
          </div>
           <div v-if="responseError.length>0" @click="responseError=[]" id="responseError" class="mt-[2rem] px-[6px] py-[4px] cursor-pointer border border-solid border-[#EC9524] bg-[#ec952234] text-[#fff] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]"><span class="flex items-center justify-between gap-[1rem]"><p>{{ responseError[0] }}</p><profileinvalid-icon/></span></div>        
          <div class="flex flex-col w-[100%] gap-[2rem]">
          <profile-input rules='required|min:8|max:15|lower_case' :vModel="user.name" name="name" type="name" label="Name"/>
          <profile-input rules='email|required' :vModel="user.email" name="email" type="email" label="Email"/>
          <profile-input rules='required|min:8|max:15|lower_case'  name="password" type="password" placeholder="••••••••••" label="Password"/>
          </div>
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px] absolute bottom-0 right-0 translate-y-[180%]">Save changes</basic-button>  
      </Form>
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
  grid-template-columns: 1.2fr auto 1fr;
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