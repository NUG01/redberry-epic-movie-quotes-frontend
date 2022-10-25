import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useRegisterStore = defineStore("useRegisterStore",{
 state(){
  return{
      isRegistered:true,
  }
 },

   getters:{
    getIsRegistered: (state) => state.isRegistered,
 },



    actions:{
    
    changeStatus(){
      this.isRegistered=true;
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
        alert(error);
      });
    },

 }
});
