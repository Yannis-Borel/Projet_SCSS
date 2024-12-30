<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Utilisation de useRouter pour la redirection

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter(); // Initialisation de useRouter

const onSubmit = async (event: Event) => {
  event.preventDefault();
  console.log('Form has submitted');
  console.log('Username:', username.value);
  console.log('Password:', password.value);

  try {
    const responseRegister = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!responseRegister.ok) {
      throw new Error('Une erreur est survenue lors de l\'enregistrement.');
    }

    const data = await responseRegister.json();
    console.log(data);

    // Enregistrement du JWT dans le cookie
    const cookieJwt = useCookie('api_tracking_jwt');
    cookieJwt.value = data.token;

    // Redirection vers le dashboard après une inscription réussie
    await router.push('/app/dashboard'); // Redirige vers le dashboard

  } catch (error) {
    console.error(error);
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.';
  }
};
</script>

<template>
  <div class="form">
    <form class="form__container" @submit="onSubmit">
      <div class="form__group">
        <label for="username" class="form__group-label">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="form__group-input"
          placeholder="Entrez votre username"
          required
        >
      </div>
      <div class="form__group">
        <label for="password" class="form__group-label">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="form__group-input"
          placeholder="Entrez votre mot de passe"
          required
        >
      </div>
      <button type="submit" class="form__button">Envoyer</button>
      <div v-if="errorMessage" class="form__error">{{ errorMessage }}</div>
    </form>
  </div>
</template>
<style lang="scss">

// Bloc principal
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;

  &__container {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  }

  &__group {
    margin-bottom: 1.5rem;

    &-label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #333;
    }

    &-input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;

      &:focus {
        border-color: #007bff;
        outline: none;
      }
    }
  }

  &__button {
    width: 100%;
    padding: 0.8rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  &__error {
    margin-top: 1rem;
    color: #d9534f;
    font-size: 0.9rem;
    text-align: center;
  }
}

</style>