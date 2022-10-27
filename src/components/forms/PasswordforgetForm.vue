<template>
   <Form @submit="onSubmit" class="w-[36rem]">
      <basic-input rules='required|email|email_valid' name="email" type="email" placeholder="Enter your email" label="Email"/>      
      <div id="div" v-if="errors.length>0">
      <div @click="deleteError" class="cursor-pointer bg-[#dcb9bb] text-[#222030] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]"><div class="flex items-center justify-between"><p>{{ errors[0] }}</p><invalid-icon/></div></div>
      </div>
      <div class="flex mb-[3.2rem] mt-[2.4rem] justify-between">
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">Send instructions</basic-button>
      </div>
      <router-link :to="{name:'login'}"><div class="flex items-center justify-center gap-[1rem]">
        <back-arrow></back-arrow>
        <button type="button" class="text-[#6C757D] text-[1.6rem]">Back to log in</button>
      </div>
      </router-link>
      </Form>
</template>


<script>
import BasicInput from "@/components/BasicInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import BackArrow from "@/components/icons/BackArrow.vue";
import { Form } from 'vee-validate';
import { ref, computed } from 'vue';
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
import { useForgotPasswordStore } from '@/stores/ForgotPasswordStore.js';
export default {
  components:{BasicInput,BasicButton,Form,BackArrow,InvalidIcon},
    setup(){
    const forgotPassword = useForgotPasswordStore();
    const errors=ref([]);

    function deleteError(el){
       el.target.closest('#div').remove();
       }
     errors.value = computed(() => {
    return forgotPassword.getForgotPasswordErrors;
});
      
      function onSubmit(values){
        forgotPassword.sendForgotPasswordData(values);
        forgotPassword.cleanErrors();
    }
    return {
    onSubmit,
    deleteError,
    errors:errors.value,
   }
  }
  }
</script>