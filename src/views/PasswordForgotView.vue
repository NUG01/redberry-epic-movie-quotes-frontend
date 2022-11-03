<script>
import FormHeader from "@/components/FormHeader.vue";
import PasswordforgetForm from "@/components/forms/PasswordforgetForm.vue";
import { useRouter } from "vue-router";
import { ref, computed } from 'vue';
import VerifyEmail from "@/components/icons/VerifyEmail.vue";
import { useForgotPasswordStore } from '@/stores/ForgotPasswordStore.js';
import BasicButton from "@/components/BasicButton.vue";
export default {
  name:"ForgotPassword",
  components:{FormHeader,PasswordforgetForm, VerifyEmail, BasicButton},
  setup(){
    const router=useRouter();
     const forgetPassword = useForgotPasswordStore();

     const resetModal=ref(true);

     resetModal.value = computed(() => {
    return forgetPassword.getIsReset;
})


    setTimeout(() => {
     forgetPassword.changeStatus();
    }, "3600")

    function modalHide(){
     return router.push({name:'landing'});
    }
    
    return {
      modalHide,
      resetModal:resetModal.value,
    }
  }
}
</script>



<template>
<div>
  <div v-if="resetModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
       <form-header>
        Forgot password?
        <template v-slot:secondaryText>
         Enter the email and we’ll send an email with
        </template>
      </form-header>
     <passwordforget-form></passwordforget-form>
    </div>
  </div>
  <div v-if="!resetModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="max-w-[54rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[8rem] pt-[5rem] pb-[7.5rem] bg-[#222030] rounded-[10px] z-50">
      <verify-email class="mb-[2rem] mt-[1.4rem]"></verify-email>
      <div class="flex flex-col text-center gap-[3.2rem] mb-[4rem]">
      <p class="text-[3.2rem] text-[#ffffff] font-medium">Thank you!</p>
      <p class="text-[1.6rem] text-[#ffffff]">Please check your email and follow the instructions to activate your account.</p>
      </div>
      <a href="https://mail.google.com/" style="width:100%"><basic-button type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">Go to my email</basic-button></a>
      <router-link :to="{name:'landing'}"><p class="text-[1.6rem] mt-[2.7rem] text-[#6C757D]">Skip, I’ll confirm later</p></router-link>
</div>
  </div>
</div>
</template>
