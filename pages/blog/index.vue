<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";


const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, image, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const { projectId, dataset } = useSanity().client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

definePageMeta({
    layout: 'minimal'
})
</script>

<template>
    <main>
        <div>
            <h1>Blog</h1>
                <ul>
                    <li v-for="post in posts" :key="post._id">
                        <NuxtLink :to="`/blog/${post.slug.current}`">
                            <p>{{ post.title }}</p>
                            <img v-if="post.image" :src="urlFor(post.image)?.url()" alt="" >
                            <div v-else>No images</div>
                        </NuxtLink>

                    </li>
                </ul>
        </div>
    </main>

</template> 

<style lang = "scss">
</style>