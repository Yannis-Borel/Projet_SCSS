<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";


const filter = ref('')
const page = ref(1)

const perPage = 2

const totalPages = computed(() => {
    if (!totalPosts.value) return 0
    return Math.ceil(totalPosts.value / perPage)
})

const paginationStart = computed(() =>{
  return (page.value - 1) * perPage
})

const paginationEnd = computed(() =>{
  return (page.value ) * perPage
})

const { data: categories } = await useSanityQuery<SanityDocument[]>(groq`*[_type == "category" && defined(slug.current)] | order(title asc)`);
    const { data: posts } = await useSanityQuery<SanityDocument[]>(groq`*[
  _type == "post"
  && defined(slug.current)
 && ($filter == '' || $filter in (categories[]->slug.current)) 
] | order(publishedAt desc)[$start...$end] {
  _id,
  image,
  title,
  slug,
  publishedAt,
  "categories": categories[]->title
}`, { filter: filter, start: paginationStart, end: paginationEnd });

const { data: totalPosts } = await useSanityQuery<number>(groq`count(*[
_type == "post"
  && defined(slug.current)
 && ($filter == '' || $filter in (categories[]->slug.current)) 
])`, { filter: filter });




function onCategoriesClick(categories: SanityDocument) {
    page.value = 1
    if (filter.value === categories.slug.current) {
      filter.value = ''
    } else {
      filter.value = categories.slug.current
    }
}

const { projectId, dataset } = useSanity().client.config();



function onPageClick(index: number) {
  page.value = index
}

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
</script>


  
<template>
    <div class="p-blog">
      <h1 class="p-blog__title">MES PAGES</h1>
      <div v-if="posts && posts.length">
        <!-- Filtres des catégories -->
        <div class="p-blog__categories">
          <div 
            v-for="(category, index) in categories" 
            :key="index" 
            @click="onCategoriesClick(category)" 
            class="p-blog__category"
          >
            {{ category.title }}
          </div>
        </div>
  
        <!-- Contenu des articles -->
        <div class="p-blog__content">
          <div class="p-blog__cards">
            <div 
              class="p-blog__card" 
              v-for="(post, index) in posts" 
              :key="index"
            >
              <NuxtLink :to="`/blog/${post.slug.current}`" class="p-blog__card-link">
                <img
                  v-if="post.image"
                  class="p-blog__card-image"
                  :src="urlFor(post.image)?.url()"
                  :alt="post.title"
                />
                <div class="p-blog__card-info">
                  <h3 class="p-blog__card-title">{{ post.title }}</h3>
                  <div class="p-blog__card-tags">
                    <span 
                      v-for="(category, idx) in post.categories" 
                      :key="idx" 
                      class="p-blog__card-tag"
                    >
                      {{ category }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
  
        <!-- Pagination -->
        <div class="p-blog__pagination">
          <div 
            v-for="n in totalPages" 
            :key="n" 
            :class="['p-blog__pagination-item', { 'p-blog__pagination-item--active': page === n }]" 
            @click="onPageClick(n)"
          >
            Page {{ n }}
          </div>
        </div>
      </div>
      <div v-else>
        Il n'y a aucun article
      </div>
    </div>
  </template>
  
  <style lang="scss">
  // Variables
  :root {
    --primary-color: #0178CB;
    --primary-dark-color: #009959;
    --background-light: #f0f0f0;
    --text-dark: #333;
    --text-light: #000;
    --transition-speed: 0.3s;
  }
  
  // Composant principal
  .p-blog {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Helvetica Neue', sans-serif;
    background-color: var(--background-light);
  
    &__title {
      text-align: center;
      color: var(--primary-color);
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
  
    // Filtres des catégories
    &__categories {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
  
    &__category {
      background-color: var(--background-light);
      color: var(--text-dark);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      text-transform: uppercase;
      transition: background-color var(--transition-speed);
  
      &:hover {
        background-color: var(--primary-color);
        color: white;
      }
  
      &--active {
        background-color: var(--primary-dark-color);
        color: white;
      }
    }
  
    // Contenu principal
    &__content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }
  
    &__cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
  
    &__card {
      background-color: white;
      border-radius: 1rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
  
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }
  
      &-link {
        display: block;
        text-decoration: none;
        color: inherit;
      }
  
      &-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-bottom: 1px solid #e0e0e0;
      }
  
      &-info {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
  
      &-title {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--text-dark);
        margin-bottom: 0.5rem;
      }
  
      &-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
  
      &-tag {
        background-color: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.875rem;
        text-transform: uppercase;
        transition: background-color var(--transition-speed);
  
        &:hover {
          background-color: var(--primary-dark-color);
        }
      }
    }
  
    // Pagination
    &__pagination {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
  
      &-item {
        background-color: var(--background-light);
        color: var(--text-dark);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        transition: background-color var(--transition-speed), color var(--transition-speed);
  
        &:hover {
          background-color: var(--primary-color);
          color: white;
        }
  
        &--active {
          background-color: var(--primary-dark-color);
          color: white;
        }
      }
    }
  }
  
  // Responsive design
  @media screen and (max-width: 600px) {
    .p-blog {
      padding: 1rem;
    }
  
    .p-blog__title {
      font-size: 2rem;
    }
  
    .p-blog__cards {
      grid-template-columns: 1fr;
    }
  }
  </style>
  