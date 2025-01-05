<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:period', value: 'monthly' | 'yearly'): void
}>();

const props = defineProps<{
  period: 'monthly' | 'yearly'
}>();

const togglePeriod = () => {
  emit('update:period', props.period === 'monthly' ? 'yearly' : 'monthly');
};
</script>

<template>
  <div class="plan-toggle">
    <span class="plan-toggle__label" :class="{ 'plan-toggle__label--active': period === 'monthly' }">
      Monthly
    </span>
    <button 
      class="plan-toggle__switch"
      :class="{ 'plan-toggle__switch--yearly': period === 'yearly' }"
      @click="togglePeriod"
      type="button"
      role="switch"
      :aria-checked="period === 'yearly'"
    >
      <span class="plan-toggle__slider" />
    </button>
    <span class="plan-toggle__label" :class="{ 'plan-toggle__label--active': period === 'yearly' }">
      Yearly
    </span>
  </div>
</template>

<style lang="scss" scoped>
.plan-toggle {
  $self: &;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;

  &__label {
    font-size: 1rem;
    color: #666;
    transition: color 0.3s ease;

    &--active {
      color: #333;
      font-weight: 600;
    }
  }

  &__switch {
    position: relative;
    width: 3.5rem;
    height: 2rem;
    background-color: #ff5757;
    border-radius: 1rem;
    padding: 0.25rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &--yearly {
      background-color: #ff7a7a;
    }
  }

  &__slider {
    position: absolute;
    left: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5rem;
    height: 1.5rem;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;

    .plan-toggle__switch--yearly & {
      transform: translate(1.5rem, -50%);
    }
  }
}
</style>