<template>

  <div class="flex flex-col w-[100%] mb-[1.6rem] relative">
    <label :for="inputName" class="text-[1.6rem] text-[#ffffff] mb-[0.8rem]">{{ label }}<span class="text-[#DC3545]"> *</span></label>
    <div class="relative">
    <Field :value="val" :rules="rules" :type="inputType" :name="inputName" :id="inputName" :placeholder="inputText" 
    class="border border-[##CED4DA] border-solid text-[#232323] text-[1.6rem] px-[13px] py-[7px] rounded-[4px] bg-[#CED4DA] w-[100%]"/>
   <password-hidden v-if="inputType=='password'" class="absolute top-1/2 right-0 -translate-x-3/4 -translate-y-1/2"></password-hidden>
    </div>
  <ErrorMessage style="color:#F15524;font-size:16px;margin-left:2rem" :name="inputName"/>
  </div>

</template>


<script>
import { Field, ErrorMessage } from 'vee-validate';
import { computed} from 'vue';
import PasswordHidden from "@/components/icons/PasswordHidden.vue";
export default {
  props: ['name','type','placeholder','label', 'rules'],
  components:{Field, ErrorMessage, PasswordHidden},
  setup(props,context){

        const rules=props.rules;
        const label=props.label;
        const inputName=props.name;
        const inputType=props.type;
        const inputText=props.placeholder;

        
        const val = computed((value) => localStorage.getItem(inputName));

    return {inputName,inputType,inputText,label,rules,val};
  }
}
</script>




<style scoped>
.error{
  color: #F15524;
  font-size: 16px;
  margin-left: 2rem;
  margin-top: 0.3rem;
}
 input::placeholder {
  font-weight: 400;
  font-size: 1.6rem;
  color:  #6C757D;
}
</style>