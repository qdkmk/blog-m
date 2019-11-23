<template>
  <div>
    <Header />
    <div class="wrapper">
      <div class="top__image">
        <img
          v-parallax.modifier="0.2"
          :src="
            $store.state.person.items[0].fields.image.fields.file.url + '?w=800'
          "
          class="image__first"
        />
        <nuxt-link to="/">
          <h1 @click="fetchPosts({ page: 1 })" class="image__title">sansan</h1>
        </nuxt-link>
      </div>
      <div class="main">
        <nuxt />
      </div>
      <div class="side">
        <Sidebar />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Sidebar from '~/components/Sidebar.vue'
export default {
  components: {
    Header,
    Footer,
    Sidebar
  },
  computed: {},
  async fetch({ store, params }) {
    await store.dispatch('fetchPerson')
  },
  created() {},
  methods: {
    ...mapActions(['fetchPosts'])
  }
}
</script>
<style scoped lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.wrapper {
  background-color: #eee;
  color: #333;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  padding: 0;
}
.top__image {
  line-height: 0;
  position: relative;
  z-index: 0;
  height: 40vh;
  width: 100vw;
  overflow: hidden;
  .image__first {
    width: 100vw;
    height: auto;
    position: absolute;
    bottom: 0;
    z-index: 0;
  }
  .image__title {
    color: #fafafa;
    font-size: 4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.3));
  }
}
.main {
  display: block;
  color: #333;
  background-color: #eee;
  margin: 0;
  position: relative;
  z-index: 1;
}

@media screen and (min-width: 0px) and (max-width: 320px) {
  .main {
    width: 100%;
  }
  .top__image {
    height: 20vh;
  }
}
@media screen and (min-width: 321px) and (max-width: 920px) {
  .main {
    width: 100%;
  }
  .top__image {
    height: 20vh;
  }
}
@media screen and (min-width: 911px) {
  .main {
    width: 75%;
  }
}

.side {
  background-color: #eee;
  padding: 1rem;
  z-index: 1;
}

@media screen and (min-width: 0px) and (max-width: 320px) {
  .side {
    display: none;
  }
}
@media screen and (min-width: 321px) and (max-width: 920px) {
  .side {
    display: none;
  }
}
@media screen and (min-width: 911px) {
  .side {
    display: block;
    width: 25%;
  }
}
</style>
