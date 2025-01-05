// components/AddHabitForm.vue
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'add-habit', title: string, description: string): void
}>();

const title = ref<string>('');
const description = ref<string>('');
const error = ref<string>('');

const submitForm = () => {
  error.value = '';

  if (!title.value) {
    error.value = 'Le titre est requis';
    return;
  }

  emit('add-habit', title.value, description.value);
  title.value = '';
  description.value = '';
};
</script>

<template>
    <div class="habit-form">
      <h2 class="habit-form__title">Ajouter une nouvelle habitude</h2>
      <form class="habit-form__container" @submit.prevent="submitForm">
        <div class="habit-form__group">
          <label class="habit-form__label" for="title">Titre de l'habitude</label>
          <input 
            id="title" 
            v-model="title" 
            type="text" 
            class="habit-form__input"
            placeholder="Ex: Lecture quotidienne" 
            required
          >
        </div>
        <div class="habit-form__group">
          <label class="habit-form__label" for="description">Description (optionnel)</label>
          <textarea 
            id="description" 
            v-model="description" 
            class="habit-form__textarea"
            placeholder="Décrivez votre habitude en détail"
          />
        </div>
        <div v-if="error" class="habit-form__error">{{ error }}</div>
        <button type="submit" class="habit-form__submit">Ajouter l'habitude</button>
      </form>
    </div>
  </template>
  
  <style lang="scss" scoped>
  .habit-form {
    $self: &;
  
    &__container {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
    }
  
    &__title {
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
    }
  
    &__group {
      margin-bottom: 15px;
    }
  
    &__label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
  
    &__input,
    &__textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
  
      &:focus {
        outline: none;
        border-color: #4CAF50;
      }
    }
  
    &__error {
      color: red;
      margin-bottom: 10px;
    }
  
    &__submit {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
  
      &:hover {
        background-color: #45a049;
      }
    }
  }
  </style>