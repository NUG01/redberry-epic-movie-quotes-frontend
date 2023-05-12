<script>
import BasicInput from "@/components/BasicInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import RememberMe from "@/components/RememberMe.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import { Form } from 'vee-validate';
import { ref, computed } from 'vue';
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
import { useUserStore } from '@/stores/UserStore.js';
import { useRouter } from 'vue-router';
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/AuthStore.js";

export default {
  components:{BasicInput,BasicButton, GoogleIcon,Form,RememberMe,InvalidIcon},
   setup(){
    const login = useUserStore();
    const router = useRouter();
    const authStore = useAuthStore();

    const errors=ref(null);

       function deleteError(el){
       el.target.closest('ul').remove();
       }


function googleLogin(){
window.location.href=import.meta.env.VITE_API_BASE_URL+'auth/google/redirect';
}

  async function onSubmit(values){
    errors.value=null
    try{
      await axios.post('login', {name: values.name,password: values.password,})
    }catch(error){
         errors.value=error.response.data.error
         return;
    }
        const response= await axios.get('user');
        login.userData=response.data.user;
        authStore.authenticated = true;
        router.push({ name: 'news-feed'})
       }

    
    return {
    onSubmit,
    errors,
    deleteError,
    googleLogin
   }
  }

  
}
</script>


<template>
   <Form @submit="onSubmit" class="w-[36rem] sm:w-[32rem] mb-[3.2rem]">
      <basic-input rules='required|min:3' name="name" type="text" :placeholder="$t('landing.email_placeholder')" :label="$t('landing.email')"/>
      <basic-input rules='required' name="password" type="password" :placeholder="$t('landing.password_placeholder')" :label="$t('landing.password')"/>      
      <div class="flex mb-[1.6rem] mt-[1.6rem] justify-between">
        <remember-me></remember-me>
        <router-link :to="{name:'forgot-password'}"><button @click="showForgetPassword" type="button" class="text-[#0D6EFD] text-[1.6rem]"><span>{{ $t('landing.forgot_password') }}</span></button></router-link>
      </div>
       <ul v-if="errors!=null" class="flex flex-col gap-[1.2rem] mt-[1.8rem] mb-[2rem]">
        <li @click="deleteError" class="cursor-pointer bg-[#dcb9bb] text-[#222030] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]"><div class="flex items-center justify-between"><p>{{ errors }}</p><invalid-icon/></div>
        </li>
      </ul>
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">{{ $t('landing.get_started') }}</basic-button>      
      <button @click="googleLogin" type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] w-[100%] mt-[1.6rem] flex items-center justify-center gap-[0.8rem]">
      <google-icon></google-icon><span>{{ $t('landing.google_sign_in') }}</span>
      </button>
      </Form>
</template>
