import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useForgotPasswordStore = defineStore("useForgotPasswordStore",{
 state(){
  return{
      isReset:true,
      errors:[],
  }
 },

   getters:{
    getIsReset: (state) => state.isReset,
    getForgotPasswordErrors: (state) => state.errors,
 },



    actions:{
    
    changeStatus(){
      this.isReset=true;
    },

    cleanErrors(){
      this.errors=[];
    },


    sendForgotPasswordData(values){
      axios.post('forgot-password', {
        email: values.email
      })
      .then(()=>{
        this.isReset=false;
      })
      .catch((error)=> {
        this.errors=[],
        this.errors.push(error.response.data.message)
      });
    },

 }
});
