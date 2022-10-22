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
  return 'Please use lowercase latin symbols and numbers';
}else{
  return true;
}
 });

const regexEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
defineRule('email_valid', value => {
if (value && !regexEmail.test(value)) {
  return 'Please use correct email address';
}else{
  return true;
}
 });