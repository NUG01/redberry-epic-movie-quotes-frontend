import { defineRule } from "vee-validate"; // npm install vee-validate --save
import { required, email, min, max, confirmed } from "@vee-validate/rules"; // npm install @vee-validate/rules

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);

const regexName=/^[a-z-0-9]*$/;
const regexNum=/^[0-9]*$/;
const regexLetter=/^[a-z]*$/;
defineRule('lower_case', value => {
if (value && !regexName.test(value) || regexNum.test(value) || regexLetter.test(value)) {
  return 'The password field must consist of lower case characters';
}else{
  return true;
}
 });

const regexEnglish=/^[A-Za-z0-9 ]*$/;
defineRule('eng_alphabet', value => {
  if (value && !regexEnglish.test(value)) {
    return 'Please use latin symbols and numbers';
  }else{
    return true;
  }
});

const regexGeorgian=/^[ა-ჰ-0-9 ]*$/;
defineRule('geo_alphabet', value => {
if (value && !regexGeorgian.test(value)) {
  return 'Please use Georgian symbols and numbers';
}else{
  return true;
}
 });

const regexEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
defineRule('email_valid', value => {
if (value && !regexEmail.test(value)) {
  return 'This email must be in a valid format';
}else{
  return true;
}
 });