<script setup lang="ts">
import type { Feature } from '@/@types/Features';

interface Props {
  feature: Feature;
  isActive?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="feature-card" :class="{ 'feature-card--active': isActive }">
    <h3 class="feature-card__title">{{ feature.title }}</h3>
    <p class="feature-card__description">{{ feature.description }}</p>
  </div>
</template>



<style lang="scss" >
.feature-card {
  /* Block */
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &--active {
    /* Modifier */
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  &__icon {
    /* Element */
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1.5rem;
  }

  &__title {
    /* Element */
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #2b2b2b;
  }

  &__description {
    /* Element */
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
  }

  /* Modifiers for background colors */
  &--blue {
    background-color: #e7f3f9;
  }

  &--violet {
    background-color: #eae6fb;
  }

  &--orange {
    background-color: #ffe6d5;
  }
}

</style>