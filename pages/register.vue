<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // Utilisation de useRouter pour la redirection

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();  // Initialisation de useRouter

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
    await router.push('/app/dashboard');  // Redirige vers le dashboard

  } catch (error) {
    console.error(error);
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.';
  }
};
</script>

<template>
    <div class="test">
      <form class="contact-form" @submit="onSubmit">
        <div>
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" placeholder="Entrez votre username" required />
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input id="password" v-model="password" type="password" placeholder="Entrez votre mot de passe" required />
        </div>
        <button type="submit" class="submit-button">Envoyer</button>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>
</template>
