<template>
  <web-view :src="url"></web-view>
</template>

<script>
export default {
  data () {
    return {
      url: '',
      activityData:{},
    }
  },
  components: {
  },
  methods: {
  },
  created () {
  },
  onLoad (options) {
    let self = this
    self.url = options.url
  }
}
</script>
<style lang="less" scoped>
</style>

