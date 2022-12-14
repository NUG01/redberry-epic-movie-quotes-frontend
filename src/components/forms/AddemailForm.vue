<script>
import { Form, Field } from 'vee-validate';
import axios from "@/config/axios/index.js";

export default {
  components:{Form, Field},
  setup(props,context){

  function newEmailModal(){
    context.emit('EmailformClose');
  }

    async function newEmailHandle(values){
      const res= await axios.post('user/newEmail', values)
      context.emit('ProfileUpdated', res.data)
      context.emit('EmailformClose');
    }


    return {newEmailModal, newEmailHandle,}
  }
  
}
</script>


<template>
<div class="absolute top-0 left-0 w-[100vw] h-[100vh]">
<div @click="newEmailModal" class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-40"></div>
    <div class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11101A] w-[54rem] lsm:w-[100vw]">
    <div class="border-b border-b-solid border-b-[#ced4da34] w-[100%] px-[3.2rem] py-[2.4rem]">
      <p class="font-medium text-[2.4rem] text-[#fff]">{{ $t('newsFeed.add_new_email') }}</p>
    </div>
      <Form @submit="newEmailHandle" class="px-[4rem] pb-[2.4rem] pt-[4.2rem]">
        <div class="flex flex-col items-center mb-[5.4rem] gap-[8px]">
        <label for="new_email" class="text-[1.6rem] text-[#fff] self-start">{{ $t('newsFeed.new_email') }}</label>
        <Field name="new_email" type="email" id="new_email" rules="email|required" :placeholder="$t('newsFeed.enter_email')" class="w-[100%] h-[4.2rem] rounded-[4.8px] text-[1.6rem] pl-[17px]"/>
        </div>
        <div class="flex items-center justify-end gap-[3rem]">
          <p @click="newEmailModal" class="text-[#D9D9D9] text-[2rem] cursor-pointer">{{ $t("newsFeed.cancel") }}</p>
          <button type="submit" class="bg-[#E31221] px-[17px] py-[9px] rounded-[4.8px]"><p class="text-[2rem] text-[#fff]">{{ $t("newsFeed.add") }}</p></button>
        </div>
      </Form>
    </div> 
</div>
</template>