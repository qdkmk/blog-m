<template>
  <div>
    <section class="body__container">
      <h2 class="items__title">#{{ tag }} ({{ tagPosts.length }})</h2>
      <ul class="items__wrapper">
        <li v-for="post in tagPosts" class="item__list">
          <article-preview :post="post"></article-preview>
        </li>
      </ul>
      <div class="body__more">
        <button
          v-if="noMore && Object.keys(tagPosts).length !== 0"
          @click="fetchMore({ page: indexTagPage, tag: tag })"
          type="button"
          class="more__button"
        >
          More
        </button>
        <p
          v-if="!noMore | (Object.keys(tagPosts).length === 0)"
          class="nomore"
        ></p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ArticlePreview from '~/components/article-preview.vue'

export default {
  layout: 'default',
  components: {
    ArticlePreview
  },
  computed: {
    ...mapGetters(['tagPosts', 'noMore', 'indexTagPage'])
  },
  asyncData({ store, params }) {
    store.dispatch('fetchPosts', { page: 1, tag: params.tag })
    return {
      tag: params.tag
    }
  },
  mounted() {
    this.fetchPosts({ page: 1, tag: this.tag })
  },
  methods: {
    ...mapActions(['fetchPosts', 'fetchMore'])
  }
}
</script>
<style scoped lang="scss">
.items__title {
  font-weight: normal;
  margin: 2rem;
  text-align: center;
}
.items__wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
}
.item__list {
  display: block;
  padding: 1rem;
}
@media screen and (min-width: 0px) and (max-width: 320px) {
  .items__wrapper {
    padding: 0 1rem 1rem;
  }
  .item__list {
    width: 100%;
  }
}
@media screen and (min-width: 321px) and (max-width: 640px) {
  .items__wrapper {
    padding: 0 1rem 1rem;
  }
  .item__list {
    width: 100%;
  }
}
@media screen and (min-width: 640px) {
  .items__wrapper {
    padding: 0 3rem 2rem;
  }
  .item__list {
    width: 50%;
  }
}
.body__more {
  text-align: center;
  margin: auto auto 2rem;
  width: 90%;
}

.more__button {
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  background: $themecolor;
  color: #fff;
  border-bottom: solid 4px #14605f;
  border-radius: 3px;
}
.nomore {
  color: $gray;
  font-size: 1rem;
  display: flex;
  margin: auto 2rem;
  align-items: center;
}
.nomore:before,
.nomore:after {
  content: '';
  flex-grow: 1;
  height: 1px;
  background: $gray;
  display: block;
}
.nomore:before {
  //margin-right: 1rem;
}
.nomore:after {
  //margin-left: 1rem;
}
</style>
