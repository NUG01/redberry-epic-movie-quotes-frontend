<script>
import { Field } from "vee-validate";
import CloseCheckbox from "@/components/icons/CloseCheckbox.vue";

export default {
  props:['genreValue', 'rules', 'id'],
  components:{Field, CloseCheckbox},

  setup(props){
    const genreValue=props.genreValue
    const rules=props.rules
    const id=props.id


     function deleteGenre(el){
      el.target.closest('.checkboxWrapper').remove();
    }

    function addColor(){
      document.querySelector(`.${genreValue}`).classList.toggle('color')
    }

 


    return {genreValue, deleteGenre, addColor, rules, id}
  }
  
}
</script>


<template>
<div class="checkboxWrapper bg-[#6C757D]">
      <Field v-slot="{ field }" :rules="rules" name="genre" type="checkbox" :value="id">
        <div class="rounded-[2px] inline-block relative h-full">
          <div class="flex items-center justify-center">
           <label @click="addColor" :for="genreValue" :class="genreValue" class="w-[100%] h-[100%] text-[2rem] text-[#fff] cursor-pointer px-[1rem]">{{ genreValue }}</label>
           <close-checkbox @click="deleteGenre" class="cursor-pointer"/>
           <input :rules="rules" type="checkbox" :id="genreValue" name="genre" class="opacity-0 absolute top-0 left-0 cursor-pointer" v-bind="field" :value="id" />
          </div>
        </div>
      </Field>
</div>
</template>

<style scoped>
.color{
  color:rgb(60, 22, 44) !important;
    text-shadow: 0 0 2px rgb(159, 124, 211) !important;
}
</style>.
