<script>
import FormHeader from "@/components/FormHeader.vue";
import PasswordforgetForm from "@/components/forms/PasswordforgetForm.vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';
import VerifyEmail from "@/components/icons/VerifyEmail.vue";
import BasicButton from "@/components/BasicButton.vue";
export default {
  name:"ForgotPassword",
  emits:['isReset'],
  components:{FormHeader,PasswordforgetForm, VerifyEmail, BasicButton},
  setup(){
    const router=useRouter();
     const resetModal=ref(true);


  function changeResetStatus(){
    resetModal.value=false

  }

    setTimeout(() => {
      resetModal.value=true
    }, "3600")

    function modalHide(){
     return router.push({name:'landing'});
    }
    
    return {
      modalHide,
      resetModal,
      changeResetStatus
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
        {{ $t('landing.forgot_password_?') }}
        <template v-slot:secondaryText>
         {{ $t('landing.enter_email') }}
        </template>
      </form-header>
     <passwordforget-form @is-reset="changeResetStatus"></passwordforget-form>
    </div>
  </div>
  <div v-if="!resetModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="max-w-[54rem] md:max-w-[100vw] md:min-w-[100vw] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[8rem] pt-[5rem] pb-[7.5rem] md:px-[3rem] md:pt-[2rem] md:pb-[2.4rem] bg-[#222030] rounded-[10px] z-50">
      <verify-email class="mb-[2rem] mt-[1.4rem]"></verify-email>
      <div class="flex flex-col text-center gap-[3.2rem] mb-[4rem]">
      <p class="text-[3.2rem] text-[#ffffff] font-medium">{{ $t('landing.thank_you') }}</p>
      <p class="text-[1.6rem] text-[#ffffff]">{{ $t('landing.please_check_email') }}</p>
      </div>
      <a href="https://mail.google.com/" style="width:100%"><basic-button type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">{{ $t('landing.go_to_email') }}</basic-button></a>
      <router-link :to="{name:'landing'}" class="mt-[2.7rem]"><p class="text-[1.6rem] text-[#6C757D]">{{ $t('landing.confirm_later') }}</p></router-link>
</div>
  </div>
</div>
</template>
