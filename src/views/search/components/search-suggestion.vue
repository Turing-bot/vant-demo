<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestionsList"
      :key="index"
      :title="text"
      icon="search"
    >
      <span slot="title" v-html="highlight(text)"></span
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestionsList: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 300),
      immediate: true
    }
  },
  created () { },
  mounted () { },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestionsList = data.data.options
      } catch (err) {
        this.$toast('获取建议失败！')
      }
    }

  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
