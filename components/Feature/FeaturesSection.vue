
<script setup lang="ts">
import { ref } from 'vue';
import type { Homepage } from '@/@types/Features';

interface Props {
  features: Homepage['features'];
}

const props = defineProps<Props>();
const activeIndex = ref(-1);
</script>


<template>
  <section class="features">
    <div class="features__header">
      <h2 class="features__title">{{ features.sectionTitle }}</h2>
      <p class="features__subtitle">{{ features.subtitle }}</p>
    </div>
    <div class="features__grid">
      <FeatureCard
        v-for="(feature, index) in features.featuresList"
        :key="index"
        :feature="feature"
        :is-active="activeIndex === index"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = -1"
      />
    </div>
  </section>
</template>


<style lang="scss" scoped>
.features {
  /* Block */
  padding: 6rem 1rem;
  background-color: #f9faff;

  &__header {
    /* Element */
    text-align: center;
    margin-bottom: 4rem;
  }

  &__title {
    /* Element */
    font-size: 2.5rem;
    font-weight: bold;
    color: #2b2b2b;
    margin-bottom: 1rem;
  }

  &__subtitle {
    /* Element */
    font-size: 1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }

  &__grid {
    /* Element */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    padding: 0 1rem;
  }
}

</style>