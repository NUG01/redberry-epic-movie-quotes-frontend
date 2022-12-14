<script>
import { Field, ErrorMessage } from 'vee-validate';
import { computed, ref} from 'vue';
import PasswordHidden from "@/components/icons/PasswordHidden.vue";
import ProfileinvalidIcon from "@/components/icons/ProfileinvalidIcon.vue";
import ProfilevalidIcon from "@/components/icons/ProfilevalidIcon.vue";
import InputSuffix from "@/components/icons/InputSuffix.vue";
export default {
  props: ['name','type','placeholder','label', 'rules', 'value', 'disabled', 'vModel', 'width'],
  components:{Field, ErrorMessage, PasswordHidden,ProfileinvalidIcon,ProfilevalidIcon,InputSuffix},
  setup(props,context){


  const rules=props.rules;
  const disabled=props.disabled;
  const label=props.label;
  const inputName=props.name;
  const inputType=props.type;
  const inputText=props.placeholder;
  const validate=props.validate;
  const value=props.value;
  const width=props.width;

 const vModel= computed(()=>{
       return props.vModel
  })
        
  const noState=ref(false);
  const validState=ref(false);



  function addErrors(){
      noState.value=true;
      validState.value=false
      document.getElementById(inputName).classList.remove('inpValid')
      document.getElementById(inputName).classList.add('inpError')
  }

  function showPassword(){
    document.getElementById('password').type='text'

  }
  function hidePassword(){
    document.getElementById('password').type='password'

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
      validState,
      showPassword,
      hidePassword,
      disabled,
      width
      
      };
  }
}
</script>



<template>
  <div class="flex flex-col mb-[1.6rem] relative" :class="width">
    <label :for="inputName" class="text-[1.6rem] text-[#ffffff] mb-[0.8rem] md:mb-[0px]">{{ label }}</label>
    <div class="relative">
    <Field @blur="stateChange" v-model="vModel" :rules="rules" :class="disabled" :type="inputType" :name="inputName" :id="inputName" :placeholder="inputText"
    class="md:bg-inherit md:text-[#fff] md:border-b md:border-b-solid md:border-b-[#ced4da80] md:border-x-0 md:border-t-0 border md:rounded-[0px] border-[#CED4DA] border-solid text-[#232323] text-[1.6rem] px-[13px] py-[7px] rounded-[4px] bg-[#CED4DA] w-[100%] focus:outline-none focus:shadow-focus-shadow font-medium disabled:bg-[#E9ECEF]"/>
    <password-hidden @mouseenter="showPassword" @mouseleave="hidePassword" v-if="inputType=='password' && (!noState && !validState)" class="absolute top-1/2 right-0 -translate-x-3/4 -translate-y-1/2"></password-hidden>
    <profileinvalid-icon v-if="noState" class="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2"></profileinvalid-icon>
    <profilevalid-icon v-if="validState" class="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2"></profilevalid-icon>    
    </div>
  <ErrorMessage :id="`${inputName}Error`" style="color:#EC9524;font-size:14px;margin-top:4px;" :name="inputName"/>
  </div>
</template>



<style scoped>
.inpError{
   border:1.4px solid #EC9524;
  background-color: #ec952234;
  color:#fff;
}
.inpValid{
  color:#fff;
  border:1.4px solid #198754;
  background-color: #19875434;
}
 input::placeholder {
  font-weight: 400;
  font-size: 1.6rem;
  color:  #6C757D;
}
 input:disabled::placeholder {
  color:  rgba(108, 117, 125, 0.3);
}
@media (max-width: 920px) {
   input::placeholder {
  font-weight: 400;
  font-size: 1.6rem;
  color:  #fff;
}
 input:disabled::placeholder {
  color:  rgba(108, 117, 125, 0.3);
}

}
</style>