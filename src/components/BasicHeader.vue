<script>
import { ref, onMounted } from "vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import BasicButton from "@/components/BasicButton.vue";
import LanguageDropdown from "@/components/LanguageDropdown.vue";
import { useUserStore } from '@/stores/UserStore.js';
import HeaderMenu from "@/components/icons/HeaderMenu.vue";
import NotificationComment from "@/components/icons/NotificationComment.vue";
import NotificationLike from "@/components/icons/NotificationLike.vue";
import BasicNavigation from "@/components/BasicNavigation.vue";
import NotificationsModal from "@/components/NotificationsModal.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/AuthStore.js";
import SearchIcon from "@/components/icons/HeaderSearch.vue";
import SearchArrow from "@/components/icons/SearchArrow.vue";
import BellIcon from "@/components/icons/BellIcon.vue";





export default {
  emits:['closeMenu', 'logoutMenu', 'notificationLength'],
  props:['search'],
  components:{LanguageDropdown,BasicButton,NotificationsModal, NotificationIcon, NotificationComment, NotificationLike, HeaderMenu, BasicNavigation, SearchIcon, BellIcon, SearchArrow},
  setup(props, context){

    const login=useUserStore();
    const router = useRouter();
    const authStore = useAuthStore();

    const search=props.search


    const notificationModal=ref(false);
    const valuesFetched=ref(false);
    const sideMenuShow=ref(false);
    const searchShow=ref(false);
    const newNotifications=ref(false);
    const notificationsLength=ref(null)
    const user=ref([])


onMounted(()=>{
  user.value=login.getUserData
  valuesFetched.value=true

})

      function notificationShow(){
        notificationModal.value=!notificationModal.value
        notificationsLength.value=0
      }
      function notificationLength(){
        notificationsLength.value++
      }

     async function logoutHandle(){
     await axios.post('logout')
     authStore.authenticated = false;
     router.push({ name: 'landing'})
    }


    function sideMenuOpen(){
      sideMenuShow.value=true
    }
    function searchSubmit(locale, event){
      const payload={
        locale:locale,
        event:event
      }
        context.emit('headerSearch', payload)
        searchShow.value=false
    }

        return {
        logoutHandle,
        notificationModal,
        notificationShow,
        notificationsLength,
        notificationLength,
        valuesFetched,
        sideMenuOpen,
        sideMenuShow,
        user,
        search,
        searchSubmit,
        searchShow,
        
        
        
        }
  }
}
</script>




<template>
<div class="relative w-[100vw] h-[8rem] md:h-[7rem] flex items-center justify-center bg-[#222030]">
  <div v-if="valuesFetched" class="hidden -translate-x-full md:translate-x-0 absolute top-0 left-0 w-[100vw] min-h-[100vh] bg-[#11101A] md:block z-40" v-show="sideMenuShow">
      <basic-navigation @close-menu="sideMenuShow=false" @logout-menu="logoutHandle" :user="user" feed="#fff" movies="#fff" profile="border-none" medium="mt-[4.5rem]" :logout="true"></basic-navigation>
    </div>
  <div class="absolute top-0 left-0 w-[100vw] z-10">
  <header class="absolute top-0 left-0 w-[100%] h-[auto] px-[7rem] lg:pr-[5rem] lg:pl-[5rem] md:pr-[5rem] md:pl-[3rem] md:px-0 flex items-center justify-between py-[2rem]">
    <div class="uppercase font-medium text-[1.6rem] text-[#DDCCAA] md:hidden">movie quotes</div>
    <div class="hidden md:block" @click="sideMenuOpen"><header-menu></header-menu></div>
    <div class="flex gap-[1.6rem]">
      <div class="flex items-center justify-center relative md:static md:w-[100%]">
        <div v-show="searchShow" class="absolute top-0 left-0 bg-[#11101A] w-[100vw] h-[80vh] z-50 hidden md:block">
          <div class="w-[100%] border-b border-b-[#ffffff4e] border-b-solid flex items-center gap-[2.4rem] py-[1.8rem] px-[3.2rem]">
            <search-arrow @click="searchShow=false"></search-arrow>
          <input @keydown.enter.prevent="searchSubmit($i18n.locale,$event)" type="text" :placeholder="$t('newsFeed.search')" class="w-[100%] pr-[1rem] bg-inherit"/>
          </div>
          <div class="flex flex-col justify-center gap-[2rem] mt-[2.4rem] pl-[7rem]">
            <p class="text-[#CED4DA] text-[1.6rem]">Enter <span class="text-[#fff]">@</span> to search movies</p>
            <p class="text-[#CED4DA] text-[1.6rem]">Enter <span class="text-[#fff]">#</span> to search quotes </p>
          </div>
        </div>
        <notifications-modal @notification-length="notificationLength" :modalShow="notificationModal"></notifications-modal>
        <div v-if="notificationsLength>0" class="cursor-pointer z-50">
        <div @click="notificationShow" class="bg-[#E33812] w-[25px] h-[25px] md:w-[20px] md:h-[20px] rounded-[100%] absolute right-0 top-0 -translate-x-[50%] -translate-y-[9%] md:top-[20%] md:translate-y-[12%] md:right-[5%]"><span class="absolute text-[1.6rem] md:text-[12px] text-[#fff] font-medium right-1/2 translate-x-1/2">{{ notificationsLength }}</span></div>
        </div>
        <search-icon @click="searchShow=true" v-show="search" class="hidden md:block translate-x-full"></search-icon>
      <notification-icon @click="notificationShow" class="mr-[2.4rem] hover:cursor-pointer z-40 md:hidden"></notification-icon>
      <bell-icon @click="notificationShow" class="mr-[2.4rem] hidden md:block hover:cursor-pointer z-40 md:translate-x-[150%]"></bell-icon>
      </div>
      <language-dropdown></language-dropdown>
      <button @click="logoutHandle" type="button" class="md:hidden text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] hover:bg-[#cdc9c2] hover:text-[#222030] font-medium active:bg-[#b6b1a8] disabled:bg-[#e6e2da] focus:bg-[#a5a199] focus:text-[#222030]">{{ $t('newsFeed.logout') }}</button>
    </div>
  </header>
</div>
</div>
</template>




<style scoped>
input {
 border:none;
 outline: none;
 background: none;
 font-weight: 400;
 color: #fff;
 font-size: 1.6rem;
}
input::placeholder {
  font-weight: 400;
  color: #fff;
  font-size: 1.6rem;
}
</style>