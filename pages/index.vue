<template>
  <div class="contents__wrapper">
    <Contents />
  </div>
</template>

<script>
import Contents from '~/components/Contents.vue'

export default {
  layout: 'top',
  components: {
    Contents
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.contents__wrapper {
  margin: 0;
  padding: 0;
}
</style>
