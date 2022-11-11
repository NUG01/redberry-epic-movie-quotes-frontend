<script>
import { Form, Field } from 'vee-validate';
import { ref } from 'vue';
import BasicButton from "@/components/BasicButton.vue";
import AddmovieInput from "@/components/inputs/AddmovieInput.vue";
import CheckboxInput from "@/components/inputs/CheckBox.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import CloseCheckbox from "@/components/icons/CloseCheckbox.vue";
import basicAxios from "@/config/axios/BasicAxios.js";


export default {
  components:{Form, BasicButton, AddmovieInput, CloseIcon,CameraIcon, Field, CloseCheckbox,CheckboxInput },
  setup(props, context){
   const imageDisplay=ref('')
   const selectedFile=ref('')
   const genres=['Drama', 'Fantasy', 'Anime', 'Fighting','Psychological', 'Mystical', 'other']

function emitClose(){
  context.emit('emit-close');

}

function handleImageChange(ev){
  const file=ev.target.files[0]
  selectedFile.value=ev.target.files[0]

      const reader= new FileReader();
      reader.onload= () =>{
        imageDisplay.value=reader.result
      }
      reader.readAsDataURL(file)
    }

    function onSubmit(values){
      if(!imageDisplay.value){
        return;
      }
      const form=new FormData();
      form.append('thumbnail', selectedFile.value);
      form.append('genre', values.genre);
      form.append('name_en', values.name_en);
      form.append('name_ka', values.name_ka);
      form.append('director_en', values.director_en);
      form.append('director_ka', values.director_ka);
      form.append('description_en', values.description_en);
      form.append('description_ka', values.description_ka);
      basicAxios.post('movies',form)
    .then((res)=>{
      context.emit('emit-close');
    })
    .catch((err)=>{
      alert('Something went wrong!')
    })
  
    }

    function deleteGenre(el){
      el.target.closest('.checkboxWrapper').remove();
    }



    return {emitClose, imageDisplay, handleImageChange, onSubmit, deleteGenre, genres}
  }
  
}
</script>


<template>
<div class="flex items-center justify-center">
<div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="emitClose"></div>
    <div class="fixed w-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11101A] rounded-[10px] z-50">
    <div class="flex items-center justify-center border-b border-b-solid border-b-[#f0f0f036] relative backdrop">
      <p class="text-[2.4rem] font-medium text-[#fff] pt-[3rem] pb-[2.4rem]">Add Movie</p>
      <close-icon @click="emitClose" class="absolute top-1/2 right-[3.6rem] cursor-pointer"/>
    </div>
     <Form @submit="onSubmit" class="w-[100%] p-[3rem] flex flex-col items-center justify-center gap-[2rem]" enctype="multipart/form-data">
      <div class="flex items-center self-start justify-center gap-[1.6rem]">
        <img src="/src/assets/TenenbaumsMovie.png" class="rounded-[100%] w-[6rem] h-[6rem]"/>
        <p class="text-[2rem] text-[#fff]">Nino Tabagari</p>
      </div>
      
      <addmovie-input rules="required" inputName="name_en" placeholder="Movie name" label="Eng" classLabel="top-1/2"></addmovie-input>
      <addmovie-input rules="required" inputName="name_ka" placeholder="ფილმის სახელი" label="ქარ" classLabel="top-1/2"></addmovie-input>
      
      <div class="w-[100%] min-h-[5rem] border-[#6C757D] border border-solid rounded-[5px] bg-inherit px-[17px] py-[9px] text-[2rem] flex items-center gap-[1rem] overflow-y-scroll scrollHide">
      <checkbox-input rules="required" v-for="genre in genres" :key="genre" :genreValue="genre"></checkbox-input>
      </div>
      
      <addmovie-input rules="required" inputName="director_en" placeholder="Director" label="Eng" classLabel="top-1/2"></addmovie-input>
      <addmovie-input rules="required" inputName="director_ka" placeholder="რეჟისორი" label="ქარ" classLabel="top-1/2"></addmovie-input>
      <addmovie-input rules="required" as="textarea" inputName="description_en" placeholder="Movie description" label="Eng" classLabel="top-[2rem]"></addmovie-input>
      <addmovie-input rules="required" as="textarea" inputName="description_ka" placeholder="ფილმის აღწერა" label="ქარ" classLabel="top-[2rem]"></addmovie-input>
      
      <div class="w-[100%] h-[100%] relative py-[2.7rem] px-[1.8rem] border-[#6C757D] border border-solid rounded-[5px] bg-inherit">
        <div class="flex items-center gap-[1.2rem]">
          <camera-icon></camera-icon>
          <div class="text-[2rem] text-[#fff] font-normal flex items-center justify-start gap-[8px]"><p>Drag & drop your image here or <span class="bg-[#9747ff36] rounded-[2px] p-[1rem]">Choose file</span></p></div>
        </div>
        <img v-if="imageDisplay" :src="imageDisplay" class="h-[100%] max-w-[20%] rounded-[5px] absolute top-0 right-0" />
      <input @change="handleImageChange" type="file" class="z-50 w-[100%] h-[100%] cursor-pointer absolute top-0 left-0 opacity-0" />
      </div>

      <basic-button type="submit" class="text-[#fff] text-[2rem] border border-solid bg-[#E31221] border-[#E31221] px-[17px] py-[9px] rounded-[5px] mt-[3.2rem] mb-[1.8rem]" width="w-[100%]">Add movie</basic-button>
     </Form>
    </div>
</div>
  
</template>



<style scoped>
.backdrop{
  backdrop-filter: blur(25px);
}
.scrollHide::-webkit-scrollbar {
  display: none;
}

.scrollHide {
  scrollbar-width: none;  
}
</style>