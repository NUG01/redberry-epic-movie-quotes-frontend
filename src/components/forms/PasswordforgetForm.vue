<script>
import BasicInput from "@/components/BasicInput.vue";
import BasicButton from "@/components/BasicButton.vue";
import BackArrow from "@/components/icons/BackArrow.vue";
import { Form } from 'vee-validate';
import { ref } from 'vue';
import axios from "@/config/axios/index.js";
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
export default {
  components:{BasicInput,BasicButton,Form,BackArrow,InvalidIcon},
    setup(props,context){
    const errors=ref([]);

    function deleteError(el){
       el.target.closest('#div').remove();
       }
      
      function onSubmit(values){
        axios.post('forgot-password', {
        email: values.email
      })
      .then(()=>{
        context.emit('isReset')
      })
      .catch((error)=> {
        errors.value=[],
        errors.value.push(error.response.data.message)
      })
      errors.value=[];
    }

    return {
    onSubmit,
    deleteError,
    errors,
   }
  }
  }
</script>


<template>
   <Form @submit="onSubmit" class="w-[36rem] sm:w-[32rem]">
      <basic-input rules='required|email|email_valid' name="email" type="email" :placeholder="$t('landing.email_placeholder')" :label="$t('landing.email')"/>      
      <div id="div" v-if="errors.length>0">
      <div @click="deleteError" class="cursor-pointer bg-[#dcb9bb] text-[#222030] text-[1.6rem] px-[7px] py-[4px] rounded-[4px]"><div class="flex items-center justify-between"><p>{{ errors[0] }}</p><invalid-icon/></div></div>
      </div>
      <div class="flex mb-[3.2rem] mt-[2.4rem] justify-between">
      <basic-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">{{ $t('landing.send_instructions') }}</basic-button>
      </div>
      <router-link :to="{name:'login'}"><div class="flex items-center justify-center gap-[1rem]">
        <back-arrow></back-arrow>
        <button type="button" class="text-[#6C757D] text-[1.6rem]">{{ $t('landing.back_login') }}</button>
      </div>
      </router-link>
      </Form>
</template>

