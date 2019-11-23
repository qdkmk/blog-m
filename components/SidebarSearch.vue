<template>
  <div class="sidebar__wrapper">
    <div class="sidebar__about">
      <p class="about__title">このサイトについて</p>
      <h3 class="about__name">
        {{ $store.state.person.items[0].fields.name }}
      </h3>
      <p class="about__description">
        {{ $store.state.person.items[0].fields.shortBio }}
      </p>
    </div>
    <form class="search__wrapper">
      <input v-model="query" class="search__box" placeholder="search" />
      <button @click="searchPosts({ query: query })" class="search__button">
        検索
      </button>
    </form>
    <div class="tagList__wrapper">
      <h3 class="tagList__title"></h3>
      <a href="/tags/javascript"
        ><li class="tagList__tag">
          #javascript
        </li>
      </a>
      <a href="/tags/PWA">
        <li class="tagList__tag">
          #PWA
        </li></a
      >
      <a href="/tags/Scrapbox">
        <li class="tagList__tag">
          #Scrapbox
        </li>
      </a>
      <a href="/tags/ShapeDetectionAPI">
        <li class="tagList__tag">
          #ShapeDetectionAPI
        </li></a
      >
      <a href="/tags/GoogleBooksAPI">
        <li class="tagList__tag">
          #GoogleBooksAPI
        </li></a
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  props: {
    name: {
      type: String,
      default() {
        return 'basho'
      }
    },
    bio: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapActions(['searchPosts'])
  }
}
</script>

<style scoped lang="scss">
.sidebar__profile {
  color: $gray;
  padding: 2rem 1rem 1rem;
  .sidebar__pictureFrame {
    width: 12vw;
    height: 12vw;
    border-radius: 50%;
    overflow: hidden;
    margin: 1rem auto;

    .sidebar__picture {
      width: auto;
      height: 12vw;
    }
  }
  .sidebar__name {
    font-size: 2rem;
    line-height: 1.7;
  }
  .sidebar__title {
    font-size: 1rem;
    line-height: 1.7;
  }
}
.sidebar__about {
  border: 1px solid $themecolor;
  border-radius: 3px;
  color: $gray;
  margin: 1rem;
  .about__title {
    background-color: $themecolor;
    color: #fafafa;
    padding: 0.5rem;
  }
  .about__name {
    padding: 0.5rem;
  }
  .about__description {
    font-size: 0.8rem;
    letter-spacing: 0.01rem;
    line-height: 1.7;
    padding: 0 0.5rem 0.5rem;
  }
}
.search__wrapper {
  display: flex;
  width: 100%;
  margin: 1rem 1rem 0.5rem;
  .search__box {
    position: relative;
    display: block;
    width: 70%;
    padding: 5px;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    color: #a0a0a0;
    outline: none;
  }
  .search__button {
    background-color: $whitegray;
    border: none;
    color: $white;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    width: 20%;
    font-size: 0.8rem;
  }
}
.tagList__wrapper {
  padding: 1rem;
  .tagList__title {
    color: $gray;
    font-size: 1.2rem;
    line-height: 1.7;
    border-bottom: 1px solid $gray;
    margin-bottom: 0.8rem;
  }
  a {
    color: #fafafa;
    text-decoration: none;
  }
  .tagList__tag {
    background-color: $themecolor;
    border-radius: 3px;
    font-size: 0.9rem;
    letter-spacing: 0.03rem;
    list-style: none;
    padding: 0.4rem;
    margin-left: 0.3rem;
    margin-bottom: 0.5rem;
  }
}
</style>
