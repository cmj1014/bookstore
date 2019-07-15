<template>
  <div class="container">
      <header>
        <span class="header_span">书城</span>
        <van-search placeholder="请输入搜索关键词" />
        <router-link to="kind" tag="span" class="iconfont iconfenlei3 header_iconfont"></router-link>
      </header>
      <div class="content">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- 轮播图 -->
          <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) of bannerlist" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
          </van-swipe>
          <!-- 分类导航 -->
          <div class="content_kind">
            <div class="kind_1">
              <span class="iconfont iconningmeng-"></span>
              <span>榜单</span>
            </div>
            <div class="kind_1">
              <span class="iconfont iconfanqie"></span>
              <span>分类</span>
            </div>
            <div class="kind_1">
              <span class="iconfont iconniupai-"></span>
              <span>精品</span>
            </div>
            <div class="kind_1">
              <span class="iconfont icontaozi-"></span>
              <span>完结</span>
            </div>
          </div>
          <!-- 好书推荐 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <Prolist :prolist="prolist" />
          </van-list>
        </van-pull-refresh>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Swipe, SwipeItem, Grid, GridItem, List, PullRefresh } from 'vant'
import Prolist from '@/components/common/Prolist'

Vue.use(Search)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Grid).use(GridItem)
Vue.use(List)
Vue.use(PullRefresh)
export default {
  data () {
    return {
      bannerlist: [],
      prolist: [],
      loading: false,
      finished: false,
      pageNum: 1,
      isLoading: false,
      flag: false
    }
  },
  components: {
    Prolist
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      fetch('https://www.daxunxun.com/douban').then(res => res.json()).then(data => {
        this.isLoading = false // 下拉刷新结束
        this.prolist = data // 重置列表的数据
        this.pageNum = 1 // 重置页码 --- 下拉刷新相当于第一页数据
        this.finished = false // 表示可以继续上拉加载下一页的数据
      })
    },
    onLoad () {
      console.log('可以加载数据了')
      this.loading = true // 开始加载数据
      fetch('https://www.daxunxun.com/douban?count=20&start=' + this.pageNum * 20)
        .then(res => res.json()).then(data => {
          this.loading = false // 数据加载完毕
          this.pageNum++
          if (data.length === 0) {
            console.log('没有数据了')
            this.finished = true // 没有数据了
          } else {
            // 有数据就要涉及到数字的合并   concat
            this.prolist = [...this.prolist, ...data]
          }
        })
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
    fetch('https://www.daxunxun.com/douban')
      .then(res => res.json())
      .then(data => {
        this.prolist = data
      })
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';

header {
  @include flexbox();
  @include justify-content(space-around);
  @include align-items();
  .header_span {
    @include font-size(0.25rem);
    padding-left: 10px;
  }
  .van-search {
    @include flex();
    @include rect(auto, 0.5rem);
  }
  .header_iconfont {
    @include font-size(0.3rem);
    padding-right: 10px;
  }
}
.van-swipe {
  height: 2.3rem;
  img {
    width: 100%;
  }
}
.content_kind {
  @include flexbox();
  @include rect(100%, 0.8rem);
  @include border(0 0 1px 0, #efefef, solid);
  @include padding(0 0 10px 0);
  .kind_1 {
    @include flex();
    @include flexbox();
    @include flex-direction(column);
    @include justify-content();
    @include align-items();
    @include font-size(0.16rem);
    .iconfont {
      @include font-size(0.35rem);
    }
  }
}
</style>
