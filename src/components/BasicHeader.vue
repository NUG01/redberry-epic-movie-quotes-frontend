<template>
<div class="relative w-[100vw] h-[8rem] flex items-center justify-center bg-[#222030]">
  <div class="absolute top-0 left-0 w-[100vw] z-10">
  <header class="absolute top-0 left-0 w-[100%] h-[auto] px-[7rem] flex items-center justify-between py-[2rem]">
    <div class="uppercase font-medium text-[1.6rem] text-[#DDCCAA]">movie quotes</div>
    <div class="flex gap-[1.6rem]">
      <div class="flex items-center justify-center">
      <notification-icon class="mr-[2.4rem] hover:cursor-pointer"></notification-icon>
      </div>
      <div class="mr-[2.4rem] relative flex items-center justify-center">
        <div @click="langDropDown" class="flex items-center justify-center gap-[1rem] cursor-pointer">
        <p class="text-[1.6rem] text-[white]">Eng</p>
      <dropdown-arrow></dropdown-arrow>
        </div>
      <div class="absolute top-full left-0 bg-[#222030] border border-solid border-[white] w-[100%] rounded-[3px] h-[0px] hidden" :class="{lang : active}">
          <router-link to="#" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600]"><p class="text-[1.4rem] px-[5px] py-[4px]">Eng</p></router-link>
          <router-link to="#" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600]"><p class="text-[1.4rem] px-[5px] py-[4px]">Ka</p></router-link>
      </div>
      </div>
      <button @click="logoutHandle" type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] hover:bg-[#cdc9c2] hover:text-[#222030] font-medium active:bg-[#b6b1a8] disabled:bg-[#e6e2da] focus:bg-[#a5a199] focus:text-[#222030]">Log out</button>
    </div>
  </header>
</div>
</div>
</template>


<script>
import { ref } from "vue";
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import BasicButton from "@/components/BasicButton.vue";
import { useLoginStore } from '@/stores/LoginStore.js';

export default {
  components:{DropdownArrow,BasicButton, NotificationIcon},
  setup(){

    const login=useLoginStore();

    const langActive=ref(false);

      function langDropDown(){
        langActive.value=!langActive.value;
        setTimeout(function(){
          langActive.value=false
        }, 1800);

      }

       function logoutHandle(){
      login.sendLogoutData();
    }

        return {
        langDropDown,
        active: langActive,
        logoutHandle
        }
  }
}
</script>


<style scoped>

.lang{
  color:#cdc9c2;
  color:#23232b;
  height: auto !important;
  display: block !important;
}
</style>