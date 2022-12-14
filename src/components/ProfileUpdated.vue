<script>
import SuccessIcon from "@/components/icons/SuccessIcon.vue";
import InvalidIcon from "@/components/icons/ProfileinvalidIcon.vue";

export default {
  props:['color'],
  components:{SuccessIcon, InvalidIcon},
  setup(props){
       const color=props.color

    return {color}
  }
  
}
</script>

<template>
  <div :class="[color ? color : 'bg-[#BADBCC]']" class="fixed z-50 right-0 top-0 -translate-x-[30%] md:right-1/2 md:translate-x-[50%] translate-y-1/2 md:w-[70%] md:px-[2rem] md:py-[1.2rem] px-[2.4rem] py-[1.5rem] rounded-[4px]">
      <div class="flex items-center justify-center gap-[1rem]">
        <success-icon v-if="!color"></success-icon>
        <invalid-icon v-else class="scale-[1.3]"></invalid-icon>
        <p :class="[color ? 'text-[#fff]' : 'text-[#11101A]']" class="text-[1.8rem] font-medium"><slot></slot></p>
      </div>
    </div>
</template>