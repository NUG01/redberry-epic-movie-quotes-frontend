<script>
import FormHeader from "@/components/FormHeader.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";
import VerifyEmail from "@/components/icons/VerifyEmail.vue";
import BasicButton from "@/components/BasicButton.vue";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useRegisterStore } from '@/stores/RegisterStore.js';
export default {
  name:"Registration",
  emits:['showSuccess'],
  components:{FormHeader,RegisterForm,VerifyEmail,BasicButton},
  setup(){
    const router=useRouter();
     const register = useRegisterStore();

     const registrationModal=ref(true);

     registrationModal.value = computed(() => {
    return register.getIsRegistered;
})


    setTimeout(() => {
     register.changeStatus();
    }, "3600")

    function modalHide(){
     return router.push({name:'landing'});
    }

    
    return {
      modalHide,
      registrationModal:registrationModal.value,
    }
  }
}
</script>



<template>
<div>
  <div v-if="registrationModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <form-header>
        {{ $t('landing.create_account') }}
        <template v-slot:secondaryText>
         {{ $t('landing.start_journey') }}
        </template>
      </form-header>
     <register-form></register-form>
      <div class="flex items-center justify-center">
      <p class="text-[#6C757D] text-[1.6rem]">{{ $t('landing.have_account_?') }} <router-link to="/landing/login"><button class="text-[#0D6EFD]">{{ $t('landing.login') }}</button></router-link></p>
      </div>
    </div>
  </div>
  <div v-if="!registrationModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="max-w-[54rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[8rem] pt-[5rem] pb-[7.5rem] bg-[#222030] rounded-[10px] z-50">
      <verify-email class="mb-[2rem] mt-[1.4rem]"></verify-email>
      <div class="flex flex-col text-center gap-[3.2rem] mb-[4rem]">
      <p class="text-[3.2rem] text-[#ffffff] font-medium">{{ $t('landing.thank_you') }}</p>
      <p class="text-[1.6rem] text-[#ffffff]">{{ $t('landing.check_email') }}</p>
      </div>
      <a href="https://mail.google.com/" style="width:100%"><basic-button type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">{{ $t('landing.go_to_email') }}</basic-button></a>
</div>
  </div>
</div>
</template>
