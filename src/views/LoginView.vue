<script>
import FormHeader from "@/components/FormHeader.vue";
import LoginForm from "@/components/forms/LoginForm.vue";

import { useRouter } from "vue-router";
export default {
  name:"Login",
  components:{FormHeader,LoginForm},
  setup(){
    const router=useRouter();

    function modalHide(){
     return router.push({name:'landing'});
    }
    
    return {
      modalHide
    }
  }
}
</script>


<template>
    <div class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <form-header>
        {{ $t('landing.login_in_account') }}
        <template v-slot:secondaryText>
         {{ $t('landing.welcome_back') }}
        </template>
      </form-header>
     <login-form></login-form>
      <div class="flex items-center justify-center">
      <p class="text-[#6C757D] text-[1.6rem]">{{ $t('landing.no_account_?') }} <router-link :to="{name:'registration'}"><button class="text-[#0D6EFD]">{{ $t('landing.signup') }}</button></router-link></p>
      </div>
    </div>
  </div>
</template>
