<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="加载失败，请点击重试！"
    :immediate-check="false"
  >
    <CommentItem
      :comment="item"
      v-for="(item, index) in list"
      :key="index"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'

export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => { }
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loading = true
    this.onLoad()
  },
  mounted () { },
  methods: {
    async onLoad () {
      try {
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
        this.$emit('onload-success', data.data)
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
