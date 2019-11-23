<template>
  <article>
    <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.fields.slug } }">
      <div class="article__wrapper">
        <div class="thumbnail__wrapper">
          <img
            :src="post.fields.heroImage.fields.file.url"
            class="article__thumbnail"
          />
        </div>
        <time class="article__date">{{
          new Date(post.fields.publishDate).toDateString()
        }}</time>
        <h4 class="article__title">
          {{ post.fields.title }}
        </h4>
        <!--<p class="article__description">{{ post.fields.description }}</p>-->

        <div class="article__tags">
          <nuxt-link
            v-for="tag in post.fields.tags"
            :key="tag"
            :to="{ name: 'tags-tag', params: { tag: tag } }"
            class="article__tag"
            >{{ tag }}</nuxt-link
          >
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
* {
  text-decoration: none;
  color: $gray;
}
.article__wrapper {
  background-color: $white;
  border-radius: 0.1rem;
  padding: 1.5rem;
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.15));
}
.thumbnail__wrapper {
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.article__thumbnail {
  display: block;
  max-height: 300px;
  max-width: 200px;
  margin: 0 auto;
  object-fit: cover;
}

.article__date {
  font-size: 0.7rem;
  margin: 0.3rem 0;
}
.article__title {
  font-size: 1.3rem;
  color: $gray;
  line-height: 1.3;
  margin: 0.4rem 0 0.3rem;
}
.article__description {
  font-size: 0.8rem;
}
.article__tags {
  padding: 1em 0;
  font-size: 0.8rem;
}

.article__tag:link,
.article__tag:visited {
  border-radius: 3px;
  border: 1px solid $gray;
  color: $gray;
  display: inline-block;
  line-height: 1;
  padding: 0.33333rem 0.5rem;
  text-decoration: none;
  margin: auto 0.3rem 0.3rem 0;
}

.article__tag:active,
.article__tag:hover,
.article__tag:focus {
  color: $whitegray;
  border-color: $whitegray;
}
</style>
