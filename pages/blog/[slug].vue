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
      <h1>{{ post.title }}</h1>

      <!-- Afficher la catégorie -->
      <p class="p-blog-category">Category: {{ post.categories }}</p>
<div v-for="(categories, index) in post.categories" :key="index " v>
  <p class="p-blog-category">Category titre: {{ categories.title }}</p>
</div>
      <div class="p-blog-slug_image">
        <SanityImage :asset-id="post.image.asset._ref" />
      </div>

      <SanityContent v-bind="{ blocks: post.body }" />
    </div>
  </template>