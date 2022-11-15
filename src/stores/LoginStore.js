import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import {setJwtToken} from "@/helpers/jwt/index.js";

export const useLoginStore = defineStore("useLoginStore",{
 state(){
  return{
      isLogged:false,
      dataIsFetched:false,
      userData:null,
      isGoogleLogged:false,
      googleData:null,
      isLoggedOut:false,
      errors:[],
  }
 },

   getters:{
    getIsLogged: (state) => state.isLogged,
    getDataIsFetched: (state) => state.dataIsFetched,
    getIsLoggedOut: (state) => state.isLoggedOut,
    getIsGoogleLogged: (state) => state.isLogged,
    getUserData: (state)=>state.userData,
    getIsLoggedErrors: (state) => state.errors,
 },



    actions:{
    
    changeStatus(){
      this.isLogged=true;
    },
    changeLogoutStatus(){
      this.isLoggedOut=true;
    },
    cleanErrors(){
      this.errors=[];
    },
    changeFetchedStatus(){
      this.dataIsFetched=true
    },


    sendLoginData(values){
      axios.post('login', {
        name: values.name,
        password: values.password,
      })
      .then((response)=>{
        setJwtToken(response.data.access_token, response.data.expires_in);
        this.isLogged=true;
        this.userData=response.data.userData;
        this.changeFetchedStatus();
        this.router.push({ name: 'news-feed'})
      })
      .catch((error)=> {
        this.errors.push(error.response.data.error);
      })
    },

    updateUserData(data){
        this.userData=data
    },          

    loginWithGoogle(token, expires_in){
      setJwtToken(token, expires_in);
      this.isGoogleLogged=true;
      this.router.push({ name: 'news-feed' })
    },

    deleteCookie(){
      document.cookie = 'jwt_token' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.isLoggedOut=true;
        this.isGoogleLogged=false;
        this.userData=null;
        this.isLogged=false,
        this.router.push({ name: 'landing' })
    },

    sendLogoutData(){
      axios.post('logout')
      .then(()=>{
         this.deleteCookie()
        })
        .catch(()=> {
        this.deleteCookie()
        
      });
    },

 }
});
