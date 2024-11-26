<script lang="ts" setup>

import MyButton from "./Button.vue"

const email = defineModel('email')
const password = defineModel('password')


function handleSubmit()  {
alert(email.value + " " + password.value);

   
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form__group">
        <label for="email" class="form__label">Email</label>
        <input 
          type="email" 
          name="email" 
          v-model="email" 
          class="form__input" 
        />
        {{ email }}
      </div>
      <div class="form__group">
        <label for="password" class="form__label">Password</label>
        <input 
          type="password" 
          name="password" 
          v-model="password" 
          class="form__input" 
        />
        {{ password }}
      </div>
      <div class="form__button">
        <MyButton>Se connecter</MyButton>
      </div>
    </form>
  </template>
  
  

<style lang="scss">

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; 
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 1);

  &__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__label {
    font-size: 1rem;
    color: #333;
    font-weight: bold;
  }

  &__input {
    padding: 0.75rem;
    font-size: 2rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  &__button {
    margin-top: 1rem;
    align-self: center;
  }

 
  @media (max-width: 768px) {
    max-width: 100%; 
    padding: 1.5rem;

    &__input {
      font-size: 0.9rem; 
      padding: 0.5rem;
    }

    &__label {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem; 
    gap: 1rem;

    &__button {
      width: 100%; 
    }
  }
}

</style>