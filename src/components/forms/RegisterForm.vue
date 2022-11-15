<script>
import BasicInput from "@/components/BasicInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
import { Form } from 'vee-validate';                 
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useRegisterStore } from '@/stores/RegisterStore.js';
export default {
  components:{BasicInput,BasicButton, GoogleIcon,Form,InvalidIcon},
   setup(){
    const router=useRouter();
    const register = useRegisterStore();

    const errors=ref([]);

       function deleteError(el){
       el.target.closest('li').remove();
       register.cleanErrors;
       }
     errors.value = computed(() => {
    return register.getIsRegisteredErrors;
});

function googleRegister(){
window.location.href=import.meta.env.VITE_API_BASE_URL+'auth/google/redirect';
}


      
      function onSubmit(values){
        register.sendRegisterData(values);
       register.cleanErrors();
    }
    return {
    onSubmit,
    errors:errors.value,
    deleteError,
    googleRegister
   }
  }

  
}
</script>


<template>
   <Form @submit="onSubmit" class="w-[36rem] mb-[3.2rem]">
      <basic-input rules='required|min:3|max:15|lower_case' name="name" type="text" :placeholder="$t('landing.name_placeholder')" :label="$t('landing.name')"/>
      <basic-input rules='required|email|email_valid' name="email" type="email" :placeholder="$t('landing.email_placeholder')" :label="$t('landing.email')"/>
      <basic-input rules='required|min:8|max:15|lower_case' name="password" type="password" :placeholder="$t('landing.password_placeholder')" :label="$t('landing.password')"/>
      <basic-input rules='required|confirmed:@password' name="confirm_password" type="password" :placeholder="$t('landing.confirm_password')" :label="$t('landing.confirm_password')"/>
      <ul v-if="errors" class="flex flex-col gap-[1.2rem] mt-[1.8rem]">
        <li @click="deleteError" class="cursor-pointer bg-[#dcb9bb] text-[#222030] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]" v-for="(error,index) in errors" :key="index"><div class="flex items-center justify-between"><p>{{ error }}</p><invalid-icon/></div>
        </li>
      </ul>
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px] mt-[2rem]" width="w-[100%]">{{ $t('landing.get_started') }}</basic-button>
      <button @click="googleRegister" type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] w-[100%] mt-[1.6rem] flex items-center justify-center gap-[0.8rem]">
      <google-icon></google-icon><span>{{ $t('landing.google_sign_in') }}</span></button>
      </Form>
</template>



<style scoped>
.color{
  color:#dcb9bb;
}
</style>