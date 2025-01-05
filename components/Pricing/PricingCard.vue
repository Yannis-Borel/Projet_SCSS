<script setup lang="ts">
defineProps<{
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  period: 'monthly' | 'yearly';
  features: string[];
  isPremium?: boolean;
}>();
</script>

<template>
  <div class="pricing-card" :class="{ 'pricing-card--premium': isPremium }">
    <h3 class="pricing-card__title">{{ title }}</h3>
    <div class="pricing-card__price">
      <span class="pricing-card__currency">$</span>
      <span class="pricing-card__amount">{{ period === 'monthly' ? monthlyPrice : yearlyPrice }}</span>
      <span class="pricing-card__period">/Forever</span>
    </div>
    <ul class="pricing-card__features">
      <li v-for="feature in features" :key="feature" class="pricing-card__feature">
        {{ feature }}
      </li>
    </ul>
    <button class="pricing-card__button">
      Start 14 Days Trial
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pricing-card {
  $self: &;
  background-color: white;
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 2px solid #f0f0f0;
  min-width: 280px;

  &:hover {
    transform: translateY(-5px);
  }

  &--premium {
    background-color: #ff5757;
    color: white;

    #{$self}__button {
      background-color: white;
      color: #ff5757;

      &:hover {
        background-color: #f8f8f8;
      }
    }
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  &__price {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  &__currency {
    font-size: 1.5rem;
    vertical-align: super;
  }

  &__period {
    font-size: 1rem;
    color: #666;
  }

  &__features {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
  }

  &__feature {
    margin: 0.5rem 0;
    color: inherit;
  }

  &__button {
    background-color: #ff5757;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 2rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken(#ff5757, 10%);
    }
  }
}
</style>