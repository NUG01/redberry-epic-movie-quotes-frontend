import { defineStore } from "pinia";

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


    fetchApi(values){
        fetch(`${import.meta.env.VITE_API_BASE_URL}register`, {
          method: "post",
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       },
     body: JSON.stringify({
       name: values.name,
       email: values.email,
       password: values.password,
       password_confirmation: values.confirm_password,
     })
   })
   .then(()=>{
    this.isRegistered=false;
   })
   .catch((error) => { 
     alert(error);
   });
    },

 }
});
