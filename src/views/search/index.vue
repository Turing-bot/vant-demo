<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <SearchResult v-if="isResultShow" />
    <SearchHistory v-else-if="searchText" />
    <SearchSuggestion v-else :searchText="searchText" />
  </div>
</template>

<script>
import SearchResult from './components/search-result.vue'
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'

export default {
  name: 'SearchContainer',
  components: {
    SearchResult,
    SearchHistory,
    SearchSuggestion
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}

</script>

<style scoped lang="less">
// .search-container {
//   .van-search__action {
//     color: #fff;
//   }
// }
</style>
