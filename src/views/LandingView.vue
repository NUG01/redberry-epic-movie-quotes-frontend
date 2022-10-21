<script>
import BaseButton from "@/components/BaseButton.vue";
import LandingImage from "@/components/LandingImage.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import FormHeader from "@/components/FormHeader.vue";
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import forgetpasswordForm from "@/components/forms/forgetpasswordForm.vue";

import { ref } from "vue";
export default{
  emits:['forgetPassword', 'backLogin'],
  name:"Landing",
  components:{BaseButton, LandingImage, DropdownArrow, RegisterForm, LoginForm, forgetpasswordForm, LandingFooter, FormHeader},
  emits:["emit-base"],
  setup(){

    const registerShow=ref(false);
    const loginShow=ref(false);
    const forgetPasswordShow=ref(false);


    function showForgetPassword(){
      loginShow.value=false;
      forgetPasswordShow.value=true;
    }
    function backToLogin(){
      loginShow.value=true;
      forgetPasswordShow.value=false;
    }

    function registrationShow(){
      registerShow.value=true;
    }
    function registrationHide(){
      registerShow.value=false;
    }
    function loggingShow(){
      loginShow.value=true;
    }
    function loggingHide(){
      loginShow.value=false;
    }
    function setForgetPasswordShow(){
      forgetPasswordShow.value=true;
    }
    function setForgetPasswordHide(){
      forgetPasswordShow.value=false;
    }


    function switchToRegister(){
      loginShow.value=false;
      registerShow.value=true;
    }
    function switchToLogin(){
      loginShow.value=true;
      registerShow.value=false;
    }
  
    return{
      showModal:registerShow,
      showLogin:loginShow,
      registrationShow,
      registrationHide,
      loggingShow,
      loggingHide,
      switchToLogin,
      switchToRegister,
      showForgetPassword,
      setForgetPasswordShow,
      setForgetPasswordHide,
      forgetPasswordShow,
      backToLogin
      }
  }

}

</script>

<template>
<section class="w-[100vw] bg-[#08080D] relative">
  
  <div v-if="showModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click.stop="registrationHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <form-header>
        Create an account
        <template v-slot:secondaryText>
         Start your journey!
        </template>
      </form-header>
     <register-form></register-form>
      <div class="flex items-center justify-center">
      <p class="text-[#6C757D] text-[1.6rem]">Already have an account? <button @click="switchToLogin" class="text-[#0D6EFD]">Log in</button></p>
      </div>
    </div>
  </div>
  
  <div v-if="showLogin" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click.stop="loggingHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <form-header>
        Log in to your account
        <template v-slot:secondaryText>
         Welcome back! Please enter your details.
        </template>
      </form-header>
     <login-form @forget-password="showForgetPassword"></login-form>
      <div class="flex items-center justify-center">
      <p class="text-[#6C757D] text-[1.6rem]">Don't have an account? <button @click="switchToRegister" class="text-[#0D6EFD]">Sign up</button></p>
      </div>
    </div>
  </div>
  
  <div v-if="forgetPasswordShow" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click.stop="setForgetPasswordHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
       <form-header>
        Forgot password?
        <template v-slot:secondaryText>
         Enter the email and we’ll send an email with
        </template>
      </form-header>
     <forgetpassword-form @back-login="backToLogin"></forgetpassword-form>
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
      <base-button @emit-base="registrationShow" text="text-[1.6rem]" class="text-[1.6rem] text-[#ffffff]" type="button" paddings="px-[25.5px] py-[7px]" rounded="rounded-[4px]">Sign Up</base-button>
      <button @click="loggingShow" type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px]">Log in</button>
    </div>
  </header>
</div>

<div class="w-[100%] h-[80vh] gradient-one flex items-center justify-center">
  <div class="flex flex-col gap-[3rem] items-center text-[6rem] font-bold text-[#DDCCAA] text-center">
    <p>Find any quote in<br>millions of movie lines</p>
    <base-button @emit-base="registrationShow" type="button" paddings="px-[16px] py-[9px]" rounded="rounded-[4.8px]" text="text-[2rem]">Get started</base-button>  
  </div>
</div>
  
  <landing-image margintop="mt-[18%]" image="/src/assets/InterstellarMovie.png" gradient="gradient-two">
    &#8220;You have to leave something<br>behind to go forward&#8221;
    <template v-slot:movie>
        Interstellar, 2014
    </template>
  </landing-image>
  
  <landing-image margintop="mt-[21%]" image="/src/assets/TenenbaumsMovie.png" gradient="gradient-three">
    &#8220;I think we're just gonna have<br>to be secretly in love with each other<br>and leave it that&#8221;
    <template v-slot:movie>
        The Royal Tenenbaums, 2001
    </template>
  </landing-image>
  
  <landing-image margintop="mt-[27%]" image="/src/assets/LordofRingsMovie.png" gradient="gradient-four">
    &#8220;For behold! the storm comes,<br>and now all friends should gather together,<br>lest each singly be destroyed&#8221;
    <template v-slot:movie>
        The Lord of the Rings, 2003
    </template>
  </landing-image>
  
  <landing-footer></landing-footer>
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
