<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style>
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
  width: 100%;
  margin: 0;
  padding: 0;
}
.main {
  display: block;
  color: #333;
  background-color: #eee;
  margin: 0;
  padding: 0;
}

@media screen and (min-width: 0px) and (max-width: 320px) {
  .main {
    width: 100%;
  }
}
@media screen and (min-width: 321px) and (max-width: 920px) {
  .main {
    width: 100%;
  }
}
@media screen and (min-width: 911px) {
  .main {
    width: 75%;
  }
}

.side {
  background-color: $white;
  padding: 1rem;
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
