<script>
import { ref, onMounted } from "vue";
import DropdownArrow from "@/components/icons/DropdownArrow.vue";
import NotificationIcon from "@/components/icons/NotificationIcon.vue";
import BasicButton from "@/components/BasicButton.vue";
import { useUserStore } from '@/stores/UserStore.js';
import NotificationComment from "@/components/icons/NotificationComment.vue";
import NotificationLike from "@/components/icons/NotificationLike.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/AuthStore.js";
import moment from 'moment'
import ka from "moment/dist/locale/ka"





export default {
  components:{DropdownArrow,BasicButton, NotificationIcon, NotificationComment, NotificationLike},
  setup(){

    const login=useUserStore();
    const router = useRouter();
    const authStore = useAuthStore();


    const langActive=ref(false);
    const notificationModal=ref(false);
    const notifications=ref([])
    const notificationsLength=ref(null)
    const user=ref([])
    const valuesFetched=ref(false)
    const oldValue=ref([])

     function now(date, locale){
      locale=='ka'? moment.locale('ka', ka) : moment.locale('en')
      return moment(date).fromNow()
    }

    onMounted(async ()=>{
      user.value=login.getUserData
      const resLikes= await axios.get(`notifications/${login.getUserData.id}/likes`);
      const resComments= await axios.get(`notifications/${login.getUserData.id}/comments`);
      notifications.value=resLikes.data.concat(resComments.data)
      notifications.value=notifications.value.filter(x => x.user_id != user.value.id)
      notifications.value.sort(function(a, b) {
       return (a.created_at < b.created_at) ? 1 : ((a.created_at > b.created_at) ? -1 : 0);
      });
      oldValue.value=resLikes.data.concat(resComments.data)
      valuesFetched.value=true
      
      window.Echo.channel('notifications.'+user.value.id).listen('NotificationStatusUpdated', (e) => {
              let data=e.notification.data
              data.user=e.notification.user
              if(e.notification.data.user_id!=user.value.id){
                notifications.value.unshift(data)
                notificationsLength.value++
              }
          })
      
    })


      function langDropDown(){
        langActive.value=!langActive.value;
        setTimeout(function(){
          langActive.value=false
        }, 1800);

      }

      function notificationShow(){
        notificationModal.value=!notificationModal.value
        notificationsLength.value=0
      }

     async function logoutHandle(){
     await axios.post('logout')
     authStore.authenticated = false;
     router.push({ name: 'landing'})
    }

    function newColor(notification){
      return oldValue.value.find(x => x.id == notification.id) ? false : true
    }

        return {
        langDropDown,
        active: langActive,
        logoutHandle,
        notificationModal,
        notificationShow,
        notifications,
        now,
        notificationsLength,
        newColor,
        valuesFetched,
        
        
        }
  }
}
</script>




