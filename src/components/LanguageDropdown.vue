<script>
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import { ref } from 'vue';
export default {
  components:{DropdownArrow},

  setup(){
    const langActive=ref(false);

      function langDropDown(){
        langActive.value=!langActive.value;
        setTimeout(function(){
          langActive.value=false
        }, 1800);

      }
    return {langDropDown,langActive}
  }
  
}
</script>


<template>
<div class="mr-[2.4rem] relative flex items-center justify-center md:hidden">
        <div @click="langDropDown" class="flex items-center justify-center gap-[1rem] cursor-pointer">
        <p class="text-[1.6rem] text-[white]">{{ $i18n.locale=='en'? 'Eng' : 'Ka' }}</p>
      <dropdown-arrow></dropdown-arrow>
        </div>
      <div class="absolute top-full left-0 bg-[#222030] border border-solid border-[white] w-[100%] rounded-[3px] h-[0px] hidden" :class="{lang: langActive}">
          <div @click="$i18n.locale='en'" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600] cursor-pointer"><p class="text-[1.4rem] px-[5px] py-[4px]">Eng</p></div>
          <div @click="$i18n.locale='ka'" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600] cursor-pointer"><p class="text-[1.4rem] px-[5px] py-[4px]">Ka</p></div>
      </div>
      </div>
</template>

<style scoped>
.lang{
  color:#cdc9c2;
  height: auto !important;
  display: block !important;
}
</style>