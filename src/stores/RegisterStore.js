import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useRegisterStore = defineStore("useRegisterStore",{
 state(){
  return{
      isRegistered:true,
      errors:[],
  }
 },

   getters:{
    getIsRegistered: (state) => state.isRegistered,
    getIsRegisteredErrors: (state) => state.errors,
 },



    actions:{
    
    changeStatus(){
      this.isRegistered=true;
    },
    cleanErrors(){
      this.errors=[];
    },


    sendRegisterData(values){
      axios.post('register', {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirm_password,
      })
      .then(()=>{
        this.isRegistered=false;
      })
      .catch((error)=> {
        this.errors=[];
        this.errors.push(error.response.data.errors.email[0]);
        this.errors.push(error.response.data.errors.name[0]);
      });
    },

 }
});
