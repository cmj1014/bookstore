<template>
  <div class="container">
    <van-nav-bar
      :title="header_msg"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <Prolist :prolist='prolist' />
    </div>
  </div>
</template>

<script>
import Prolist from '@/components/common/Prolist'
import Vue from 'vue'
import { NavBar } from 'vant'

Vue.use(NavBar)

export default {
  data () {
    return {
      header_msg: '畅销榜',
      prolist: []
    }
  },
  components: {
    Prolist
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  },
  mounted () {
    const { id, msg } = this.$route.params
    this.header_msg = msg
    fetch('https://www.daxunxun.com/douban?count=20&start=' + id * 20)
      .then(res => res.json())
      .then(data => {
        this.prolist = data
      })
  }
}
</script>
