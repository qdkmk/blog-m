<template>
  <section class="body__container">
    <div class="items__title">
      <h2 class="">Recent articles</h2>
    </div>
    <div class="search__wrapper">
      <input
        @keydown.enter="searchPosts({ query: query })"
        v-model="query"
        class="search__box"
      />
      <button
        @click="searchPosts({ query: query })"
        name="submit"
        class="search__button"
      >
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
    </div>

    <ul class="items__wrapper">
      <li v-for="post in posts" class="item__list">
        <article-preview :post="post"></article-preview>
      </li>
    </ul>
    <div class="body__more">
      <button
        v-if="noMore && Object.keys(posts).length !== 0"
        @click="fetchMore({ page: indexPage })"
        type="button"
        class="more__button"
      >
        More
      </button>
      <p v-if="!noMore | (Object.keys(posts).length === 0)" class="nomore"></p>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ArticlePreview from '~/components/article-preview.vue'

export default {
  components: {
    ArticlePreview
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters(['posts', 'noMore', 'indexPage'])
  },
  async fetch({ store }) {
    if (!process.browser) {
      await store.dispatch('fetchPosts')
    }
  },
  mounted() {
    this.fetchPosts({ page: 1 })
  },
  methods: {
    ...mapActions(['fetchPosts', 'fetchMore', 'searchPosts'])
  }
}
</script>

<style lang="scss">
.body__container {
  background-color: $white;
  display: block;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 90%;
}
.items__title {
  font-weight: normal;
  padding: 1.5rem;
  text-align: center;
  h2 {
    font-weight: normal;
  }
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
  .body__container {
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
  .body__container {
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
//
// search
//
.search__wrapper {
  position: relative;
  margin: 1rem auto;
  max-width: 500px;
  min-height: 3rem;
  .search__box {
    background-color: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    font-size: 1.2rem;
    padding: 0.5rem;
    padding-left: 3rem;
    width: 100%;
  }
  .search__button {
    appearance: none;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: $gray;
    cursor: pointer;
    display: block;
    font-size: 1.2rem;
    margin: auto;
    outline: none;
    padding: 0;
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
@media screen and (min-width: 0px) and (max-width: 320px) {
  .search__wrapper {
    max-width: 80%;
  }
}
@media screen and (min-width: 321px) and (max-width: 640px) {
  .search__wrapper {
    max-width: 80%;
  }
}
.body__more {
  text-align: center;
  margin: auto auto;
  width: 90%;
}

.more__button {
  background: $themecolor;
  border-bottom: solid 4px $themecolordark;
  border-radius: 2px;
  color: #fff;
  display: block;
  margin: auto;
  padding: 0.5em;
  text-decoration: none;
  width: 20%;
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
