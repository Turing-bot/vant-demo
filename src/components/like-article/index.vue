<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value === 1 }"
    @click="onLike"
    :loading="loading"
  />
</template>

<script>
import { LikeArticle, UnLikeArticle } from '@/api/article'

export default {
  name: 'LikeArticle',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLike () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await UnLikeArticle(this.articleId)
        } else {
          await LikeArticle(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f !important;
  }
}
</style>
