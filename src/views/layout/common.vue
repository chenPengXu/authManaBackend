<template>
  <div class="g-app-layout">
    <div class="g-page-nav" v-bind:style="{width: menuWidth}">
      <Nav></Nav>
    </div>
    <div class="g-page-view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from '@/views/nav/Index.vue'
import { mapState } from 'vuex'

const NAVCONFIG = {
  0: '200px',
  1: '60px',
}
export default {
  name: 'App',
  components: {
    Nav,
  },
  computed: {
    ...mapState('nav', {
      menuWidth: (state) => NAVCONFIG[state.menuStatus],
    }),
  },
}
</script>
