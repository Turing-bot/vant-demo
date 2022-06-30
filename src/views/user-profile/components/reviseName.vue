<template>
  <div class="revise-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2 "
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'ReviseName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          return this.$toast('昵称不能为空')
        }
        await updateUserProfile({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        if (err.response && err.response.status === 409) {
          return this.$toast.fail('用户名已存在')
        }
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.field-wrap {
  padding: 20px;
}
</style>
