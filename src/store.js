import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 需要管理的组件的状态
    loginState: 'nook',
    cartlist: []
  },
  getters: {
    totalNum (state) {
      let totalNum = 0
      // for (let i=0;i < state.cartlist.length;i++) {
      //   state.cartlist[i].flag ? totalNum += item.num : totalNum += 0
      // }
      state.cartlist.map(item => {
        item.flag ? totalNum += item.num : totalNum += 0
        // totalNum += item.num
      })
      return totalNum
    },
    totalPrice (state) {
      let totalPrice = 0
      console.log(state.cartlist)
      state.cartlist.map(item => {
        let amoney = item.money
        let newMoney = amoney.split('¥')[1] * 1
        console.log(item.flag)
        console.log(item.id)
        item.flag ? totalPrice += item.num * newMoney : totalPrice += 0
        // console.log(amoney.split('¥')[1])
        // totalPrice = item.num * newMoney
        // totalPrice = parseFloat(totalPrice).toFixed(1)
      })
      return parseFloat(totalPrice).toFixed(1)
    }
  },
  mutations: { // 唯一改变状态的地方
    changeLoginState (state, data) { // state代表的是初始化的数据
      state.loginState = data
    },
    changeCartList (state, data) {
      let newArray = Array.from(new Set(data.result))
      state.cartlist = newArray
    }
  },
  actions: {

  }
})
