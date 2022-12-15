import { defineRule } from "vee-validate"; 
import { required, email, min, max, confirmed } from "@vee-validate/rules"; 
import i18n from "@/config/i18n/index.js";
import { ref } from "vue";


defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);

const regexNum=/^[0-9]*$/;
const regexLetter=/^[a-z]*$/;
defineRule('lower_case', value => {
  const locale=ref(i18n.global.locale)
 
if (value && !(regexNum.test(value) || regexLetter.test(value))) {
  if(locale=='en'){
    return 'The password field must consist of lower case and latin characters';
    
  }else if(locale=='ka'){
    return 'პაროლი უნდა იყოს დაბალი რეგისტრის და ლათინურად';

  }
}else{
  return true;
}
 });
defineRule('lower_case_name', value => {
if (value && !(regexNum.test(value) || regexLetter.test(value))) {
  if(locale=='en'){
    return 'The name field must consist of lower case and latin characters';
    
  }else if(locale=='ka'){
    return 'სახელი უნდა იყოს დაბალი რეგისტრის და ლათინურად';

  }
}else{
  return true;
}
 });

const regexSpecialCharacters=/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
const regexEnglish=/^[A-Za-z0-9 ]*$/;
defineRule('eng_alphabet', value => {
  if (value && !regexEnglish.test(value) && !regexSpecialCharacters.test(value)) {
    if(locale=='en'){
      return 'Please use latin symbols and numbers';      
    }else if(locale=='ka'){
      return 'გამოიყენეთ ლათინური სიმბოლოები';
  
    }
  }else{
    return true;
  }
});

const regexGeorgian=/^[ა-ჰ-0-9 ]*$/;
defineRule('geo_alphabet', value => {
if (value && !regexGeorgian.test(value) && !regexSpecialCharacters.test(value)) {
  if(locale=='en'){
    return 'Please use Georgian symbols and numbers';
  }else if(locale=='ka'){
    return 'გამოიყენეთ ქართული სიმბოლოები და რიცხვები';

  }
}else{
  return true;
}
 });

const regexEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
defineRule('email_valid', value => {
  if(locale=='en'){
    return 'This email must be in a valid format';
  }else if(locale=='ka'){
    return 'ელ.ფოსტა უნდა იყოს ვალიდურ ფორმატში';

  }else{
    return true;
  }

 });