<template>
  <header class="header__wrapper">
    <div class="header__title">
      <nuxt-link to="/">
        <h1 @click="fetchPosts({ page: 1 })" class="blog__title">sansan</h1>
      </nuxt-link>
      <nav class="nav__wrapper">
        <a href="#"><li class="blog__nav">ABOUT</li></a>
        <a href="#"><li class="blog__nav">WORKS</li></a>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['fetchPosts'])
  }
}
</script>

<style scoped lang="scss">
* {
  text-decoration: none;
}
a {
  color: $white;
}
.header__wrapper {
  background-color: $themecolor;
  z-index: 1;
}
.header__title {
  padding: 0.65rem 2rem;
  margin: 0 auto;
  width: 100%;
  height: 3rem;
}
.blog__title {
  font-size: 1.5rem;
  margin: 0;
  float: left;
  color: $white;
  font-weight: normal;
}

@media screen and (min-width: 0px) and (max-width: 320px) {
  .nav__wrapper {
    display: none;
  }
  .header__title {
    padding: 0.65rem 5%;
  }
}
@media screen and (min-width: 321px) and (max-width: 920px) {
  .nav__wrapper {
    display: none;
  }
  .header__title {
    padding: 0.65rem 5%;
  }
}
@media screen and (min-width: 911px) {
  .nav__wrapper {
    float: right;
    padding: 0.3rem;
    color: $white;
    .blog__nav {
      list-style: none;
      display: inline-block;
      margin: auto 1rem;
    }
  }
}
</style>
