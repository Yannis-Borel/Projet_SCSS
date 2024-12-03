<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, image, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
    
</script>

<template>

    <div class="p-blog">
        <ul class="p-blog__list">
            <li v-for="post in posts" :key="post._id">
  <NuxtLink v-if="post.slug?.current" :to="`/blog/${post.slug.current}`">
    {{ post.title }}
  </NuxtLink>
  <img v-if="post.image" :src="urlFor(post.image)?.url()" alt="image" >
</li>

       </ul>
      
        page de Blog

    </div>
</template>

<style lang="scss">

.p-blog {
    &__list {
        list-style: none;
        margin: 0;
        padding: 0;
    }

}


</style>