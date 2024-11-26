<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Form from '@/components/Form.vue';
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<template>
  <div class="home">
    <div class="home__logo-container">
      <img src="@/assets/image/logo.png" alt="Logo" class="home__logo" />
    </div>
  
    <Form>fefefefeffefefefe</Form>
    <RegisterForm />
  </div>
</template>

<style lang="scss">
.home {
  min-height: 100vh; // Assure que le fond couvre tout l'écran
  background: linear-gradient(135deg, $primaryColor, $primaryDarkColor); // Dégradé
  color: #fff; // Texte blanc pour contraster avec le fond
  display: grid;
  place-items: center;

  &__logo-container {
    display: grid;
    place-items: center;
    width: 100%;
  }

  &__logo {
    max-width: 100%;
    width: auto; // Ajuste la taille de ton logo
    height: auto;
  }
}
</style>
