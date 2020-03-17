<template>
  <div class="p-user-login">
    <div class="login-c">
      <input type="text" v-model="name" class="input" placeholder="name">
      <input type="password" v-model="pwd" class="input" placeholder="pwd">
      <input type="button" value="Login" class="btn" @click="loginClick"/>
    </div>
  </div>
</template>
<script>
import { saveToken } from '@/store/session'
import { apiDoLogin } from '@/api'

export default {
  name: 'Home',
  data() {
    return {
      name: '',
      pwd: '',
    }
  },
  methods: {
    loginClick() {
      if (this.name) {
        this.doLogin()
      }
    },
    async doLogin() {
      const loginInfo = await apiDoLogin({
        name: this.name,
        pwd: this.pwd
      })
      if (loginInfo.ret) {
        saveToken(loginInfo.data)
        this.$router.push({ path: '/' })
      } else {
        this.$Message.error('登录失败，请重试!')
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
  .p-user-login
    width 100%
    height 100%
    position relative
    background #464c5b
  .login-c
    width 400px
    padding 35px
    border 1px solid rgba(255, 255, 255, 0.9)
    position absolute
    left 50%
    top 100px
    transform translate(-50%, 0)
    background rgba(255, 255, 255, 0.2)
  input
    display block
    width 100%
    padding 20px 30px
    margin-bottom 20px
    border 0
    background #FCFCFC
  .btn
    -webkit-appearance button
    display inline-block!important
    padding 20px 30px!important
    background #CD8162
    margin-bottom 0
</style>
