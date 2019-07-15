<template>
  <ul class="prolist">
    <div class="prolist_title">好书推荐</div>
    <!-- 编程式导航 -->
    <li class="proitem" v-for="(item, index) of prolist" :key="index" @click="goDeta(item.id)">
      <div class="itemimg">
        <img :src="item.images.small" :alt="item.alt">
      </div>
      <div class="iteminfo">
        <h3>{{ item.title }}</h3>
        <div class="details">
          简介：<span v-for="(itm, idx) of item.casts" :key="idx">{{ item.name }}</span>
        </div>
        <div class="write">
          <span>{{ item.directors[0].name }}</span>
          <span>{{ item.rating.average }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    prolist: Array
  },
  methods: {
    goDeta (id) {
      this.$router.push({ name: 'detail', params: { id: id } })
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.prolist {
  .prolist_title {
    @include padding(0.15rem 0 0 0.1rem);
    @include font-size(0.22rem);
    @include font-weight(500);
  }
  .proitem {
    @include flexbox();
    @include rect(100%, 1.1rem);
    @include padding(0 0 10px 0);
    .itemimg {
      @include rect(1.1rem, 1.1rem);
      img {
        @include rect(0.9rem, 0.9rem);
        @include margin(0.1rem);
      }
    }
    .iteminfo {
      @include flex();
      @include padding(0.05rem 0.2rem 0 0);
      @include flexbox();
      @include flex-direction(column);
      h3 {
        @include font-size(0.16rem);
      }
      .details {
        @include flex();
      }
      .write {
        @include flexbox();
        @include justify-content(space-between);
      }
    }
  }
}
</style>
