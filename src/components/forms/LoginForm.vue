<template>
   <Form @submit="onSubmit" class="w-[36rem] mb-[3.2rem]">
      <basic-input rules='required|min:3' name="email" type="email" placeholder="Enter your email" label="Email"/>
      <basic-input rules='required' name="password" type="password" placeholder="At least 8 & max.15 lower case characters" label="Password"/>      
      <div class="flex mb-[1.6rem] mt-[1.6rem] justify-between">
        <remember-me></remember-me>
        <router-link to="/landing/forgot-password"><button @click="showForgetPassword" type="button" class="text-[#0D6EFD] text-[1.6rem]"><span>Forgot password</span></button></router-link>
      </div>
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">Get started</basic-button>
      <button type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] w-[100%] mt-[1.6rem] flex items-center justify-center gap-[0.8rem]">
      <google-symbol></google-symbol><span>Sign in with Google</span>
      </button>
      </Form>
</template>


<script>
import BasicInput from "@/components/BasicInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import RememberMe from "@/components/RememberMe.vue";
import GoogleSymbol from "@/components/icons/GoogleSymbol.vue";
import { Form } from 'vee-validate';
export default {
  components:{BasicInput,BasicButton, GoogleSymbol,Form,RememberMe},
   setup(){

    function onSubmit(values){
    }
    
    return {
    onSubmit
   }
  }

  
}
</script>