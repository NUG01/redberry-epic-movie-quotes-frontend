<script>
import { useLoginStore } from '@/stores/LoginStore.js';
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
export default {
  name:'OAuth',
  components:{LoadingSpinner},
   setup(){

    const login = useLoginStore();
    const router = useRouter();

    onMounted(()=>{
      login.loginWithGoogle(router.currentRoute.value.query.token, router.currentRoute.value.query.expires_in);
    })


    return {}
   }

}
</script>


<template>
<div>
  <loading-spinner></loading-spinner>
</div>
</template>
