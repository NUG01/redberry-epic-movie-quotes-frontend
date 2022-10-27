<template>
   <Form @submit="onSubmit" class="w-[36rem]">
      <basic-input rules='required|min:8|max:15|lower_case' name="password" type="password" placeholder="At least 8 & max.15 lower case characters" label="Password"/>
      <basic-input rules='required|confirmed:@password' name="confirm_password" type="password" placeholder="Confirm password" label="Confirm password"/>
       <div id="div" v-if="errors.length>0">
      <div @click="deleteError" class="cursor-pointer bg-[#dcb9bb] text-[#222030] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]"><div class="flex items-center justify-between"><p>{{ errors[0] }}</p><invalid-icon/></div></div>
      </div>
      <div class="flex mb-[3.2rem] mt-[2.4rem] justify-between">
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">Reset password</basic-button>
      </div>
      <div class="flex items-center justify-center">
      <router-link :to="{name:'login'}"><div class="flex items-center justify-center gap-[1rem]">
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
import { ref, computed } from 'vue';
import { useRecoverStore } from '@/stores/RecoverPasswordStore.js';
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
export default {
  components:{BasicInput,BasicButton,Form,BackArrow,useRouter,InvalidIcon},
    setup(){
    const recoverPassword = useRecoverStore();
    const router = useRouter();
     const errors=ref([]);

    function deleteError(el){
       el.target.closest('#div').remove();
       }
     errors.value = computed(() => {
    return recoverPassword.getRecoverPasswordErrors;
});

      const token=router.currentRoute.value.params;
      const email= router.currentRoute.value.query;
      function onSubmit(values){
        recoverPassword.sendRecoverData(values, token, email);
        recoverPassword.cleanErrors();
    }
    return {
    onSubmit,
    deleteError,
    errors:errors.value,
   }
  }
  }
</script>