<script setup lang="ts">
import { ref } from 'vue';

interface PricingPlan {
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPremium: boolean;
  features: string[];
  buttonText: string;
}

interface PricingSection {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
}

interface Homepage {
  pricing: PricingSection;
}

const period = ref<'monthly' | 'yearly'>('monthly');

const query = `*[_type == "homepage"][0] {
  pricing {
    title,
    subtitle,
    plans[] {
      title,
      monthlyPrice,
      yearlyPrice,
      isPremium,
      features,
      buttonText
    }
  }
}`;

const { data: homepageData } = await useSanityQuery<Homepage>(query);
</script>

<template>
  <div v-if="homepageData" class="pricing">
    <div class="pricing__header">
      <h1 class="pricing__title">{{ homepageData.pricing.title }}</h1>
      <p class="pricing__subtitle">{{ homepageData.pricing.subtitle }}</p>
    </div>
    
    <PlanToggle v-model:period="period" />
    
    <div class="pricing__cards">
      <PricingCard
        v-for="plan in homepageData.pricing.plans"
        :key="plan.title"
        v-bind="plan"
        :period="period"
      />
    </div>
  </div>
</template>


<style lang="scss" scoped>
.pricing {
  $self: &;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      right: -1rem;
      top: 0;
      width: 3rem;
      height: 0.5rem;
      background-color: #ff5757;
      border-radius: 0.25rem;
    }
  }

  &__subtitle {
    color: #666;
    font-size: 1.1rem;
  }

  &__cards {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
}
</style>