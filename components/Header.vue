<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

// État d'ouverture du menu mobile
const isOpen = ref(false);

// Fonction pour ouvrir/fermer le menu mobile
const toggleMobileMenu = () => {
  isOpen.value = !isOpen.value;
  document.body.classList.toggle("no-scroll", isOpen.value);
};

// Fonction pour fermer le menu mobile
const closeMobileMenu = () => {
  isOpen.value = false;
  document.body.classList.remove("no-scroll");
};
</script>

<template>
  <header class="header">
    <nav class="header__nav nav">
      <div class="nav__container">
        <div class="nav__content">
          <!-- Logo -->
          <RouterLink to="/" class="nav__logo">
            <WEBTVLogo class="nav__logo-img" alt="logo du site" />
          </RouterLink>

          <!-- Liens pour grands écrans -->
          <div class="nav__desktop-menu">
            <RouterLink to="/emissions" class="nav__desktop-link">
              Habitudes
            </RouterLink>
            <RouterLink to="/reportages" class="nav__desktop-link">
              Inscription
            </RouterLink>
            <RouterLink to="/apropos" class="nav__desktop-link">
              À propos
            </RouterLink>
          </div>

          <!-- Bouton menu mobile -->
          <button
            class="nav__mobile-toggle"
            @click="toggleMobileMenu"
          >
            <!-- Icône menu -->
            <svg v-if="!isOpen" class="nav__mobile-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zm0-4h14a1 1 0 110 2H3a1 1 0 110-2zm0 8h14a1 1 0 110 2H3a1 1 0 110-2z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- Icône croix -->
            <svg v-else class="nav__mobile-icon" viewBox="0 0 20 20" fill="white">
              <path
                fill-rule="evenodd"
                d="M6 6a.75.75 0 011.06 0L10 8.94l2.47-2.47a.75.75 0 111.06 1.06L11.06 10l2.47 2.47a.75.75 0 11-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 01-1.06-1.06L8.94 10 6.47 7.53A.75.75 0 016 6z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Menu mobile -->
        <div
          class="nav__mobile-menu"
          :class="{ 'nav__mobile-menu--hidden': !isOpen }"
        >
          <div class="nav__mobile-header">
            <!-- Logo -->
            <RouterLink to="/" class="nav__mobile-logo">
              <img src="" class="nav__mobile-logo-img" alt="logo du site" >
            </RouterLink>
            <!-- Bouton fermeture -->
            <button class="nav__mobile-close" @click="closeMobileMenu">
              <svg viewBox="0 0 20 20" fill="white" class="nav__mobile-close-icon">
                <path
                  fill-rule="evenodd"
                  d="M6 6a.75.75 0 011.06 0L10 8.94l2.47-2.47a.75.75 0 111.06 1.06L11.06 10l2.47 2.47a.75.75 0 11-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 01-1.06-1.06L8.94 10 6.47 7.53A.75.75 0 016 6z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Liens menu mobile -->
          <ul class="nav__mobile-links">
            <li class="nav__mobile-item">
              <RouterLink
                to="/emissions"
                class="nav__mobile-link"
                @click="closeMobileMenu"
              >
                Emissions
              </RouterLink>
            </li>
            <li class="nav__mobile-item">
              <RouterLink
                to="/reportages"
                class="nav__mobile-link"
                @click="closeMobileMenu"
              >
                Reportages
              </RouterLink>
            </li>
            <li class="nav__mobile-item">
              <RouterLink
                to="/rediffusions"
                class="nav__mobile-link"
                @click="closeMobileMenu"
              >
                Rediffusions
              </RouterLink>
            </li>
            <li class="nav__mobile-item">
              <RouterLink
                to="/apropos"
                class="nav__mobile-link"
                @click="closeMobileMenu"
              >
                À propos
              </RouterLink>
            </li>
            <li class="nav__mobile-item">
              <RouterLink
                to="/newsroom"
                class="nav__mobile-link"
                @click="closeMobileMenu"
              >
                Newsroom
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
// Variables globales
$color-black: rgb(0, 0, 0);
$color-white: white;
$color-gray-200: #e5e7eb;
$color-gray-300: #d1d5db;
$color-gray-900: #111827;
$z-index-header: 50;

// Mixins pour la réactivité
@mixin desktop {
  @media (min-width: 768px) {
    @content;
  }
}

@mixin mobile {
  @media (max-width: 767px) {
    @content;
  }
}

// Styles globaux
.no-scroll {
  overflow: hidden;
  height: 100vh;
}

.header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: $z-index-header;

  &__nav {
    position: relative;
    background: linear-gradient($color-black 0%, rgba($color-black, 0) 100%);
  }
}

.nav {
  &__container {
    height: 100%;
    padding: 1.25rem;
    
    @include desktop {
      padding: 1.25rem 2rem;
    }
  }

  &__content {
    display: flex;
    align-items: center;
  }

  &__logo {
    flex-shrink: 0;

    &-img {
      height: 3rem;
    }
  }

  &__desktop-menu {
    display: none;
    padding: 0 5rem;
    
    @include desktop {
      display: flex;
      gap: 2.25rem;
    }
  }

  &__desktop-link {
    color: $color-gray-300;
    font-size: 1.25rem;
    transition: color 0.3s ease;
    text-decoration: none;

    &:hover {
      color: $color-white;
    }
  }

  &__mobile-toggle {
    display: block;
    color: $color-white;
    position: absolute;
    top: 1rem;
    right: 1rem;
    
    @include desktop {
      display: none;
    }

    &:hover {
      color: $color-gray-300;
    }

    &:focus {
      outline: none;
    }
  }

  &__mobile-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  &__mobile-menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(
      to bottom, 
      $color-black, 
      $color-black, 
      $color-gray-900
    );
    color: $color-white;
    padding: 1.5rem;
    transition: opacity 0.4s;

    @include desktop {
      display: none;
    }

    &--hidden {
      display: none;
    }
  }

  &__mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  &__mobile-logo {
    flex-shrink: 0;

    &-img {
      height: 3rem;
    }
  }

  &__mobile-close {
    color: $color-white;
  }

  &__mobile-close-icon {
    width: 2rem;
    height: 2rem;
  }

  &__mobile-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  &__mobile-item {
    width: 100%;
  }

  &__mobile-link {
    display: block;
    padding: 0.75rem;
    color: $color-gray-200;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;
    text-decoration: none;

    &:hover {
      background-color: rgba(55, 65, 81, 0.7);
    }
  }
}
</style>