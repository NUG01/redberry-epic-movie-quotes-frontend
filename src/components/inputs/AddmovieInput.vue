<script>
import { Field } from 'vee-validate';

export default {
  components:{Field},
  props:['inputName', 'placeholder', 'label', 'as', 'classLabel', 'rules', 'value', 'disabled'],
  setup(props){

    const rules=props.rules;
    const disabled=props.disabled;
    const inputName=props.inputName;
    const placeholder=props.placeholder;
    const label=props.label;
    const asField=props.as;
    const classLabel=props.classLabel;
    const value=props.value;


    return {inputName, placeholder, label, asField, classLabel, rules, value, disabled}
  }
  
}
</script>


<template>
<div class="w-[100%] relative">
  <label :for="inputName" class="text-[2rem] md:text-[1.6rem] text-[#6C757D] absolute right-0 -translate-y-1/2 mr-[1rem]" :class="classLabel">{{ label }}</label>
  <Field :value="value" :rules="rules" class="w-[100%] border-[#6C757D] border border-solid rounded-[5px] bg-inherit px-[17px] py-[9px] text-[2rem] md:text-[1.6rem] text-[#fff]"  
  :id="inputName"
  :name="inputName"
  :placeholder="placeholder"
  :as="asField"
  :disabled="disabled"
  />
</div>
  
</template>


<style scoped>
 input::placeholder,
 textarea::placeholder {
  font-weight: 400;
  font-size: 2rem;
  color:  #fff;
}
 input:disabled::placeholder {
   color:  rgb(113, 113, 113);
}
textarea {
  resize: none;
}
@media (max-width: 720px) {
  input::placeholder,
  textarea::placeholder {
   font-size: 1.6rem;
 }
  
  
}

</style>