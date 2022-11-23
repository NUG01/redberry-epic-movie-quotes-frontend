import { defineStore } from "pinia";

export const useLoginStore = defineStore("useLoginStore",{
 state(){
  return{
      isLogged:false,
      dataIsFetched:false,
      usersIsFetched:false,
      userData:null,
      allUser:null,
      isGoogleLogged:false,
      googleData:null,
      isLoggedOut:true,
      errors:[],
  }
 },

   getters:{
    getIsLogged: (state) => state.isLogged,
    getDataIsFetched: (state) => state.dataIsFetched,
    getUsersIsFetched: (state) => state.usersIsFetched,
    getIsLoggedOut: (state) => state.isLoggedOut,
    getIsGoogleLogged: (state) => state.isLogged,
    getUserData: (state)=>state.userData,
    getAllUser: (state)=>state.allUser,
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
    changeUsersFetchedStatus(){
      this.usersIsFetched=true
    },

    updateUserData(data){
        this.userData=data
    },          
    updateAllUserData(data){
        this.allUser=data
    },          

    deleteCookie(){
        this.isGoogleLogged=false;
        this.userData=null;
        this.isLogged=false,
        this.router.push({ name: 'landing' })
    },

 }
});
