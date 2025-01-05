<script setup lang="ts">
import type { ExtendedPersonalHabit } from '@/@types/dashboard';
import HabitItem from './HabitItem.vue';

const _props = defineProps<{
  habits: ExtendedPersonalHabit[];
}>();

const _emit = defineEmits<{
  (e: 'update', habit: ExtendedPersonalHabit): void;
  (e: 'delete', id: number): void;
  (e: 'track', id: number, completed: boolean): void;
}>();

const editingHabitId = ref<number | null>(null);

const startEdit = (habit: ExtendedPersonalHabit) => {
  editingHabitId.value = habit.id;
};

const cancelEdit = () => {
  editingHabitId.value = null;
};
</script>

<template>
    <div class="habit-list">
      <h2 class="habit-list__title">Mes habitudes personnelles</h2>
      <ul v-if="habits.length" class="habit-list__container">
        <HabitItem
          v-for="habit in habits"
          :key="habit.id"
          :habit="habit"
          :is-editing="editingHabitId === habit.id"
          @update="(updatedHabit) => { $emit('update', updatedHabit); cancelEdit(); }"
          @delete="id => $emit('delete', id)"
          @track="(id, completed) => $emit('track', id, completed)"
          @edit="startEdit"
          @cancel-edit="cancelEdit"
        />
      </ul>
      <p v-else class="habit-list__empty">Vous n'avez pas encore d'habitudes personnelles</p>
    </div>
  </template>
  
  <style lang="scss" scoped>
  .habit-list {
    $self: &;
  
    &__title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  
    &__container {
      list-style: none;
      padding: 0;
    }
  
    &__empty {
      color: #666;
      font-style: italic;
    }
  }
  </style>