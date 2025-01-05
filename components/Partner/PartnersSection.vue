// components/PartnersSection.vue
<script setup lang="ts">
import type { Homepage } from '@/@types/Partners';

interface Props {
  partners: Homepage['partners'];
}

defineProps<Props>();
</script>


<template>
  <section class="partners">
    <div class="partners__grid">
      <div class="partners__boxes">
        <PartnerBox
          v-for="(box, index) in partners.partnerBoxes"
          :key="index"
          :background-color="box.backgroundColor"
          :logo-color="box.logoColor"
          :class="`partners__box partners__box--${index + 1}`"
        />
      </div>
      <div class="partners__content">
        <h2 class="partners__title">{{ partners.title }}</h2>
        <p class="partners__description">{{ partners.description }}</p>
        <button class="partners__button">{{ partners.buttonText }}</button>
      </div>
    </div>
  </section>
</template>


<style lang="scss">
.partners {
  $self: &;
  padding: 4rem 0;
  
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  
  &__boxes {
    position: relative;
    aspect-ratio: 4/3;
  }
  
  &__box {
    position: absolute;
    width: 25%;
    
    &--1 {
      top: 10%;
      left: 5%;
      width: 30%;
    }
    
    &--2 {
      top: 0;
      right: 25%;
      width: 35%;
    }
    
    &--3 {
      bottom: 20%;
      left: 20%;
      width: 40%;
    }
    
    &--4 {
      bottom: 10%;
      right: 10%;
      width: 25%;
    }
  }
  
  &__content {
    max-width: 480px;
  }
  
  &__title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: bold;
  }
  
  &__description {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  &__button {
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    background-color: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 0.9;
    }
  }
}

@media (max-width: 768px) {
  .partners {
    &__grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    &__content {
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>