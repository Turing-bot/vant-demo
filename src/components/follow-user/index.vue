<template>
  <van-button
    class="follow-btn"
    round
    size="small"
    v-if="isFollowed"
    @click="onFollow"
    :loading="followLoading"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-else
    @click="onFollow"
    :loading="followLoading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'

export default {
  name: 'FollowUser',
  components: {},
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false,
      followLoading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onFollow () {
      this.Loading = true
      try {
        if (this.is_followed) {
          await deleteFollow(this.userId)
        } else {
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        let message = '操作失败，请重试！'
        if (err.response && err.response.status === 400) {
          message = '你不能关注自己！'
        }
        this.$toast(message)
      }
      this.Loading = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
