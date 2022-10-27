<template>
  <button @click="logoutHandle">Log Out</button>
</template>

<script>
import { useLoginStore } from '@/stores/LoginStore.js';
export default {
  
  setup(){

    const logout = useLoginStore();
    function logoutHandle(){
      logout.sendLogoutData();
    }


return {logoutHandle}
  }
  
}
</script>