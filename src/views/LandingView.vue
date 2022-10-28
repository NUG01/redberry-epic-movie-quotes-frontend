<script>
import BasicButton from "@/components/BasicButton.vue";
import LandingImage from "@/components/LandingImage.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import { ref } from "vue";
export default{
  name:"landing",
  components:{BasicButton, LandingImage, DropdownArrow, LandingFooter,},
     setup(){

      const langActive=ref(false);

      function langDropDown(){
        langActive.value=!langActive.value;
        setTimeout(function(){
          langActive.value=false
        }, 1800);

      }
     

      return {
        langDropDown,
        active: langActive
        }
     }
}

</script>

<template>
<section class="w-[100vw] bg-[#08080D] relative">
  <router-view></router-view>

<div class="gradient-two absolute top-0 left-0 h-[100%] w-[100%] z-10">
  <header class="absolute top-0 left-0 w-[100%] h-[auto] py-[3rem] px-[7rem] flex items-center justify-between">
    <div class="uppercase font-medium text-[1.6rem] text-[#DDCCAA]">movie quotes</div>
    <div class="flex gap-[1.6rem]">
      <div class="mr-[2.4rem] relative flex items-center justify-center">
        <div @click="langDropDown" class="flex items-center justify-center gap-[1rem] cursor-pointer">
        <p class="text-[1.6rem] text-[white]">Eng</p>
      <dropdown-arrow></dropdown-arrow>
        </div>
      <div class="absolute top-full left-0 bg-none border border-solid border-[white] w-[100%] rounded-[3px] h-[0px] hidden" :class="{lang : active}">
          <router-link to="#" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600]"><p class="text-[1.4rem] px-[5px] py-[4px]">Eng</p></router-link>
          <router-link to="#" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600]"><p class="text-[1.4rem] px-[5px] py-[4px]">Ka</p></router-link>
      </div>
      </div>
      <router-link :to="{name:'registration'}"><basic-button text="text-[1.6rem]" class="text-[1.6rem] text-[#ffffff]" type="button" paddings="px-[25.5px] py-[7px]" rounded="rounded-[4px]">Sign Up</basic-button></router-link>
      <router-link :to="{name:'login'}"><button type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px]">Log in</button></router-link>
    </div>
  </header>
</div>

<div class="w-[100%] h-[80vh] gradient-one flex items-center justify-center">
  <div class="flex flex-col gap-[3rem] items-center text-[6rem] font-bold text-[#DDCCAA] text-center">
    <p>Find any quote in<br>millions of movie lines</p>
    <basic-button type="button" rounded="rounded-[4.8px]" text="text-[2rem]"><router-link to="/landing/register" class="px-[16px] py-[9px] block focus:shadow-base-shadow rounded-[4.8px] text-[2rem] z-30 border border-solid transition-all disabled:opacity-[0.65] bg-[#E31221] border-[#E31221] hover:bg-[#CC0E10] hover:border-[#CC0E10] active:bg-[#B80D0F] active:border-[#B80D0F]disabled:bg-[#EC4C57]focus:bg-[#B80D0F]focus:border-[#B80D0F]">Get started</router-link></basic-button>
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
.lang{
  color:#cdc9c2;
  color:#23232b;
  height: auto !important;
  display: block !important;
}
</style>
