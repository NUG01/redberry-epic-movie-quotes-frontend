<template>
   <Form @submit="onSubmit" class="w-[36rem] mb-[3.2rem]">
      <base-input rules='required|min:3|max:15|lower_case' name="name" type="text" placeholder="At least 3 & max.15 lower case characters" label="Name"/>
      <base-input rules='required|email|email_valid' name="email" type="email" placeholder="Enter your email" label="Email"/>
      <base-input rules='required|min:8|max:15|lower_case' name="password" type="password" placeholder="At least 8 & max.15 lower case characters" label="Password"/>
      <base-input rules='required|confirmed:@password' name="confirm_password" type="password" placeholder="Confirm password" label="Confirm password"/>
      <base-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px] mt-[2.4rem]" width="w-[100%]">Get started</base-button>
      <button type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] w-[100%] mt-[1.6rem] flex items-center justify-center gap-[0.8rem]">
      <google-symbol></google-symbol><span>Sign up with Google</span></button>
      </Form>
</template>


<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import GoogleSymbol from "@/components/icons/GoogleSymbol.vue";
import { Form } from 'vee-validate';                 
import { useRouter } from 'vue-router';
import { getJwtToken } from "@/helpers/jwt/index.js";
import { useRegisterStore } from '@/stores/RegisterStore.js';
export default {
  components:{BaseInput,BaseButton, GoogleSymbol,Form},
   setup(){
    const router=useRouter();
    const register = useRegisterStore();
      
      function onSubmit(values){
        register.fetchApi(values);
    }
    return {
    onSubmit,
   }
  }

  
}
</script>