<script>
import FormHeader from "@/components/FormHeader.vue";
import PasswordrecoverForm from "@/components/forms/PasswordrecoverForm.vue";
import { useRouter } from "vue-router";
import { ref } from 'vue';
import VerifiedTick from "@/components/icons/VerifiedTick.vue";
import BasicButton from "@/components/BasicButton.vue";
export default {
  name:"RecoverPassword",
  emits:['isRecovered'],
  components:{FormHeader,PasswordrecoverForm, VerifiedTick, BasicButton},
  setup(){
    const router=useRouter();
    const recoverModal=ref(true);

    function changeRecoverStatus(){
    recoverModal.value=false

  }

   setTimeout(() => {
     recoverModal.value=true
    }, "3600")

    function modalHide(){
     return router.push({name:'landing'});
    }

   
    
    return {
      modalHide,
      recoverModal,
      changeRecoverStatus
    }
  }
}
</script>



<template>

<div>
  <div v-if="recoverModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
       <form-header>
        Create new password
        <template v-slot:secondaryText>
         Your new password must be different from<br>
previous used passwords
        </template>
      </form-header>
     <passwordrecover-form @is-recovered="changeRecoverStatus"></passwordrecover-form>
    </div>
  </div>
  <div v-if="!recoverModal" class="flex items-center justify-center">
    <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="max-w-[54rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[8rem] pt-[5rem] pb-[6rem] bg-[#222030] rounded-[10px] z-50">
      <verified-tick class="mb-[2rem] mt-[1.4rem]"></verified-tick>
      <div class="flex flex-col text-center gap-[2rem] mb-[3rem]">
      <p class="text-[3.2rem] text-[#ffffff] font-medium">Success!</p>
      <p class="text-[1.6rem] text-[#ffffff]">Your Email changed successfully</p>
      </div>
      <router-link :to="{name:'login'}" style="width:100%"><basic-button type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[7rem] py-[7px] rounded-[4px]" width="w-[100%]">Go to my news feed</basic-button></router-link>
</div>
  </div>
</div>
</template>
