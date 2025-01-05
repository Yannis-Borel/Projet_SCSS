<script setup lang="ts">
import { ref } from "vue";


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
  <header class="b-header">
    <nav class="b-nav">
      <div class="b-nav__container">
        <div class="b-nav__content">
          <!-- Logo -->
          <NuxtLink to="/" class="b-nav__mobile-logo">
            <img 
              src="@/assets/image/logo-Routinify.png" 
              class="b-nav__mobile-logo-img" 
              alt="logo du site"
            >
          </NuxtLink>

          <!-- Desktop menu -->
          <div class="b-nav__desktop-menu">
            <NuxtLink to="/app/dashboard" class="b-nav__desktop-link">
              Habitudes
            </NuxtLink>
            <NuxtLink to="/register" class="b-nav__desktop-link">
              Inscription
            </NuxtLink>
            <NuxtLink to="/blog" class="b-nav__desktop-link">
              Blog
            </NuxtLink>
            <NuxtLink to="/apropos" class="b-nav__desktop-link">
              À propos
            </NuxtLink>
          </div>

          <!-- Mobile menu button -->
          <button
            class="b-nav__mobile-toggle"
            @click="toggleMobileMenu"
          >
            <!-- Menu icon -->
            <svg 
              v-if="!isOpen" 
              class="b-nav__mobile-icon" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 9h14a1 1 0 110 2H3a1 1 0 110-2zm0-4h14a1 1 0 110 2H3a1 1 0 110-2zm0 8h14a1 1 0 110 2H3a1 1 0 110-2z"
                clip-rule="evenodd"
              />
            </svg>
            <!-- Close icon -->
            <svg 
              v-else 
              class="b-nav__mobile-icon" 
              viewBox="0 0 20 20" 
              fill="white"
            >
              <path
                fill-rule="evenodd"
                d="M6 6a.75.75 0 011.06 0L10 8.94l2.47-2.47a.75.75 0 111.06 1.06L11.06 10l2.47 2.47a.75.75 0 11-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 01-1.06-1.06L8.94 10 6.47 7.53A.75.75 0 016 6z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile menu -->
        <div
          class="b-nav__mobile-menu"
          :class="{ 'b-nav__mobile-menu--hidden': !isOpen }"
        >
          <div class="b-nav__mobile-header">
            <!-- Close button -->
            <button class="b-nav__mobile-close" @click="closeMobileMenu">
              <svg 
                viewBox="0 0 20 20" 
                fill="white" 
                class="b-nav__mobile-close-icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 6a.75.75 0 011.06 0L10 8.94l2.47-2.47a.75.75 0 111.06 1.06L11.06 10l2.47 2.47a.75.75 0 11-1.06 1.06L10 11.06l-2.47 2.47a.75.75 0 01-1.06-1.06L8.94 10 6.47 7.53A.75.75 0 016 6z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Mobile menu links -->
          <ul class="b-nav__mobile-links">
            <li class="b-nav__mobile-item">
              <NuxtLink
                to="/app/dashboard"
                class="b-nav__mobile-link"
                @click="closeMobileMenu"
              >
                Habitudes
              </NuxtLink>
            </li>
            <li class="b-nav__mobile-item">
              <NuxtLink
                to="/register"
                class="b-nav__mobile-link"
                @click="closeMobileMenu"
              >
                S'inscrire
              </NuxtLink>
            </li>
            <li class="b-nav__mobile-item">
              <NuxtLink
                to="/blog"
                class="b-nav__mobile-link"
                @click="closeMobileMenu"
              >
                Blog
              </NuxtLink>
            </li>
            <li class="b-nav__mobile-item">
              <NuxtLink
                to="/apropos"
                class="b-nav__mobile-link"
                @click="closeMobileMenu"
              >
                À propos
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
// Mixins
@mixin a-desktop {
  @media (min-width: 768px) {
    @content;
  }
}

@mixin a-mobile {
  @media (max-width: 767px) {
    @content;
  }
}

// Atomic classes
.a-no-scroll {
  overflow: hidden;
  height: 100vh;
  position: fixed; // Ajout pour empêcher le scroll
  width: 100%; // Ajout pour empêcher le scroll
}

// Block
.b-header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: $z-index-header;
}

// Block
.b-nav {
  position: relative;
  background: linear-gradient($color-black 0%, rgba($color-black, 0) 100%);

  // Elements
  &__container {
    height: 100%;
    padding: 1.25rem;
    
    @include a-desktop {
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

  // Desktop elements
  &__desktop {
    &-menu {
      display: none;
      padding: 0 5rem;
      
      @include a-desktop {
        display: flex;
        gap: 2.25rem;
      }
    }

    &-link {
      color: $color-gray-300;
      font-size: 1.25rem;
      transition: color 0.3s ease;
      text-decoration: none;

      &:hover {
        color: $color-white;
      }
    }
  }

  // Mobile elements
  &__mobile {
    &-toggle {
      display: block;
      color: $color-white;
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent; // Ajout pour enlever le fond blanc
      border: none; // Ajout pour enlever le fond blanc
      
      @include a-desktop {
        display: none;
      }

      &:hover {
        color: $color-gray-300;
      }

      &:focus {
        outline: none;
      }
    }

    &-icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    &-menu {
      position: fixed; // Changé de absolute à fixed
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh; // Hauteur fixe
      background: $color-black;
      color: $color-white;
      padding: 1.5rem;
      transition: opacity 0.4s;
      overflow-y: hidden; // Empêche le scroll

      @include a-desktop {
        display: none;
      }

      // Modifier
      &--hidden {
        display: none;
      }
    }

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    &-logo {
      flex-shrink: 0;

      &-img {
        height: 3rem;
      }
    }

    &-close {
      color: $color-white;
      background: transparent;
      border: none;

      &-icon {
        width: 2rem;
        height: 2rem;
      }
    }

    &-links {
      display: flex;
      flex-direction: column;
      gap: 2rem; // Augmenté pour plus d'espacement
      text-align: center;
      list-style: none; // Enlève les tirets
      padding: 0; // Enlève le padding par défaut de la liste
    }

    &-item {
      width: 100%;
    }

    &-link {
      display: block;
      padding: 0.75rem;
      color: $color-gray-200;
      border-radius: 0.5rem;
      transition: background-color 0.3s ease;
      text-decoration: none;
      font-size: 1.5rem; // Augmenté pour meilleure lisibilité

      &:hover {
        background-color: rgba(55, 65, 81, 0.7);
      }
    }
  }
}
</style>