<template>
   <Form @submit="onSubmit" class="w-[36rem]">
      <basic-input rules='required|min:8|max:15|lower_case' name="password" type="password" placeholder="At least 8 & max.15 lower case characters" label="Password"/>
      <basic-input rules='required|confirmed:@password' name="confirm_password" type="password" placeholder="Confirm password" label="Confirm password"/>

      <div class="flex mb-[3.2rem] mt-[2.4rem] justify-between">
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">Reset password</basic-button>
      </div>
      <div class="flex items-center justify-center">
      <router-link to="/landing/login"><div class="flex items-center justify-center gap-[1rem]">
        <back-arrow></back-arrow>
        <button type="button" class="text-[#6C757D] text-[1.6rem]">Back to log in</button>
      </div>
      </router-link>
      </div>
      </Form>
</template>


<script>
import BasicInput from "@/components/BasicInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import BackArrow from "@/components/icons/BackArrow.vue";
import { Form } from 'vee-validate';
import { useRouter } from 'vue-router';
import axios from "@/config/axios/index.js";
import { useRecoverStore } from '@/stores/RecoverPasswordStore.js';
export default {
  components:{BasicInput,BasicButton,Form,BackArrow,useRouter},
    setup(){
    const recover = useRecoverStore();
    const router = useRouter();

      const token=router.currentRoute.value.params;
      const email= router.currentRoute.value.query;
      function onSubmit(values){
        recover.sendRecoverData(values, token, email);
    }
    return {
    onSubmit,
   }
  }
  }
</script>