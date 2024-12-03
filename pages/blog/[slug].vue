<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route  = useRoute();

const { data: post } = useSanityQuery(POST_QUERY, {
    slug: route.params.slug });

</script>

<template>


<div>

<pre> Contenu du post : {{ route }} {{ post }} </pre>

</div>


</template>

<style lang="scss"></style>