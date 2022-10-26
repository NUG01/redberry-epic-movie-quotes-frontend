<template>
    <div class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[9rem] py-[6rem] bg-[#222030] rounded-[10px] z-50">
      <verified-tick></verified-tick>
      <div class="flex flex-col text-center gap-[3rem] mb-[3rem] mt-[4rem]">
      <p class="text-[3.2rem] text-[#ffffff] font-medium">Thank you!</p>
      <p class="text-[1.6rem] text-[#ffffff]">Your account has been activated.</p>
      </div>
      <a href="login" style="width:100%"><basic-button type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">Go to my news feed</basic-button></a>

    </div>
  </div>
</template>

<script>
import FormHeader from "@/components/FormHeader.vue";
import LoginForm from "@/components/forms/LoginForm.vue";
import VerifiedTick from "@/components/icons/VerifiedTick.vue";
import BasicButton from "@/components/BasicButton.vue";
import { useRouter } from "vue-router";
export default {
  name:"verified",
  components:{FormHeader,LoginForm, BasicButton, VerifiedTick},
  setup(){
    const router=useRouter();

    function modalHide(){
     return router.push({name:'login'});
    }
    
    return {
      modalHide
    }
  }
}
</script>