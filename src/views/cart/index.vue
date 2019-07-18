<template>
  <div class="container">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <van-notice-bar
        text="优惠活动:年中大促全场5万册图书5折封顶每满68包邮快来抢购吧！"
        left-icon="volume-o"
      />
      <van-checkbox-group class="card-goods" v-model="checkedGoods">
        <van-checkbox
          class="card-goods__item"
          v-for="item in goods"
          :key="item.id"
          :name="item.id"
        >
          <van-card
            :title="item.title"
            :desc="item.desc"
            :num="item.num"
            :price="formatPrice(item.price)"
            :thumb="item.thumb"
          >
            <div slot="tags">
              <van-tag plain type="danger">标签</van-tag>
              <van-tag plain type="danger">标签</van-tag>
            </div>
            <div slot="footer">
              <van-button size="mini">按钮</van-button>
              <van-button size="mini">按钮</van-button>
            </div>
          </van-card>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="totalPrice"
      :button-text="submitBarText"
      :disabled="!checkedGoods.length"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
      <!-- <span slot="tip">
        你的收货地址不支持同城送, <span>修改地址</span>
      </span> -->
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Checkbox, CheckboxGroup, Card, SubmitBar, Toast, Row, Col, NoticeBar, Icon } from 'vant'

Vue.use(Row).use(Col)
Vue.use(NavBar)
Vue.use(NoticeBar)
Vue.use(Icon)
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data () {
    return {
      checkedGoods: ['1', '2', '3'],
      goods: [{
        id: '1',
        title: '乌合之众',
        desc: '乌合之众',
        price: 2000,
        num: 1,
        thumb: 'http://image31.bookschina.com/2010/20100211/z4346235.jpg'
      },
      {
        id: '2',
        title: '人类发展',
        desc: '人类发展',
        price: 6900,
        num: 1,
        thumb: 'http://image31.bookschina.com/2019/zuo/7/7399741.jpg'
      },
      {
        id: '3',
        title: '管理学深度分析',
        desc: '管理学深度分析',
        price: 6800,
        num: 1,
        thumb: 'http://imgt.bookschina.com/2019/tuangou/11307_20190716091815.jpg'
      }]
    }
  },
  computed: {
    submitBarText () {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },
    totalPrice () {
      return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0)
    }
  },
  methods: {
    formatPrice (price) {
      return (price / 100).toFixed(2)
    },
    onSubmit () {
      Toast('点击结算')
    },
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-goods {
  padding: 10px 0;
  background-color: #fff;
  .card-goods__item {
    position: relative;
    background-color: #fafafa;
    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }
    .van-card__price {
      color: #f44;
    }
  }
}
</style>
