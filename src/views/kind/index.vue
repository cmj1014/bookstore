<template>
  <div class="container">
      <header>书城分类</header>
      <div class="content">
        <div class="content_item1">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item title="小说" @click="goDeta(0)"/>
            <van-sidebar-item title="文学" @click="goDeta(1)"/>
            <van-sidebar-item title="少儿" @click="goDeta(2)"/>
            <van-sidebar-item title="历史" @click="goDeta(3)"/>
            <van-sidebar-item title="哲学/宗教" @click="goDeta(4)"/>
            <van-sidebar-item title="传记" @click="goDeta(5)"/>
            <van-sidebar-item title="社会科学" @click="goDeta(6)"/>
            <van-sidebar-item title="文化" @click="goDeta(7)"/>
            <van-sidebar-item title="政治军事" @click="goDeta(1)"/>
            <van-sidebar-item title="成功/励志" @click="goDeta(2)"/>
            <van-sidebar-item title="中小学教辅" @click="goDeta(3)"/>
            <van-sidebar-item title="外语" @click="goDeta(4)"/>
            <van-sidebar-item title="古籍" @click="goDeta(5)"/>
            <van-sidebar-item title="管理" @click="goDeta(6)"/>
          </van-sidebar>
        </div>
        <div class="content_item2">
          <div class="item2_banner">
            <!-- 轮播图 -->
            <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item, index) of bannerlist" :key="index">
                <img :src="item" alt="">
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="item2_box">
            <div class="item2_box1" @click="goRanking(1, '畅销榜')">
              <img src="../../../public/img/cxb.png" alt="">
            </div>
            <div class="item2_box1" @click="goRanking(2, '新书上架')">
              <img src="../../../public/img/xssj.png" alt="">
            </div>
          </div>
          <div class="item2_content">
            <Kindlist :kindlist='kindlist'/>
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sidebar, SidebarItem, Swipe, SwipeItem } from 'vant'
import Kindlist from '@/components/common/Kindlist'

Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(Swipe).use(SwipeItem)

export default {
  data () {
    return {
      bannerlist: [],
      activeKey: 0,
      kindlist: []
    }
  },
  components: {
    Kindlist
  },
  methods: {
    goDeta (num) {
      fetch('https://www.daxunxun.com/douban?count=20&start=' + num * 20)
        .then(res => res.json()).then(data => {
          this.kindlist = data
        })
    },
    goRanking (id, msg) {
      this.$router.push({ name: 'rankinglist', params: { id: id, msg: msg } })
    }
  },
  mounted () {
    fetch('https://www.daxunxun.com/banner')
      .then(res => res.json())
      .then(data => {
        var arr = []
        data.map(item => {
          item = 'https://www.daxunxun.com' + item
          arr.push(item)
        })
        this.bannerlist = arr
      })
    // 请求的是列表的数据
    fetch('https://www.daxunxun.com/douban').then(res => res.json()).then(data => {
      console.log(data)
      this.kindlist = data
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';

header {
  @include padding(0 0 0.05rem 0);
  @include border(0 0 1px 0, #dddddd, solid);
  @include text-align();
  @include line-height(0.46rem);
  @include font-size(0.2rem);
}
.content {
  @include flexbox();
  .content_item1 {
    @include rect(20%, auto);
    @include overflow;
    a {
       @include color(#333);
    }
  }
  .content_item2 {
    @include flex();
    @include flexbox();
    @include flex-direction(column);
    @include padding(0.1rem);
    .item2_banner {
      @include rect(100%, 1.8rem);
      .van-swipe {
        @include rect(100%, 1.8rem);
        img {
          @include rect(100%, auto);
        }
      }
    }
    .item2_box {
      @include rect(100%, auto);
      @include flexbox();
      @include justify-content(space-between);
      img {
        @include rect(98%, auto);
      }
    }
    .item2_content {
      @include overflow(auto);
    }
  }
}
</style>
