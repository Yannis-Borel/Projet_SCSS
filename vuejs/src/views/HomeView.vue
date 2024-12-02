<script setup lang="ts">
import MyForm from '@/components/Form.vue';
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<template>
  <div class="home">
    <!-- Conteneur du logo -->
    
   
    <img src="@/assets/image/Compte.png" alt="Logo" class="home__Compte" />
    <!-- Conteneur des formulaires -->
    <div class="home__forms">
      <!-- Formulaire d'inscription à gauche -->
      <div class="home__form">
        <h2 class="home__title">Crée un compte</h2>
        <RegisterForm />
      </div>

      <!-- Formulaire de connexion à droite -->
      <div class="home__form">
        <h2 class="home__title">Se connecter</h2>
        <MyForm />
      </div>
      
    </div>
    <div class="home__logo-container">
      <img src="@/assets/image/logo.png" alt="Logo" class="home__logo" />
    </div>
  </div>
</template>

<style lang="scss">
.home {
  min-height: 100vh;
  background: linear-gradient(180deg, $primaryColor, $primaryDarkColor);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__Compte {
    width: 40rem;
    margin-bottom: 10px;
  }

  &__logo-container {
    margin-bottom: 2rem;
  }

  &__logo {
    max-width: 150px;
    height: auto;
    margin-top: 70px;
  }

  &__forms {
    display: grid;
    grid-template-columns: 1fr 1fr; // Deux colonnes : inscription et connexion
    gap: 2rem; // Espace entre les colonnes
    width: 80%;
    max-width: 1000px; // Fond légèrement transparent
    padding: 2rem;
    border-radius: 8px;
  }

  &__form {
    background: rgba(255, 255, 255, 0.7);
   
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__title {
    font-size: 1.25rem;
  top: 0;
    color: #333;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    &__forms {
      grid-template-columns: 1fr; // Une seule colonne sur mobile
      gap: 1rem;
    }
  }
}
</style>
