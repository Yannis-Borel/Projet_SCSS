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
      <Pricing />
      <FeaturesSection :features="homepage.features" />
      <PartnersSection :partners="homepage.partners" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
