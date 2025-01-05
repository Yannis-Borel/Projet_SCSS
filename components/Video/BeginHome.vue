<script lang="ts" setup>
defineProps<{
  title: string,
  text: string,  
  stats: { value: string; title: string }[], 
  videoUrl: string, 
}>();
</script>

<template>
  <section class="c-hero">
    
    <!-- Titre principal -->
    <h1 class="c-hero__title">{{ title }}</h1>
    
    <!-- Texte de description -->
    <p class="c-hero__text">{{ text }}</p>
    
    <!-- Section vidéo -->
    <div v-if="videoUrl" class="c-hero__video">
      <video autoplay muted loop>
        <source :src="videoUrl" type="video/mp4" >
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Statistiques -->
    <div class="c-hero__stats">
      <div 
        v-for="(stat, index) in stats" 
        :key="index" 
        class="c-hero__stat"
      >
        <StatCard :value="stat.value" :text="stat.title" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.c-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; // Texte aligné à gauche
  padding-left: 5%; // Espacement du texte par rapport au bord gauche
  color: #fff;
  background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  background-size: 75% 100%; // Limite la largeur du dégradé à 50%
  background-repeat: no-repeat; // Empêche la répétition du dégradé

  // Vidéo en fond
  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // Titre
  &__title {
    font-size: 5rem; // Plus gros titre
    font-weight: bold;
    margin: 0;
    z-index: 2;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }

  // Texte de description
  &__text {
    font-size: 1.5rem; // Texte agrandi
    margin-top: 10px;
    margin-bottom: 30px;
    z-index: 2;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  // Statistiques
  &__stats {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: flex-start; // Statistiques alignées à gauche
    padding-left: 5%;
    z-index: 2;

    &__stat {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 10px;
      padding: 20px;
      width: 150px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease, background 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.4);
        transform: scale(1.05);
      }

      span {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;

        &:first-child {
          font-size: 2rem;
          color: #ffd700;
        }
      }

      @media (max-width: 768px) {
        width: 120px;
        padding: 15px;
      }
    }
  }
}
</style>
