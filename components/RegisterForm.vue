<script lang="ts" setup>



const email = defineModel('email');
const password = defineModel('password');
const confirmPassword = defineModel('confirmPassword');

// Fonction de validation et soumission
function handleSubmit() {
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }
  alert(`Inscription réussie : \nEmail : ${email.value}\nMot de passe : ${password.value}`);
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <!-- Champ Email -->
    <div class="form__group">
      <label for="email" class="form__label">Email</label>
      <input 
        v-model="email" 
        type="email" 
        name="email" 
        class="form__input" 
        required
      >
    </div>

    <!-- Champ Mot de passe -->
    <div class="form__group">
      <label for="password" class="form__label">Password</label>
      <input 
        v-model="password" 
        type="password" 
        name="password" 
        class="form__input" 
        required
      >
    </div>

    <!-- Champ Confirmation du mot de passe -->
    <div class="form__group">
      <label for="confirmPassword" class="form__label">Confirm Password</label>
      <input 
        v-model="confirmPassword" 
        type="password" 
        name="confirmPassword" 
        class="form__input" 
        required
      >
    </div>

    <!-- Bouton d'inscription -->
    <div class="form__button">
      <MyButton>S'inscrire</MyButton>
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
    font-size: 1rem;
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
