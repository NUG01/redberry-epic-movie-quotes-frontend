<script>
import BaseButton from "@/components/BaseButton.vue";
import LandingImage from "@/components/LandingImage.vue";
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";

import { ref } from "vue";
export default{
  name:"Landing",
  components:{BaseButton,LandingImage,DropdownArrow,RegisterForm},
  emits:["emit-base"],
  setup(){

    const registerShow=ref(false);

    function registration(){
      registerShow.value=true;
    }
    function registrationHide(){
      registerShow.value=false;
    }
  
    return{
      showModal:registerShow,
      registration,
      registrationHide
      }
  }

}



</script>

<template>
<section class="w-[100vw] bg-[#08080D] relative">
  <div v-if="showModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click.stop="registrationHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <div class="flex flex-col text-center gap-[1.2rem] mb-[2.4rem]">
        <p class="text-[3.2rem] text-[#ffffff] font-medium">Create an account</p>
        <p class="text-[1.6rem] text-[#6C757D]">Start your journey!</p>
      </div>
     <register-form></register-form>
      <div class="flex items-center justify-center">
      <p class="text-[#6C757D] text-[1.6rem]">Already have an account? <span class="text-[#0D6EFD]">Log in</span></p>
      </div>
    </div>
  </div>
<div class="gradient-two absolute top-0 left-0 h-[100%] w-[100%] z-10">
  <header class="absolute top-0 left-0 w-[100%] h-[auto] py-[3rem] px-[7rem] flex items-center justify-between">
    <div class="uppercase font-medium text-[1.6rem] text-[#DDCCAA]">movie quotes</div>
    <div class="flex gap-[1.6rem]">
      <div class="flex items-center justify-center gap-[1rem] mr-[2.4rem]">
        <p class="text-[1.6rem] text-[white]">Eng</p>
      <dropdown-arrow></dropdown-arrow>
      </div>
      <base-button @emit-base="registration" text="text-[1.6rem]" class="text-[1.6rem] text-[#ffffff]" type="button" paddings="px-[25.5px] py-[7px]" rounded="rounded-[4px]">Sign Up</base-button>
      <button type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px]">Log in</button>
      
    </div>
  </header>
</div>
<div class="w-[100%] h-[80vh] gradient-one flex items-center justify-center">
  <div class="flex flex-col gap-[3rem] items-center text-[6rem] font-bold text-[#DDCCAA] text-center">
    <p>Find any quote in<br>millions of movie lines</p>
    <base-button @emit-base="registration" type="button" paddings="px-[16px] py-[9px]" rounded="rounded-[4.8px]" text="text-[2rem]">Get started</base-button>  
  </div>
</div>
  
  <landing-image margintop="mt-[18%]" image="/src/assets/image1.png" gradient="gradient-two">
    &#8220;You have to leave something<br>behind to go forward&#8221;
    <template v-slot:movie>
        Interstellar, 2014
    </template>
  </landing-image>
  
  <landing-image margintop="mt-[21%]" image="/src/assets/image3.png" gradient="gradient-three">
    &#8220;I think we're just gonna have<br>to be secretly in love with each other<br>and leave it that&#8221;
    <template v-slot:movie>
        The Royal Tenenbaums, 2001
    </template>
  </landing-image>
  
  <landing-image margintop="mt-[27%]" image="/src/assets/image2.png" gradient="gradient-four">
    &#8220;For behold! the storm comes,<br>and now all friends should gather together,<br>lest each singly be destroyed&#8221;
    <template v-slot:movie>
        The Lord of the Rings, 2003
    </template>
  </landing-image>
<div class="w-[100%] h-[4.5rem] absolute bottom-0 left-0"><div class="gradient-five relative top-0 left-0 h-[100%] w-[100%] z-10 flex items-center">
  <p class="font-medium text-[1.2rem] text-[#DDCCAA] uppercase ml-[7rem]">&#169;  2022 movie quotes. all rights reserved.</p></div></div>
</section>
</template>

<style scoped>
section{
  font-family:sans-serif;
  font-weight: normal;
}
.gradient-one{
  background: linear-gradient(180deg, #11101A 0%, #08080D 100%);
}
.gradient-two{
  background: linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 55.21%, rgba(0, 0, 0, 0) 100%);
}
</style>
