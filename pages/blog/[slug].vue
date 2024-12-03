<script setup lang="ts">


const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route  = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, {
    slug: route.params.slug });



</script>

<template>


<div v-if="post" >

<pre> Contenu du post :{{ post.title }} </pre>

<SanityContent :blocks="post.body" />
<SanityImage :asset-id="post.image.asset._ref" />

</div>


</template>

<style lang="scss"></style>