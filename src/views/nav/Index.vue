<template>
  <div class="g-nav">
    <div class="btn" @click="toggleMenu0">
      {{menuToggleTxt}}
    </div>

    <Menu ref="gLeftMenu" active-name="-" theme="dark" width="auto" :open-names="[0]" v-on:on-select="onSubMenuSelect">
      <div v-for="(item, index) in menus" v-bind:key="index">
        <div class="menu-p" v-if="item.meta && item.meta.pType === '1'">
          <Submenu v-bind:name="index">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              {{item.meta.menu}}
            </template>
            <Menu-item v-bind:name="index + '-' + index2" v-for="(link, index2) in item.children" v-bind:key="index2">
              {{link.meta.menu}}
            </Menu-item>
          </Submenu>
        </div>
        <div class="menu link" v-else>
          <Menu-item v-bind:name="index">
            <router-link v-bind:to="item.path">{{item.meta.menu}}</router-link>
          </Menu-item>
        </div>
      </div>
    </Menu>

    <div class="btn" @click="clickLogout">Logout</div>
  </div>
</template>

<script>
/**
 基于页面、按钮等的权限可基于下面的逻辑处理
 基于请求的 Referer（Path） 信息，服务端检查用户是否有该页面权限
 如果是表单提交操作， 基于 Referer（Path） + 提交路径 + 提交类型(GET, POST...) 的检查
 **/
import { mapMutations, mapState } from 'vuex'
import { clearSession } from '@/store/session'
import actions from '@/store/modules/types'

export default {
  name: 'SysNav',
  data() {
    return {
      status: 0,
      menus: [{
        meta: {
          pType: '1',
          menu: ''
        }
      }],
    }
  },
  computed: {
    menuToggleTxt() {
      return this.status === 1 ? '打开' : '收起'
    },
    ...mapState('nav', {
      menuStatus: (state) => state.menuStatus,
      menuArrInfo: (state) => state.menuAuthed,
    }),
  },
  mounted() {
    this.status = this.menuStatus
    this.menus = this.menuArrInfo
  },
  methods: {
    ...mapMutations('nav', {
      setMenuStatus: actions.C_NAV_MENUSTATUS,
    }),
    onSubMenuSelect(key) {
      const temp = key.split('-')
      if (temp.length === 1) {
        this.$router.push({ path: this.menus[temp[0]]['path'] })
        return
      }
      if (temp.length === 2) {
        this.$router.push({ path: this.menus[temp[0]]['children'][temp[1]]['path'] })
      }
    },
    toggleMenu0() {
      this.status = (this.status + 1) % 2
      this.setMenuStatus(this.status)
    },
    clickLogout() {
      clearSession(this.$router)
      this.$router.push({ path: '/login' })
    }
  },
}
</script>

<style lang="stylus">
  .g-nav
    .menu-p
      overflow hidden
    .ivu-menu-submenu-title
    .ivu-menu-item
      width 200px
      white-space nowrap
    .btn
      text-align center
      line-height 48px
      color #fff
</style>
