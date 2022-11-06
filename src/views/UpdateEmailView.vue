<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";

export default {
  name:'UpdateEmailProfile',
  components:{LoadingSpinner},

  setup(){

    const router=useRouter();

    onMounted(()=>{
      axios.post('update-email', {
        token: router.currentRoute.value.params.id,
        email: router.currentRoute.value.query.email
      })
      .then((res)=>{
        router.push({name: 'news-feed'});
      })
      .catch((err)=>{
         alert('Something went wrong, Go back!')
      })
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
