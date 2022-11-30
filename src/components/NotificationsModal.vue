<script>
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import NotificationLike from "@/components/icons/NotificationLike.vue";
import NotificationComment from "@/components/icons/NotificationComment.vue";
import moment from 'moment'
import ka from "moment/dist/locale/ka"
import { useUserStore } from '@/stores/UserStore.js';
import axios from "@/config/axios/index.js";



export default {
  props:['modalShow', 'notifications'],
  components:{NotificationLike,NotificationComment},
  setup(props, context){

     const login=useUserStore();
     const router = useRouter();
     const dataIsFetched=ref(false)
     const user=ref(null)
     const notifications=ref([])
     const newNotifications=ref([])

    onMounted(async()=>{
       user.value=login.getUserData
      const resNotifications= await axios.get(`notifications/${user.value.id}`);
      notifications.value=resNotifications.data
      window.Echo.channel('notifications.'+user.value.id).listen('NotificationStatusUpdated', (e) => {
        let data=e.notification.data
              data.user=e.notification.user
              if(user.value.id!=data.user.id){
                newNotifications.value.push(data)
                notifications.value.unshift(data)
                context.emit('notificationLength')

              }
          })
          dataIsFetched.value=true
    })


     const modalShow=computed(()=>{
      return props.modalShow
    })
    function newColor(notification){
      return newNotifications.value.find(x => x.id == notification.id) ? true : false
    }
     function now(date, locale){
      locale=='ka'? moment.locale('ka', ka) : moment.locale('en')
      return moment(date).fromNow()
    }

    function markAsRead(){
      newNotifications.value=[]
    }


    return {
      modalShow,
      notifications, 
      now, 
      newColor, 
      router, 
      dataIsFetched,
      markAsRead
            }
  }
  
}
</script>


<template>
  <div v-if="modalShow && dataIsFetched">
    <div class="triangle absolute top-[120%] right-[0.75rem] md:right-[2rem] md:top-[5.2rem]"></div>
      <div class="absolute top-[6.5rem] right-[-415%] md:top-[7.2rem] md:right-[0] md:min-w-[100vw] md:max-w-[100vw] md:max-h-[93.1vh] md:min-h-[93.1vh] bg-[#000] lg:min-w-[45vw] lg:max-w-[50vw] xl:min-w-[40vw] xl:max-w-[40vw] min-w-[40vw] max-h-[50vh] overflow-scroll scrollHide">
        <div class="bg-[#000] px-[4rem] py-[2rem]">
          <div class="flex items-end justify-between mb-[2.4rem]">
            <p class="text-[2.4rem] text-[#fff] font-medium md:text-[2rem]">{{ $t('newsFeed.notifications') }}</p>
            <p @click="markAsRead" class="text-[1.6rem] text-[#fff] font-normal cursor-pointer md:text-[1.4rem] underline decoration-[0.5px] underline-offset-2">{{ $t('newsFeed.mark_as_read') }}</p>
          </div>

         
          <div class="flex flex-col justify-center gap-[2rem]">
            <div v-for="notify in notifications" :key="notify.id" class="border border-solid border-[#6d767e80] p-[1.6rem] flex items-center gap-[1.6rem] rounded-[4px]">
              <div class="md:flex md:items-center md:justify-center md:flex-col md:w-[6rem]">
                <img src="/src/assets/InterstellarMovie.png" class="rounded-[100%] min-w-[6rem] min-h-[6rem] max-w-[6rem] max-h-[6rem]" :class="[newColor(notify) ? 'border-[2px] border-solid border-[#198754]' : '']">
                <div class="text-[#198754] text-[1.6rem] hidden md:block" v-if="newColor(notify)">{{ $t('newsFeed.new') }}</div>
              </div>
              <div class="flex flex-col items-start gap-[1rem] md:gap-[3px] w-[100%]">
                <div class="flex items-center justify-between md:flex-col md:items-start w-[100%]">
                <p class="text-[2.4rem] text-[#fff] font-normal md:text-[2rem]">{{ notify.user.name }}</p>
                <p class="text-[1.6rem] text-[#D9D9D9] font-normal md:hidden">{{now(notify.created_at, $i18n.locale)}}</p>
                </div>
                <div class="flex items-center justify-between md:flex-col md:items-start w-[100%]">
                <router-link v-if="notify.body!=null" :to="{ name: 'quote-details', params:{id: notify.quote_id} }">
                  <div class="flex items-center justify-between gap-[1rem] sm:gap-[5px]">
                  <notification-comment></notification-comment>
                  <p class="text-[1.6rem] sm:text-[1.35rem] text-[#CED4DA] font-normal">{{ $t('newsFeed.commented') }}</p>
                 </div>
                 </router-link>
                <router-link v-if="notify.body==null" :to="{ name: 'quote-details', params:{id: notify.quote_id} }">
                <div class="flex items-center justify-between gap-[1rem] sm:gap-[3.5px]">
                  <notification-like></notification-like>
                  <p class="text-[1.6rem] sm:text-[1.35rem] text-[#CED4DA] font-normal">{{ $t('newsFeed.liked') }}</p>
                </div>
                 </router-link>
                <div class="text-[#198754] text-[1.6rem] md:hidden" v-if="newColor(notify)">{{ $t('newsFeed.new') }}</div>
                <p class="text-[1.6rem] text-[#D9D9D9] font-normal hidden md:block mt-[5px]">{{now(notify.created_at, $i18n.locale)}}</p>
                </div>
              </div>
            </div>
            </div>
        </div>
      </div>
  </div>
</template>


<style scoped>
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