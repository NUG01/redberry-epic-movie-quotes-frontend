<script>
import BasicButton from "@/components/BasicButton.vue";
export default {
  name:'Forbidden',
  components:{BasicButton}
  
}
</script>


<template>
  <div class="bg-[#181623] w-[100vw] h-[100vh] flex flex-col items-center justify-center">
    <div class="relative inline-block">
      <img class="relative z-50" src="/src/assets/Gandolf.png">
      <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%]" src="/src/assets/UnionElipse.png">
      </div>
    <div class="text-[#ffffff] flex flex-col items-center justify-center gap-[1.6rem] mb-[5.4rem]">
      <p class="font-bold text-[4.7rem] md:text-[2.4rem]">You shall not pass!</p>
      <p class="font-medium text-[2.4rem] md:text-[1.6rem] md:text-center md:px-[3rem]">Sorry, but  you don’t have permission to access this page</p>
    </div>
    <router-link :to="{name:'landing'}" class="mb-[15rem] "><basic-button type="button" class="text-[white] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]">Return home</basic-button></router-link>
  </div>
</template>
