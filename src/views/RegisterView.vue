<template>
  <div class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <form-header>
        Create an account
        <template v-slot:secondaryText>
         Start your journey!
        </template>
      </form-header>
     <register-form></register-form>
      <div class="flex items-center justify-center">
      <p class="text-[#6C757D] text-[1.6rem]">Already have an account? <router-link to="/landing/login"><button class="text-[#0D6EFD]">Log in</button></router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import FormHeader from "@/components/FormHeader.vue";
import RegisterForm from "@/components/forms/RegisterForm.vue";
import { useRouter } from "vue-router";
export default {
  name:"registration",
  components:{FormHeader,RegisterForm},
  setup(){
    const router=useRouter();

    function modalHide(){
     return router.push('/landing');
    }
    
    return {
      modalHide
    }
  }
}
</script>