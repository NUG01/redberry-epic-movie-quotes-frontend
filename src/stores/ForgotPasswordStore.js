import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useForgotPasswordStore = defineStore("useForgotPasswordStore",{
 state(){
  return{
      isReset:true,
  }
 },

   getters:{
    getIsReset: (state) => state.isReset,
 },



    actions:{
    
    changeStatus(){
      this.isReset=true;
    },


    sendForgotPasswordData(values){
      axios.post('forgot-password', {
        email: values.email
      })
      .then(()=>{
        this.isReset=false;
      })
      .catch((error)=> {
        alert(error);
      });
    },

 }
});
