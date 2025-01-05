<script setup lang="ts">
import type { ExtendedPersonalHabit } from '@/@types/dashboard';

const props = defineProps<{
  habit: ExtendedPersonalHabit;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: 'update' | 'edit', habit: ExtendedPersonalHabit): void;
  (e: 'delete', id: number): void;
  (e: 'track', id: number, completed: boolean): void;
  (e: 'cancel-edit'): void;
}>();

const editingHabit = ref<ExtendedPersonalHabit>({ ...props.habit });

const saveEdit = () => {
  if (!editingHabit.value.title) return;
  emit('update', editingHabit.value);
};
</script>

<template>
    <li
:class="[
      'habit',
      `habit--${habit.status}`
    ]">
      <template v-if="isEditing">
        <div class="habit__edit-form">
          <input 
            v-model="editingHabit.title" 
            class="habit__edit-input"
            placeholder="Titre" 
            required
          >
          <textarea 
            v-model="editingHabit.description" 
            class="habit__edit-textarea"
            placeholder="Description"
          />
          <div class="habit__edit-buttons">
            <button class="habit__button habit__button--save" @click="saveEdit">
              Enregistrer
            </button>
            <button class="habit__button habit__button--cancel" @click="$emit('cancel-edit')">
              Annuler
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="habit__container">
          <span class="habit__text">
            {{ habit.title }} : {{ habit.description }}
          </span>
          <div class="habit__actions">
            <button 
              class="habit__button habit__button--success"
              @click="$emit('track', habit.id, true)"
            >
              ✓ Terminé
            </button>
            <button 
              class="habit__button habit__button--fail"
              @click="$emit('track', habit.id, false)"
            >
              ✗ Non fait
            </button>
            <button 
              class="habit__button habit__button--edit"
              @click="$emit('edit', habit)"
            >
              Modifier
            </button>
            <button 
              class="habit__button habit__button--delete"
              @click="$emit('delete', habit.id)"
            >
              Supprimer
            </button>
          </div>
        </div>
      </template>
    </li>
  </template>
  
  <style lang="scss" scoped>
  .habit {
    $self: &;
  
    background-color: #f9f9f9;
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 10px;
  
    &--completed {
      background-color: #d4edda;
    }
  
    &--not_done {
      background-color: #f8d7da;
    }
  
    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    &__text {
      flex: 1;
      margin-right: 1rem;
    }
  
    &__actions {
      display: flex;
      gap: 10px;
    }
  
    &__edit-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    &__edit-input,
    &__edit-textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
  
      &:focus {
        outline: none;
        border-color: #2196F3;
      }
    }
  
    &__edit-buttons {
      display: flex;
      gap: 10px;
    }
  
    &__button {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
      color: white;
  
      &--success {
        background-color: #4CAF50;
        &:hover { background-color: darken(#4CAF50, 10%); }
      }
  
      &--fail {
        background-color: #f44336;
        &:hover { background-color: darken(#f44336, 10%); }
      }
  
      &--edit {
        background-color: #2196F3;
        &:hover { background-color: darken(#2196F3, 10%); }
      }
  
      &--delete {
        background-color: #f44336;
        &:hover { background-color: darken(#f44336, 10%); }
      }
  
      &--save {
        background-color: #4CAF50;
        &:hover { background-color: darken(#4CAF50, 10%); }
      }
  
      &--cancel {
        background-color: #f44336;
        &:hover { background-color: darken(#f44336, 10%); }
      }
    }
  }
  </style>