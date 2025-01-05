// components/PartnerBox.vue
<script setup lang="ts">
interface Props {
  backgroundColor: string;
  logoColor: string;
}

defineProps<Props>();
</script>
<template>
  <div 
    class="partner-box" 
    :style="{ backgroundColor: backgroundColor }"
  >
    <div 
      class="partner-box__logo" 
      :style="{ backgroundColor: logoColor }"
    />
  </div>
</template>



<style lang="scss">
.partner-box {
  $self: &;
  
  border-radius: 1.5rem;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  &__logo {
    width: 30%;
    height: 30%;
    border-radius: 0.5rem;
  }
}
</style>