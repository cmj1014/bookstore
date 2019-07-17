<template>
  <div class="container">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <div>
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
            />
          </van-checkbox>
        </van-checkbox-group>
        <van-submit-bar
          :price="totalPrice"
          :disabled="!checkedGoods.length"
          :button-text="submitBarText"
          @submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant'

Vue.use(NavBar)

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
        desc: '约250g，2根',
        price: 200,
        num: 1,
        thumb: 'http://image31.bookschina.com/2010/20100211/z4346235.jpg'
      },
      {
        id: '2',
        title: '人类发展',
        desc: '约600g',
        price: 690,
        num: 1,
        thumb: 'http://image31.bookschina.com/2019/zuo/7/7399741.jpg'
      },
      {
        id: '3',
        title: '管理学深度分析',
        desc: '约680g/3个',
        price: 2680,
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
