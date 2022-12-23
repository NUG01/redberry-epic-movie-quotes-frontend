<script>
import BasicButton from "@/components/BasicButton.vue";
import LandingImage from "@/components/LandingImage.vue";
import LandingFooter from "@/components/LandingFooter.vue";
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import { setLocale } from "@vee-validate/i18n";
import i18n from "@/config/i18n/index.js";
import { ref, watch } from "vue";


export default{
  name:"Landing",
  components:{BasicButton, LandingImage, DropdownArrow, LandingFooter},
     setup(){

      const langActive=ref(false);
      const intersection=ref(false);
      const locale=ref(i18n.global.locale)

      function langDropDown(){
        langActive.value=!langActive.value;
        setTimeout(function(){
          langActive.value=false
        }, 2700);

      }


        const observeEl=new IntersectionObserver(function(entries) {
        const ent=entries[0]
        if(ent.isIntersecting==false){
          intersection.value=false
         }else{
          intersection.value=true
        }
      }, {
        root: null,
        threshold:1,
        rootMargin:'-75px'
      });

      setTimeout(() => {
        observeEl.observe(document.getElementById('getStartedButton'));
      }, "720")
     

  watch(locale, () => {
  setLocale(locale.value)
});
  
 function changeLocale(lang){
   locale.value=lang
}

     

      return {
        langDropDown,
        active: langActive,
        intersection,changeLocale
        }
     }
}

</script>

<template >
<section class="w-[100vw] bg-[#08080D] relative">
  <router-view></router-view>
<div class="absolute top-0 left-0 h-[100%] w-[100%] gradient-two z-10"></div>
<div class="fixed top-0 left-0 h-[100%] w-[100%] z-30">
  <header class="absolute z-50 top-0 left-0 w-[100%] h-[auto] py-[3rem] px-[5rem] md:px-[3.6rem] md:py-[2.4rem] flex items-center justify-between z-50">
    <div class="uppercase font-medium text-[1.6rem] sm:text-[1.4rem] text-[#DDCCAA]">movie quotes</div>
    <div class="flex gap-[1.6rem] md:gap-0">
      <div class="mr-[2.4rem] relative flex items-center justify-center">
        <div @click="langDropDown" class="flex items-center justify-center gap-[1rem] cursor-pointer">
        <p class="text-[1.6rem] sm:text-[1.4rem] text-[white]">{{ $i18n.locale=='en'? 'Eng' : 'Ka' }}</p>
      <dropdown-arrow></dropdown-arrow>
        </div>
      <div @click="active=false" class="absolute top-full left-0 bg-none border border-solid border-[white] w-[100%] rounded-[3px] h-[0px] hidden" :class="{lang : active}">
          <div @click="$i18n.locale='en'" @mouseenter="changeLocale('en')" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600] cursor-pointer"><p class="text-[1.4rem] sm:text-[1.3rem] px-[5px] py-[4px]">Eng</p></div>
          <div @click="$i18n.locale='ka'" @mouseenter="changeLocale('ka')" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600] cursor-pointer"><p class="text-[1.4rem] sm:text-[1.3rem] px-[5px] py-[4px]">Ka</p></div>
      </div>
      </div>
      <router-link :to="{name:'registration'}" class="md:hidden"><basic-button text="text-[1.6rem]" class="text-[1.6rem] text-[#ffffff]" type="button" paddings="px-[25.5px] py-[7px]" rounded="rounded-[4px]">{{ $t('landing.signup') }}</basic-button></router-link>
      <router-link :to="{name:'login'}"><button type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] hover:bg-[#cdc9c2] hover:text-[#222030] font-medium active:bg-[#b6b1a8] disabled:bg-[#e6e2da] focus:bg-[#a5a199] focus:text-[#222030]">{{ $t('landing.login') }}</button></router-link>
    </div>
  </header>
</div>
 
<div class="w-[100%] h-[80vh] gradient-one flex items-center justify-center">
  <div class="flex flex-col gap-[3rem] items-center text-[6rem] md:text-[3rem] font-bold text-[#DDCCAA] text-center">
    <p>{{ $t('landing.find_any_quote') }}<br>{{ $t('landing.millions_movie_lines') }}</p>
    <basic-button type="button" rounded="rounded-[4.8px]" text="text-[2rem]" id="getStartedButton" :class="[!intersection ? 'z-20' : '']"><router-link to="/landing/register" class="px-[16px] py-[9px] md:px-[14px] md:py-[7px] block focus:shadow-base-shadow rounded-[4.8px] text-[2rem] border border-solid transition-all disabled:opacity-[0.65] bg-[#E31221] border-[#E31221] hover:bg-[#CC0E10] hover:border-[#CC0E10] active:bg-[#B80D0F] active:border-[#B80D0F]disabled:bg-[#EC4C57]focus:bg-[#B80D0F]focus:border-[#B80D0F]">{{ $t('landing.get_started') }}</router-link></basic-button>
  </div>
</div>
  
  <landing-image margintop="mt-[18%] md:mt-[48%]" image="bg-[url(/src/assets/InterstellarMovie.png)]" :imageSource="true" gradient="gradient-two">
    &#8220;{{ $t('landing.interstellar_quote_one') }}<br class="sm:hidden"> {{ $t('landing.interstellar_quote_two') }}&#8221;
    <template v-slot:movie>
        {{ $t('landing.interstellar') }}, 2014
    </template>
  </landing-image>

    <landing-image margintop="mt-[18%] md:mt-[54%]" image="bg-[url(/src/assets/TenenbaumsMovie.png)] bg-fixed" gradient="gradient-three">
    &#8220;{{ $t('landing.tenenbaums_quote_one') }}<br class="sm:hidden"> {{ $t('landing.tenenbaums_quote_two') }}<br> {{ $t('landing.tenenbaums_quote_three') }}&#8221;
    <template v-slot:movie>
        {{ $t('landing.tenenbaums') }}, 2001
    </template>
  </landing-image>
  
    <landing-image margintop="mt-[18%] md:mt-[60%]" image="bg-[url(/src/assets/LordofRingsMovie.png)] bg-fixed" gradient="gradient-four">
    &#8220;{{ $t('landing.lord_of_rings_quote_one') }}<br class="sm:hidden"> {{ $t('landing.lord_of_rings_quote_two') }}<br>{{ $t('landing.lord_of_rings_quote_three') }}&#8221;
    <template v-slot:movie>
        {{ $t('landing.lord_of_rings') }}, 2003
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
