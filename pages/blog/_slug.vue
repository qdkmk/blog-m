<template>
  <div>
    <section class="article__container">
      <div class="article__headline">
        <time class="article__time">{{
          new Date(post.fields.publishDate).toDateString()
        }}</time>
        <h1 class="article__title">{{ post.fields.title }}</h1>
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
      <div class="article__heroImage">
        <img
          :src="post.fields.heroImage.fields.file.url"
          :alt="post.fields.heroImage.fields.description"
        />
      </div>
      <div class="article__body">
        <div v-html="$md.render(post.fields.body)"></div>
      </div>
    </section>
    <section class="related__container">
      <div class="related__title">
        <h3>Related Posts</h3>
      </div>
      <ul class="items__wrapper">
        <li v-for="relatedPost in relatedPosts.items" class="item__list">
          <article-preview :post="relatedPost"></article-preview>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import ArticlePreview from '~/components/article-preview.vue'
import { Prism } from '~/plugins/prism.js'

const client = createClient()

export default {
  layout: 'default',
  components: { ArticlePreview },
  asyncData({ env, params }) {
    return client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug
      })
      .then(async (entries) => {
        return {
          relatedPosts: await client.getEntries({
            content_type: env.CTF_BLOG_POST_TYPE_ID,
            'fields.tags[in]': entries.items[0].fields.tags[0],
            order: '-sys.createdAt',
            limit: 3
          }),
          post: entries.items[0]
        }
      })
      .catch(console.error)
  },
  mounted() {
    Prism.highlightAll()
  }
}
</script>

<style lang="scss" scoped>
//
// tag
//
.article__tags {
  font-size: 0.8rem;
  padding: 0.2rem 0;
}
.article__tag {
  margin: auto 0.3rem 0.3rem 0;

  &:link,
  &:visited {
    color: $themecolor;
    text-decoration: none;
    display: inline-block;
    padding: 0.33333rem 0.5rem;
    line-height: 1;
    border-radius: 3px;
    border: 1px solid $themecolor;
    margin-right: 0.5em;
  }

  &:active,
  &:hover,
  &:focus {
    color: $themecolordark;
    border-color: $themecolordark;
  }
}
//
// header
//
.article__heroImage {
  margin: auto;
  max-height: 500px;
  overflow: hidden;
  vertical-align: bottom;
  img {
    transition: 0.5s ease-in-out;
    height: 100%;
    width: 100%;
  }
  &:hover > img {
    transform: scale(1.03);
  }
}

.article__container {
  background-color: $white;
  .article__time {
    background-color: $whitegray;
    color: $white;
    font-size: 0.6rem;
    padding: 0.4rem;
  }
  .article__headline {
    border-bottom: 3px solid $whitegray;
    margin: 0 auto 2rem;
    padding: 2rem 0 1rem;

    .article__title {
      font-weight: normal;
      font-size: 2.1rem;
      line-height: 1.2;
      margin: 1rem 0 0.5rem;
    }
  }
}
@media screen and (min-width: 0px) and (max-width: 320px) {
  .article__container {
    padding: 0 5% 2rem;
  }
  .article__headline {
    padding: 2rem 0;
  }
}
@media screen and (min-width: 321px) and (max-width: 920px) {
  .article__container {
    padding: 0 5% 2rem;
  }
  .article__headline {
    padding: 2rem 0;
  }
}
@media screen and (min-width: 911px) {
  .article__container {
    padding: 0 10% 2rem;
    width: 80%;
    margin: 0 auto;
  }
}
.article__body {
  width: 100%;
}
.article__body /deep/ {
  * {
    letter-spacing: 0.02rem;
  }
  h1 {
    background-color: $themecolor;
    color: $white;
    font-size: 2rem;
    letter-spacing: 0.06rem;
    padding: 0.5rem 1rem;
  }

  h2 {
    border-bottom: 1px solid $themecolor;
    border-left: solid 1rem $themecolor;
    font-size: 1.8rem;
    letter-spacing: 0.04rem;
    line-height: 2;
    padding: 0.25em 0.5em;
    margin: 2rem auto 2rem 0;
  }
  h3 {
    border-bottom: 1px solid $themecolor;
    border-left: solid 0.5rem $themecolor;
    font-size: 1.5rem;
    line-height: 2;
    padding: 0.25em 0.5em;
    margin: 1.5rem auto 1.5rem 0;
  }
  h4 {
    border-bottom: 1px solid $themecolor;
    font-size: 1.4rem;
    line-height: 1.7;
    padding: 0.25em 0.5em;
  }
  p {
    font-size: 1rem;
    line-height: 1.9;
    margin: 1.7rem auto;
    width: 95%;
  }
  img {
    padding: 1rem;
  }
  a {
    border-bottom: 1px solid $whitegray;
    color: $gray;
    padding-bottom: 0.1rem;
    text-decoration: none;
    &:visited {
      color: $gray;
    }
  }
  @media screen and (min-width: 0px) and (max-width: 320px) {
    pre {
      margin: auto;
      width: 98%;
      font-size: 0.9rem;
    }
  }
  @media screen and (min-width: 321px) and (max-width: 920px) {
    pre {
      margin: auto;
      width: 98%;
      font-size: 0.9rem;
    }
  }
  @media screen and (min-width: 911px) {
    pre {
      margin: auto;
      width: 95%;
    }
  }
  //
  // 目次デザイン
  //
  .table-of-contents {
    background: $white;
    border: 1px solid $whitegray;
    border-radius: 0.2rem;
    color: $gray;
    padding: 1.5rem;
    width: 100%;
    a {
      text-decoration: none;
      border: none;
      color: $gray;
      &:visited {
        color: $gray;
      }
    }
    ul {
      list-style-type: decimal;
      line-height: 2;
      padding-left: 1.5rem;
    }
    &:before {
      content: '<-- 目次 -->';
      font-size: 1rem;
    }
  }
}

.copy {
  padding-bottom: 7em;
}

.copy *:not(div) {
  margin: 2em 0 1em;
}

.copy h3 {
  font-size: 1.35em;
}

.copy ul {
  margin: 0;
  padding-left: 1em;
  list-style: disc;
}

.copy li {
  margin: 0;
}
//
//related posts
//
.related__container {
  margin: auto;
  padding: 2rem;
  text-align: center;
  .related__title {
    background-image: linear-gradient(
      -30deg,
      $themecolordark 20%,
      $themecolor 20%,
      $themecolor 40%,
      $themecolordark 40%,
      $themecolordark 60%,
      $themecolor 60%,
      $themecolor 80%,
      $themecolordark 80%,
      $themecolordark 100%
    );
    color: $white;
    font-size: 1.2rem;
    letter-spacing: 0.03rem;
    margin: 2rem;
    padding: 0.8rem;
  }
}
@media screen and (min-width: 0px) and (max-width: 320px) {
  .related__container {
    padding: 0 5%;
  }
}
@media screen and (min-width: 321px) and (max-width: 920px) {
  .related__container {
    padding: 0 5%;
  }
}
@media screen and (min-width: 911px) {
  .related__container {
    padding: 0 10%;
  }
}
</style>
