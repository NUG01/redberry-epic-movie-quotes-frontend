<template>
  <div class="bg-[#181623] w-[100vw] h-[100vh] flex flex-col items-center justify-center">
    <div class="relative inline-block">
      <img class="relative z-50" src="/src/assets/Gandolf.png">
      <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%]" src="/src/assets/UnionElipse.png">
      </div>
    <div class="text-[#ffffff] flex flex-col items-center justify-center gap-[1.6rem] mb-[5.4rem]">
      <p class="font-bold text-[4.7rem]">You shall not pass!</p>
      <p class="font-medium text-[2.4rem]">Sorry, but  you don’t have permission to access this page</p>
    </div>
    <router-link :to="{name:'landing'}"><basic-button type="button" class="mb-[15rem] text-[white] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]">Return home</basic-button></router-link>
  </div>
</template>

<script>
import BasicButton from "@/components/BasicButton.vue";
export default {
  name:'forbidden',
  components:{BasicButton}
  
}
</script>