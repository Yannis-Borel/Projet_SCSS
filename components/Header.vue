<script setup lang="ts">
// import { ref } from "vue";
// import { RouterLink } from "vue-router";

const isOpen = ref(false);

const toggleMobileMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <div class="header__container">
        <!-- Logo -->
        <RouterLink to="/" class="header__logo">
          <img src="../assets/img/SM-logo.png" alt="logo du site" >
        </RouterLink>

        <!-- Bouton mobile -->
        <button 
          class="header__mobile-button" 
          @click="toggleMobileMenu"
        >
          <svg v-if="!isOpen" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zm0-4h14a1 1 0 110 2H3a1 1 0 110-2zm0 8h14a1 1 0 110 2H3a1 1 0 110-2z" clip-rule="evenodd" />
          </svg>
          <svg v-else viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 6a.75.75 0 011.06 0L10 8.94l2.47-2.47a.75.75 0 111.06 1.06L11.06 10l2.47 2.47a.75.75 0 11-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 01-1.06-1.06L8.94 10 6.47 7.53A.75.75 0 016 6z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- Menu desktop -->
        <div class="header__menu header__menu--desktop">
          <ul>
            <li class="header__menu--desktop-item">
              <NuxtLink to="/" class="header__menu--desktop-item__link">Accueil</NuxtLink>
            </li>
            <li class="header__menu--desktop-item">
              <NuxtLink to="/blog" class="header__menu--desktop-item__link">Blog</NuxtLink>
            </li>
            <li class="header__menu--desktop-item">
              <NuxtLink to="/carouseltest" class="header__menu--desktop-item__link">Carousel Test</NuxtLink>
            </li>
            <li class="header__menu--desktop-item">
              <NuxtLink to="/pocketbasetest" class="header__menu--desktop-item__link">Pocketbase Test</NuxtLink>
            </li>
          </ul>
        </div> 

        <!-- Menu mobile -->
        <div 
          :class="{ hidden: !isOpen }" 
          class="header__menu header__menu--mobile"
        >
          <ul>
            <li class="header__menu--mobile-item">
              <NuxtLink to="/" class="header__menu--mobile-item__link">Accueil</NuxtLink>
            </li>
            <li class="header__menu--mobile-item">
              <NuxtLink to="/carouselAPI" class="header__menu--mobile-item__link">Playlists</NuxtLink>
            </li>
            <li class="header__menu--mobile-item">
              <NuxtLink to="/carouseltest" class="header__menu--mobile-item__link">Carousel Test</NuxtLink>
            </li>
            <li class="header__menu--mobile-item">
              <NuxtLink to="/pocketbasetest" class="header__menu--mobile-item__link">Pocketbase Test</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>


<style lang="scss">
// Fichier SCSS (header.scss)
.header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 50;

  &__nav {
    background: linear-gradient(rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
  }

  &__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    display: flex;
    align-items: center;

    img {
      height: 3rem; // Correspond à h-12
    }
  }

  &__mobile-button {
    display: block;
    background: none;
    color: $white;
    border: none;
    cursor: pointer;

    &:hover {
      color: $gray400; // Hover effect
    }

    &:focus {
      outline: none;
      color: $gray400;
    }

    svg {
      width: 1.5rem; // Correspond à w-6
      height: 1.5rem;
    }
  }

  &__menu {
    display: none;

    &--desktop {
      @include medium-up() {
        display: flex;
        gap: 1rem; // Espace entre les éléments (space-x-4)
      }

      &-item {
        &__link {
          display: block;
          padding: 0.5rem 1rem; // Correspond à py-2 pr-4 pl-3
          color: $gray400;
          text-decoration: none;
          border-bottom: 1px solid transparent;

          &:hover {
            color: $white;
          }
        }
      }
    }

    &--mobile {
      display: flex;
      flex-direction: column;
      gap: 1rem; // Correspond à space-y-4
      padding: 1rem 0.5rem; // Correspond à px-2 pt-2 pb-3

      &-item {
        &__link {
          display: block;
          padding: 0.75rem 1rem; // Correspond à py-3 pr-4 pl-3
          color: $gray200;
          background-color: $primaryColor;
          border-radius: 0.25rem;

          &:hover {
            background-color: darken($primaryColor, 10%);
          }
        }
      }
    }
  }
}

</style>