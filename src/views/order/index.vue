<template>
  <div class="container">
    <van-nav-bar title="订单信息" left-arrow @click-left="onClickLeft" />
    <div class="content">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    List,
    NavBar,
    Field,
    Cell,
    CellGroup,
    Button,
    Toast,
    Dialog
  } from 'vant'

  Vue.use(NavBar)
  Vue.use(Field)
  Vue.use(Cell).use(CellGroup)
  Vue.use(Button)
  Vue.use(Toast)
  Vue.use(Dialog)
  Vue.use(List);
  export default {
    data() {
      return {
        list: [1],
        loading: false,
        finished: false
      }
    },
    computed: {

    },
    methods: {
      onClickLeft() {
        this.$router.back()
      },
      onLoad() {
        console.log(this.$store.state.userInfo);
        let tel = this.$store.state.userInfo;
        if ("" !== tel && undefined !== tel) {
          fetch("/api/orders/getUserOrder", {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "tel=" + tel
          }).then(res => res.json()).then(data => {
              console.log(data);
              let orderId = [];// 订单id
               for (var i = 0; i < data.data.length; i++) {
                 //console.log(data.data[i].orderId);
               orderId.push(data.data[i].orderId);
               }
              orderId = Array.from(new Set(orderId));
              let orderIdArr = []; // 每个订单下的购物记录
              for (var i = 0; i < data.data.length; i++) {
                for (var j = 0; j < orderId.length; j++) {
                  if(orderId[j].indexOf(data.data[i].orderId)){
                    orderIdArr[orderId[j]]
                  }

                }
                data.data[i]
              }
          });
        }
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          //console.log(this)
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      beforeRouteEnter(to, from, next) {
        console.log("order");

        next(vm => {
          console.log(vm);
          //验证登录
          if (vm.loginState === 'ok') {
            // 登录成功请求信息
            //console.log("vm.userInfo", vm.userInfo)
            //vm.username = vm.userInfo ? vm.userInfo : '机智的小恐龙'
          } else {
            this.$router.push('../login')
          }
        })
      },
      mounted() {
        console.log("order mounted");
        console.log(this.$store.state.userInfo);
      },
      created() {
        console.log(this.$store.state.userInfo);
      }
    }
  }
</script>
