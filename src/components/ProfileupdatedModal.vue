<script>
import BasicButton from "@/components/BasicButton.vue";
import FormHeader from "@/components/FormHeader.vue";
import { useRouter } from "vue-router";


export default {
  components:{BasicButton, FormHeader},
  props:['user'],
  setup(props){
    const router = useRouter();
    const user = props.user;


   return {user, router}

  }
  
}
</script>

<template>
  <div class="absolute w-[100vw] h-[100vh] top-0 left-0">
       <div class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.54)] z-50" @click="router.go(0)"></div>
       <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center px-[12rem] py-[5.4rem] bg-[#222030] rounded-[10px] z-50">
      <form-header>
        {{ $t('newsFeed.profile_updated') }}
        <template v-slot:secondaryText>
         {{ $t('newsFeed.reload_page') }}<br><br><span v-if="!user.google_id">{{ $t('newsFeed.if_email_changed') }}<br>{{ $t('newsFeed.dont_forget_confirm') }}</span>
        </template>
      </form-header>
      <div class="flex items-center justify-center">
        <basic-button type="button" class="text-[white] text-[1.6rem] border border-solid bg-[#E31221] border-[#E31221] px-[25.5px] py-[7px] rounded-[4px]" width="w-[100%]" @click="router.go(0)">{{ $t('newsFeed.reload_page') }}</basic-button>
      </div>
       </div>
    </div>
</template>