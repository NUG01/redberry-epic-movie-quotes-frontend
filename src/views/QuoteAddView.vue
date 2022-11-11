<script>
import { Form, Field } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BasicButton from "@/components/BasicButton.vue";
import AddmovieInput from "@/components/inputs/AddmovieInput.vue";
import CheckboxInput from "@/components/inputs/CheckBox.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import CloseCheckbox from "@/components/icons/CloseCheckbox.vue";
import basicAxios from "@/config/axios/BasicAxios.js";
import BasicNavigation from "@/components/BasicNavigation.vue";



export default {
  name:'AddQuote',
  emits:['emit-close'],
  components:{Form, BasicButton, AddmovieInput, CloseIcon,CameraIcon, Field, CloseCheckbox,CheckboxInput, BasicNavigation },
  setup(){

   const router=useRouter();

   const imageDisplay=ref('')
   const selectedFile=ref('')


    function handleImageChange(ev){
    const file=ev.target.files[0]
    selectedFile.value=ev.target.files[0]

      const reader= new FileReader();
      reader.onload= () =>{
        imageDisplay.value=reader.result
      }
      reader.readAsDataURL(file)
    }
  


    return {imageDisplay, handleImageChange, router}
  }
  
}
</script>



<template>
  <div class="main w-[100vw] min-h-[100vh]">
    <div @click="router.go(-1)" class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50"></div>
     <div class="absolute w-[52%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11101A] rounded-[10px] z-50">
    <div class="flex items-center justify-center border-b border-b-solid border-b-[#f0f0f036] relative backdrop">
      <p class="text-[2.4rem] font-medium text-[#fff] pt-[3rem] pb-[2.4rem]">Add Quote</p>
      <close-icon  @click="router.go(-1)" class="absolute top-1/2 right-[3.6rem] cursor-pointer"/>
    </div>
       <Form @submit="onSubmit" class="w-[100%] p-[3rem] flex flex-col items-center justify-center gap-[2rem]" enctype="multipart/form-data">
      <div class="self-start mb-[0.5rem]">
      <div class="flex items-center self-start justify-start gap-[1.6rem] mb-[3rem]">
        <img src="/src/assets/TenenbaumsMovie.png" class="rounded-[100%] w-[6rem] h-[6rem]"/>
        <p class="text-[2rem] text-[#fff]">Nino Tabagari</p>
      </div>
       <div class="flex items-center gap-[3rem]">
          <img src="/src/assets/TenenbaumsMovie.png" class="rounded-[12px] w-[30%] inline-block"/>
          <div class="flex flex-col justify-center gap-[2.4rem]">
            <p class="text-[2.4rem] text-[#DDCCAA] font-medium">vigacai</p>
              <div class="flex items-center gap-[8px]">
              <p v-for="i in 2" :key="i" class="font-semibold text-[#fff] text-[1.8rem] px-[10px] py-[2px] bg-[#6C757D] inline-block rounded-[4px]">genre</p>
            </div>
            <div class="flex items-center gap-[1rem]">
              <p class="text-[#CED4DA] text-[1.8rem] font-bold">Director:</p>
              <p class="text-[#fff] text-[1.8rem] font-medium">NICK CASSAVETES</p>
            </div>
          </div>
       </div>
      </div>
      
      <addmovie-input rules="required" as="textarea" inputName="quote_en" placeholder='"Quote in English"' label="Eng" classLabel="top-[2rem]"></addmovie-input>
      <addmovie-input rules="required" as="textarea" inputName="quote_ka" placeholder='"ციტატა ქართულ ენაზე"' label="ქარ" classLabel="top-[2rem]"></addmovie-input>
      
      <div class="w-[100%] h-[100%] relative py-[2.7rem] px-[1.8rem] border-[#6C757D] border border-solid rounded-[5px] bg-inherit mt-[2rem]">
        <div class="flex items-center gap-[1.2rem]">
          <camera-icon></camera-icon>
          <div class="text-[2rem] text-[#fff] font-normal flex items-center justify-start gap-[8px]"><p>Drag & drop your image here or <span class="bg-[#9747ff36] rounded-[2px] p-[1rem]">Choose file</span></p></div>
        </div>
        <img v-if="imageDisplay" :src="imageDisplay" class="h-[100%] max-w-[20%] rounded-[5px] absolute top-0 right-0" />
      <input @change="handleImageChange" type="file" class="z-50 w-[100%] h-[100%] cursor-pointer absolute top-0 left-0 opacity-0" />
      </div>

      <basic-button type="submit" class="text-[#fff] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[5px] mt-[3.2rem] mb-[1.8rem]" width="w-[100%]">Add quote</basic-button>
     </Form>
     </div>
   <div>
      <basic-navigation feed="#fff" movies="#E31221" profile="border-[2px] border-solid border-[#fff]"></basic-navigation>
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