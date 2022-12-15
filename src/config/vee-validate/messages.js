import { configure, defineRule } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";
import { setLocale } from '@vee-validate/i18n';


configure({
  generateMessage: localize({
    en:{
      fields: {
        name: {
          required: 'The name field is required',
          min: 'The name field must be at least 0:{length} characters',
          max: 'The name field may not be greater than 0:{length} characters',
          lower_case_name: 'The name field must consist of lower case characters and numbers',
        },
        password: {
          required: 'The password field is required',
        },
        confirm_password: {
          required: 'Password confirmation is required',
        },
        email: {
          required: 'The email field is required',
          email: 'This field must be a valid email',
          email_valid: 'This email must be in a valid format',
        },
        password: {
          required: 'The password field is required',
          min: 'The password field must be at least 0:{length} characters',
          max: 'The password field may not be greater than 0:{length} characters',
          lower_case: 'The password field must consist of lower case characters and numbers',
        },
      }
    },

    
    ka:{
      fields: {
        name: {
          required: 'სახელის ველის შევსება აუცილებელია',
          min: 'სახელი უნდა შეიცავდეს მინიმუმ 0:{length} სიმბოლოს',
          max: 'სახელი არ უნდა შეიცავდეს 0:{length} სიმბოლოზე მეტს',
          lower_case: 'სახელი უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის სიმბოლოებს და რიცხვებს',
        },
        password: {
          required: 'პაროლის ველის შევსება აუცილებელია',
        },
        confirm_password: {
          required: 'პაროლის გამეორება აუცილებელია',
        },
        email: {
          required: 'ელ.ფოსტის ველი არის სავალდებულო',
          email: 'ველი უნდა შეიცავდეს ვალიდურ ელ.ფოსტას',
          email_valid: 'ელ.ფოსტა აუცილებლად უნდა იყოს ვალიდურ ფორმატში',
        },
        password: {
          required: 'პაროლის ველის შევსება აუცილებელია',
          min: 'პაროლი უნდა შეიცავდეს მინიმუმ 0:{length} სიმბოლოს',
          max: 'პაროლი არ უნდა შეიცავდეს 0:{length} სიმბოლოზე მეტს',
          lower_case_name: 'პაროლი უნდა იყოს დაბალი რეგისტრის და რიცხვებს',
        },
      }
    },
  }),
});
