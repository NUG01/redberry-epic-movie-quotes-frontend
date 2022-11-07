<script>
import { Form } from 'vee-validate';
import BasicButton from "@/components/BasicButton.vue";
import AddmovieInput from "@/components/AddmovieInput.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";


export default {
  components:{Form, BasicButton, AddmovieInput, CloseIcon},
  setup(){



    return {}
  }
  
}
</script>


<template>
<div class="flex items-center justify-center">
<div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="modalHide"></div>
    <div class="fixed w-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11101A] rounded-[10px] z-50">
    <div class="flex items-center justify-center border-b border-b-solid border-b-[#f0f0f036] relative backdrop">
      <p class="text-[2.4rem] font-medium text-[#fff] pt-[3rem] pb-[2.4rem]">Add Movie</p>
      <close-icon class="absolute top-1/2 right-[3.6rem] cursor-pointer"/>
    </div>
     <Form class="w-[100%] p-[3rem] flex flex-col items-center justify-center gap-[2rem]">
      <div class="flex items-center self-start justify-center gap-[1.6rem]">
        <img src="/src/assets/TenenbaumsMovie.png" class="rounded-[100%] w-[6rem] h-[6rem]"/>
        <p class="text-[2rem] text-[#fff]">Nino Tabagari</p>
      </div>
      <addmovie-input inputName="name" placeholder="Movie name" label="Eng" classLabel="top-1/2"></addmovie-input>
      <addmovie-input inputName="nameGeo" placeholder="ფილმის სახელი" label="ქარ" classLabel="top-1/2"></addmovie-input>
      <addmovie-input inputName="director" placeholder="Director" label="Eng" classLabel="top-1/2"></addmovie-input>
      <addmovie-input inputName="directorGeo" placeholder="რეჟისორი" label="ქარ" classLabel="top-1/2"></addmovie-input>
      <addmovie-input as="textarea" inputName="description" placeholder="Movie description" label="Eng" classLabel="top-[2rem]"></addmovie-input>
      <addmovie-input as="textarea" inputName="descriptionGeo" placeholder="ფილმის აღწერა" label="ქარ" classLabel="top-[2rem]"></addmovie-input>


      <basic-button type="button" class="text-[#fff] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[5px] mt-[3.2rem] mb-[1.8rem]" width="w-[100%]">Add movie</basic-button>
     </Form>
    </div>
</div>
  
</template>



<style scoped>
.backdrop{
  backdrop-filter: blur(25px);
}
</style>