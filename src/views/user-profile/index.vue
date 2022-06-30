<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="userList.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userList.name"
      is-link
      @click="reviseName = true"
    />
    <van-cell
      title="性别"
      :value="userList.gender === 1 ? '女' : '男'"
      is-link
      @click="reviseGender = true"
    />
    <van-cell title="生日" :value="userList.birthday" is-link />
    <van-popup v-model="reviseName" style="height: 100%" position="bottom">
      <ReviseName
        @close="reviseName = false"
        v-model="userList.name"
        v-if="reviseName"
      />
    </van-popup>
    <van-popup v-model="reviseGender" position="bottom">
      <ReviseGender
        @close="reviseGender = false"
        v-model="userList.gender"
        v-if="reviseGender"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import ReviseName from './components/reviseName.vue'
import ReviseGender from './components/reviseGender.vue'

export default {
  name: 'UserProfile',
  components: {
    ReviseName,
    ReviseGender
  },
  props: {},
  data () {
    return {
      userList: {},
      reviseName: false,
      reviseGender: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.userProfile()
  },
  mounted () { },
  methods: {
    async userProfile () {
      try {
        const { data } = await getUserProfile()
        this.userList = data.data
      } catch (err) {
        this.$toast('获取数据失败！')
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background: #f5f7f9;
  }
}
</style>
