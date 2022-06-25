<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        required
        clearable
        type="number"
        maxlength="11"
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        required
        type="number"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            round
            size="small"
            type="default"
            class="send-sms-btn"
            native-type="button"
            @click="onSendSMS"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSMS } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空！'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误！'
        }],
        code: [{
          required: true,
          message: '验证码不能为空！'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误！'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登陆中...'
      })
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登陆成功！')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误！')
        } else {
          this.$toast.fail('登录失败，请稍后重试！')
        }
      }
    },
    async onSendSMS () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败！', err)
      }
      this.isCountDownShow = true

      try {
        await sendSMS(this.user.mobile)
        this.$toast('发送成功！')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后再试！')
        } else {
          this.$toast('发送失败，请稍后再试！')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    // 清除按钮默认的内边距
    padding: 0;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
