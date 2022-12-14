<script>
import BasicButton from "@/components/BasicButton.vue";
import ElipseShape from "@/components/icons/ElipseShape.vue";
export default {
  name:'NotFound',
  components:{BasicButton,ElipseShape}
  
}
</script>



<template>
  <div class="bg-[#181623] w-[100vw] h-[100vh] flex flex-col items-center justify-center">
    <div>
      <img src="/src/assets/Ghost.png">
      <elipse-shape></elipse-shape>
      </div>
    <div class="text-[#ffffff] flex flex-col items-center justify-center gap-[0.8rem] mt-[3rem] mb-[4.5rem]">
      <p class="font-bold text-[4.7rem] md:text-[2.4rem]">Whoops!</p>
      <p class="font-medium text-[2.4rem] md:text-[1.6rem] md:text-center md:px-[3rem]">We can't see the page you are looking for</p>
    </div>
    <router-link :to="{name:'landing'}"><basic-button type="button" class="text-[white] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]">Return home</basic-button></router-link>
  </div>
</template>