<template>
<div class="relative w-[100vw] h-[8rem] flex items-center justify-center bg-[#222030]">
  <div class="absolute top-0 left-0 w-[100vw] z-10">
  <header class="absolute top-0 left-0 w-[100%] h-[auto] px-[7rem] flex items-center justify-between py-[2rem]">
    <div class="uppercase font-medium text-[1.6rem] text-[#DDCCAA]">movie quotes</div>
    <div class="flex gap-[1.6rem]">
      <div class="flex items-center justify-center relative">
        <div v-if="notificationModal" class="triangle absolute top-[105%] right-[0.75rem]"></div>
      <div v-if="notificationModal" class="absolute top-[6.5rem] right-[-415%] bg-red-500 min-w-[40vw] max-h-[50vh] overflow-scroll scrollHide">
        <div class="bg-[#000] px-[4rem] py-[2rem]">
          <div class="flex items-end justify-between mb-[2.4rem]">
            <p class="text-[2.4rem] text-[#fff] font-medium">{{ $t('newsFeed.notifications') }}</p>
            <p class="text-[1.6rem] text-[#fff] font-normal cursor-pointer">{{ $t('newsFeed.mark_as_read') }}</p>
          </div>

         
          <div class="flex flex-col justify-center gap-[2rem]">
            <div v-for="notify in notifications" :key="notify" class="border border-solid border-[#6d767e80] p-[1.6rem] flex items-center gap-[1.6rem] rounded-[4px]">
              <div>
                <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] w-[6rem] h-[6rem]" :class="[newColor(notify) ? 'border-[2px] border-solid border-[#198754]' : '']">
              </div>
              <div class="flex flex-col items-start gap-[1rem] w-[100%]">
                <div class="flex items-center justify-between w-[100%]">
                <p class="text-[2.4rem] text-[#fff] font-normal">{{ notify.user.name }}</p>
                <p class="text-[1.6rem] text-[#D9D9D9] font-normal">{{now(notify.created_at, $i18n.locale)}}</p>
                </div>
                <div class="flex items-center justify-between w-[100%]">
                <router-link v-if="notify.body!=null" :to="{ name: 'quote-details', params:{id: notify.quote_id} }">
                  <div class="flex items-center justify-between gap-[1rem]">
                  <notification-comment></notification-comment>
                  <p class="text-[1.6rem] text-[#CED4DA] font-normal">{{ $t('newsFeed.commented') }}</p>
                 </div>
                 </router-link>
                <router-link v-if="notify.body==null" :to="{ name: 'quote-details', params:{id: notify.quote_id} }">
                <div class="flex items-center justify-between gap-[1rem]">
                  <notification-like></notification-like>
                  <p class="text-[1.6rem] text-[#CED4DA] font-normal">{{ $t('newsFeed.liked') }}</p>
                </div>
                 </router-link>
                <div v-if="valuesFetched" class="text-[#198754] text-[1.6rem]" v-show="newColor(notify)">{{ $t('newsFeed.new') }}</div>
                </div>
              </div>
            </div>
            </div>
          </div>

      </div>
        <div v-if="notificationsLength>0" class="cursor-pointer z-50">
        <div @click="notificationShow" class="bg-[#E33812] w-[25px] h-[25px] rounded-[100%] absolute right-0 top-0 -translate-x-[50%] -translate-y-[9%]"><span class="absolute text-[1.6rem] text-[#fff] font-medium right-1/2 translate-x-1/2">{{ notificationsLength }}</span></div>
        </div>
      <notification-icon @click="notificationShow" class="mr-[2.4rem] hover:cursor-pointer z-40"></notification-icon>
      </div>
      <div class="mr-[2.4rem] relative flex items-center justify-center">
        <div @click="langDropDown" class="flex items-center justify-center gap-[1rem] cursor-pointer">
        <p class="text-[1.6rem] text-[white]">{{ $i18n.locale=='en'? 'Eng' : 'Ka' }}</p>
      <dropdown-arrow></dropdown-arrow>
        </div>
      <div class="absolute top-full left-0 bg-[#222030] border border-solid border-[white] w-[100%] rounded-[3px] h-[0px] hidden" :class="{lang : active}">
          <div @click="$i18n.locale='en'" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600] cursor-pointer"><p class="text-[1.4rem] px-[5px] py-[4px]">Eng</p></div>
          <div @click="$i18n.locale='ka'" class="block flex items-center justify-center text-[#ffffff] hover:bg-[#cdc9c2] hover:text-[#23232b] hover:font-[600] cursor-pointer"><p class="text-[1.4rem] px-[5px] py-[4px]">Ka</p></div>
      </div>
      </div>
      <button @click="logoutHandle" type="button" class="text-[white] text-[1.6rem] bg-none border border-solid border-[white] px-[25.5px] py-[7px] rounded-[4px] hover:bg-[#cdc9c2] hover:text-[#222030] font-medium active:bg-[#b6b1a8] disabled:bg-[#e6e2da] focus:bg-[#a5a199] focus:text-[#222030]">{{ $t('newsFeed.logout') }}</button>
    </div>
  </header>
</div>
</div>
</template>




<style scoped>

.lang{
  color:#cdc9c2;
  height: auto !important;
  display: block !important;
}
.triangle {
   width: 0px;
   height: 0px;
   border-style: solid;
   border-width: 0 30px 60px 30px;
   border-color: transparent transparent #000000 transparent;
   transform: rotate(0deg);
}
.scrollHide::-webkit-scrollbar {
    display: none;
}
</style>