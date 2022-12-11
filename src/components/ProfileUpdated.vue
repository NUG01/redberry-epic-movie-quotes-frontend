<script>
import SuccessIcon from "@/components/icons/SuccessIcon.vue";
export default {
  components:{SuccessIcon}
  
}
</script>

<template>
  <div class="fixed z-50 right-0 top-0 -translate-x-[30%] md:right-1/2 md:translate-x-[50%] translate-y-1/2 md:w-[70%] md:px-[2rem] md:py-[1.2rem] px-[2.4rem] py-[1.5rem] bg-[#BADBCC] rounded-[4px]">
      <div class="flex items-center justify-center gap-[1rem]">
        <success-icon></success-icon>
        <p class="text-[#11101A] text-[1.8rem] font-medium">{{ $t('newsFeed.email_added') }}<br>{{ $t('newsFeed.check_email') }}</p>
      </div>
    </div>
</template>