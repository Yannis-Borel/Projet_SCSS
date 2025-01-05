<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";



// Inclure la catégorie dans la requêtesdd
const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    image,
    body,
    "categories": categories[]->title
  }`
;

const route = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, { slug: route.params.slug });
const { urlFor } = useSanityImage();

// Renvoyer une page d'erreur si le post n'existe pas
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}


useSeoMeta({
    title: `${post.value.title} | trackingAPP`,
    ogTitle: post.value.title,
    ogImage: post.value.image && urlFor(post.value.image) ? urlFor(post.value.image)?.url() : '/Photo_didentite.jpg', 
});

</script>


<template>
  <div v-if="post" class="p-blog-slug">
    <h1 class="p-blog-slug__title">{{ post.title }}</h1>

    <!-- Affichage des catégories -->
    <div class="p-blog-slug__categories">
      <p
        v-for="(category, index) in post.categories"
        :key="index"
        class="p-blog-slug__categories-item"
      >
        Category: {{ category }}
      </p>
    </div>

    <!-- Affichage de l'image -->
    <div class="p-blog-slug__image">
      <SanityImage :asset-id="post.image.asset._ref" />
    </div>

    <!-- Contenu -->
    <div class="p-blog-slug__content">
      <SanityContent v-bind="{ blocks: post.body }" />
    </div>
  </div>
</template>


  <style lang="scss">

/* Bloc principal pour le blog post */
.p-blog-slug {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #333;

  /* Titre principal */
  &__title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #222;
  }

  /* Bloc de la catégorie */
  &__categories {
    margin-bottom: 1.5rem;

    /* Élément individuel pour une catégorie */
    &-item {
      font-size: 1rem;
      color: #666;

      /* Modificateur pour une catégorie importante */
      &--highlight {
        color: #007acc;
        font-weight: bold;
      }
    }
  }

  /* Image */
  &__image {
    margin: 1.5rem 0;

    img {
      width: 100%;
      max-width: 200px;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  /* Contenu du post */
  &__content {
    line-height: 1.6;
    color: #444;

    /* Gestion des blocs de texte dans le contenu */
    p {
      margin-bottom: 1rem;
    }

    /* Gestion des titres dans le contenu */
    h2, h3, h4 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #333;
    }

    /* Liens dans le contenu */
    a {
      color: #007acc;
      text-decoration: underline;

      &:hover {
        color: #005f99;
        text-decoration: none;
      }
    }
  }
}
/* Bloc principal pour le blog post */
.p-blog-slug {
  padding: 2rem;
  font-family: Arial, sans-serif;
  color: #333;

  /* Titre principal */
  &__title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #222;
  }

  /* Bloc de la catégorie */
  &__categories {
    margin-bottom: 1.5rem;

    /* Élément individuel pour une catégorie */
    &-item {
      font-size: 1rem;
      color: #666;

      /* Modificateur pour une catégorie importante */
      &--highlight {
        color: #007acc;
        font-weight: bold;
      }
    }
  }

  /* Image */
  &__image {
    margin: 1.5rem 0;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  /* Contenu du post */
  &__content {
    line-height: 1.6;
    color: #444;

    /* Gestion des blocs de texte dans le contenu */
    p {
      margin-bottom: 1rem;
    }

    /* Gestion des titres dans le contenu */
    h2, h3, h4 {
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #333;
    }

    /* Liens dans le contenu */
    a {
      color: #007acc;
      text-decoration: underline;

      &:hover {
        color: #005f99;
        text-decoration: none;
      }
    }
  }
}

</style>