<script>
import { Field, ErrorMessage } from 'vee-validate';
import { computed, ref,watch} from 'vue';
import PasswordHidden from "@/components/icons/PasswordHidden.vue";
import InvalidIcon from "@/components/icons/InvalidIcon.vue";
import ValidIcon from "@/components/icons/ValidIcon.vue";
import InputSuffix from "@/components/icons/InputSuffix.vue";
export default {
  props: ['name','type','placeholder','label', 'rules'],
  components:{Field, ErrorMessage, PasswordHidden,InvalidIcon,ValidIcon,InputSuffix},
  setup(props,context){


  const rules=props.rules;
  const label=props.label;
  const inputName=props.name;
  const inputType=props.type;
  const inputText=props.placeholder;
  const validate=props.validate;

        
  const noState=ref(false);
  const validState=ref(false);

  function getSuffix(){
    document.getElementById(inputName).classList.remove('inpError')
    document.getElementById(inputName).classList.remove('inpValid')
    noState.value=false;
    validState.value=fal
  }

  function addErrors(){
      noState.value=true;
      validState.value=false
      document.getElementById(inputName).classList.remove('inpValid')
      document.getElementById(inputName).classList.add('inpError')
  }

  function stateChange(value){
    if(document.getElementById(`${inputName}Error`)){
        addErrors();
    }else if(!value.target.value){
        addErrors();
        return;
    }else{
      noState.value=false;
      document.getElementById(inputName).classList.remove('inpError')
      document.getElementById(inputName).classList.add('inpValid')
      validState.value=true
  }
}

    return {
      inputName,
      inputType,
      inputText,
      label,
      rules,
      stateChange,
      noState,
      validState};
  }
}
</script>



<template>
  <div class="flex flex-col w-[100%] mb-[1.6rem] relative">
    <label :for="inputName" class="text-[1.6rem] text-[#ffffff] mb-[0.8rem]">{{ label }}<span class="text-[#DC3545]"> *</span></label>
    <div class="relative">
    <Field @blur="stateChange" :rules="rules" :type="inputType" :name="inputName" :id="inputName" :placeholder="inputText" 
    class="border border-[#CED4DA] border-solid text-[#232323] text-[1.6rem] px-[13px] py-[7px] rounded-[4px] bg-[#CED4DA] w-[100%] focus:outline-none focus:shadow-focus-shadow disabled:bg-[#E9ECEF]"/>
    <password-hidden v-if="inputType=='password' && (!noState && !validState)" class="absolute top-1/2 right-0 -translate-x-3/4 -translate-y-1/2"></password-hidden>
    <invalid-icon v-if="noState" class="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2"></invalid-icon>
    <valid-icon v-if="validState" class="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2"></valid-icon>    </div>
  <ErrorMessage :id="`${inputName}Error`" style="color:#DC3545;font-size:14px;margin-top:4px" :name="inputName"/>
  </div>
</template>



<style scoped>
.error{
  color: #F15524;
  font-size: 1.6rempx;
  margin-left: 2rem;
  margin-top: 0.3rem;
}
.inpError{
   border:1.4px solid #E31221;
}
.inpValid{
   border:1.4px solid #198754;
}
 input::placeholder {
  font-weight: 400;
  font-size: 1.6rem;
  color:  #6C757D;
}
 input:disabled::placeholder {
  color:  rgba(108, 117, 125, 0.3);
}
</style>