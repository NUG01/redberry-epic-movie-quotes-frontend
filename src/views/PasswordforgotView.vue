<template>
  <div class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
       <form-header>
        Forgot password?
        <template v-slot:secondaryText>
         Enter the email and we’ll send an email with
        </template>
      </form-header>
     <passwordforget-form></passwordforget-form>
    </div>
  </div>
</template>

<script>
import FormHeader from "@/components/FormHeader.vue";
import PasswordforgetForm from "@/components/forms/PasswordforgetForm.vue";
import { useRouter } from "vue-router";
export default {
  name:"forgot-password",
  components:{FormHeader,PasswordforgetForm},
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