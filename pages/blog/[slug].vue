<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";

// Inclure la catégorie dans la requête
const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    image,
    body,
    "category": category->title 
  }`
;

const route = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, { slug: route.params.slug });

// Renvoyer une page d'erreur si le post n'existe pas
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}

</script>


<template>
    <div v-if="post" class="p-blog-slug">
      <h1>{{ post.title }}</h1>

      <!-- Afficher la catégorie -->
      <p class="p-blog-category">Category: {{ post.category }}</p>
<div v v-for="(category, index) in post.categories" :key="index ">
  <p class="p-blog-category">Category titre: {{ category.title }}</p>
</div>
      <div class="p-blog-slug_image">
        <SanityImage :asset-id="post.image.asset._ref" />
      </div>

      <SanityContent v-bind="{ blocks: post.body }" />
    </div>
  </template>