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
    <h1 class="hero__title">{{ title }}</h1>
    
    <!-- Texte de description -->
    <p class="hero__text">{{ text }}</p>
    
    <!-- Section vidéo -->
    <div v-if="videoUrl" class="c-hero__video">
      <video controls autoplay muted loop>
        <source :src="videoUrl" type="video/mp4" />
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
  width: 100%;
  height: 100vh; // La section occupe tout l'écran
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;

  // Vidéo en fond
  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; // Place la vidéo derrière tout
    overflow: hidden;

    video {
      width: 100%;
      height: 100%;
      object-fit: cover; // S'assure que la vidéo remplit tout l'écran
      pointer-events: none; // Empêche toute interaction avec la vidéo
    }
  }

  // Titre
  &__title {
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
    z-index: 2;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  // Texte de description
  &__text {
    font-size: 1.2rem;
    margin-top: 10px;
    margin-bottom: 30px;
    z-index: 2;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  // Statistiques
  &__stats {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 2;

    &__stat {
      background: rgba(255, 255, 255, 0.2); // Semi-transparence pour harmoniser avec la vidéo
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
          color: #ffd700; // Une couleur dorée pour les valeurs
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