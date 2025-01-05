<script lang = "ts">
export default {
  name: 'AppFooter',
};
</script>

<template>
    <footer class="footer">
      <div class="footer__container">
        <!-- Section Contact -->
        <div class="footer__section footer__section--contact">
          <h3 class="footer__title">Contact</h3>
          <div class="footer__content">
            <p class="footer__text">Email: yannis.borel84@gmail.com</p>
            <p class="footer__text">Tél: +33 7 83 01 65 87</p>
          </div>
        </div>
  
        <!-- Section Navigation -->
        <div class="footer__section footer__section--navigation">
          <h3 class="footer__title">Navigation</h3>
          <nav class="footer__nav">
            <ul class="footer__list">
              <li class="footer__item">
                <NuxtLink to="/" class="footer__link">Accueil</NuxtLink>
              </li>
              <li class="footer__item">
                <NuxtLink to="/app/dashboard" class="footer__link">Habitudes</NuxtLink>
              </li>
              <li class="footer__item">
                <NuxtLink to="/apropos" class="footer__link">À propos</NuxtLink>
              </li>
              <li class="footer__item">
                <NuxtLink to="/contact" class="footer__link">Contact</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
  
        <!-- Section Réseaux Sociaux -->
        <div class="footer__section footer__section--social">
          <h3 class="footer__title">Suivez-nous</h3>
          <div class="footer__social-links">
            <a href="#" class="footer__social-link footer__social-link--facebook">Facebook</a>
            <a href="#" class="footer__social-link footer__social-link--twitter">Twitter</a>
            <a href="#" class="footer__social-link footer__social-link--linkedin">LinkedIn</a>
          </div>
        </div>
      </div>
  
      <!-- Copyright -->
      <div class="footer__bottom">
        <p class="footer__copyright">© 2025 Votre Entreprise. Tous droits réservés.</p>
      </div>
    </footer>
  </template>
  
  
  <style lang="scss">
  .footer {
    $self: &;
    background-color: #2c3e50;
    color: #ffffff;
    padding: 2rem 0;
  
    &__container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
  
      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
  
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
  
    &__section {
      padding: 1rem;
  
      &--contact {
        #{$self}__content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      }
  
      &--navigation {
        #{$self}__list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      }
  
      &--social {
        #{$self}__social-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
      }
    }
  
    &__title {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }
  
    &__text {
      margin: 0;
      line-height: 1.5;
    }
  
    &__link {
      color: #ffffff;
      text-decoration: none;
      transition: color 0.3s ease;
  
      &:hover {
        color: #3498db;
      }
    }
  
    &__item {
      margin-bottom: 0.5rem;
    }
  
    &__social-link {
      color: #ffffff;
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.3s ease;
  
      &--facebook:hover {
        background-color: #3b5998;
      }
  
      &--twitter:hover {
        background-color: #1da1f2;
      }
  
      &--linkedin:hover {
        background-color: #0077b5;
      }
    }
  
    &__bottom {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
    }
  
    &__copyright {
      margin: 0;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  </style>
  