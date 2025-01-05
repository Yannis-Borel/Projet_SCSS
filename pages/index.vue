<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

// Requête Sanity avec gestion des erreurs
const { data: homepage } = await useSanityQuery<SanityDocument>(
   groq`*[_type == "homepage"][0]`,
);
</script>

<template>
  <div>
    <div v-if="homepage" class="p-homepage">
      <BeginHome v-bind="homepage.hero" />
    </div>
    <Pricing />
  </div>
</template>

<style lang="scss">
.p-home {
  padding: 2rem;
  font-family: 'Inter', sans-serif;

  &__title {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #0178cb;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__hero {
    text-align: center;
    margin-bottom: 2rem;

    &-title {
      font-size: 2.5rem;
      color: #444;
      margin-bottom: 1rem;
    }

    &-text {
      font-size: 1.2rem;
      color: #666;
      line-height: 1.6;
      text-align: justify;
      margin: 1rem auto;
      max-width: 800px;
    }
  }

  &__stats {
    list-style: none;
    padding: 0;
    margin: 2rem auto;
    max-width: 800px;

    &-item {
      font-size: 1.2rem;
      margin: 0.8rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      strong {
        color: #0178cb;
        font-size: 1.4rem;
        font-weight: bold;
      }

      span {
        color: #444;
      }
    }
  }

  &__image {
    margin-top: 1.5rem;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  }

  // Responsive
  @media screen and (max-width: 768px) {
    &__title {
      font-size: 2rem;
    }

    &__hero-title {
      font-size: 1.8rem;
    }

    &__hero-text {
      font-size: 1rem;
    }

    &__stats-item {
      font-size: 1rem;

      strong {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
