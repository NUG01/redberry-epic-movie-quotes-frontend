<template>
   <Form @submit="onSubmit" class="w-[36rem]">
      <base-input rules='required|email|email_valid' name="email" type="email" placeholder="Enter your email" label="Email"/>      
      <div class="flex mb-[3.2rem] mt-[2.4rem] justify-between">
      <base-button type="submit" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]">Send instructions</base-button>
      </div>
      <router-link to="/landing/login"><div class="flex items-center justify-center gap-[1rem]">
        <back-arrow></back-arrow>
        <button type="button" class="text-[#6C757D] text-[1.6rem]">Back to log in</button>
      </div>
      </router-link>
      </Form>
</template>


<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import BackArrow from "@/components/icons/BackArrow.vue";
import { Form } from 'vee-validate';
import { ref } from 'vue';
export default {
  components:{BaseInput,BaseButton,Form,BackArrow},
   setup(){


    function onSubmit(values){
      console.log(values)
    }
    
    return {
    onSubmit
   }
  }
  }
</script>