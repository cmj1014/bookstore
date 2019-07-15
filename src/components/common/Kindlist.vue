<template>
  <ul class="kindlist">
    <!-- 编程式导航 -->
    <li class="kinditem" v-for="(item, index) of kindlist" :key="index" @click="goDeta(item.id)">
      <div class="itemimg">
        <img :src="item.images.small" :alt="item.alt">
      </div>
      <div class="iteminfo">
        <h3>{{ item.title }}</h3>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    kindlist: Array
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
.kindlist {
  @include flexbox();
  @include margin(0.1rem 0 0 0);
  @include flex-wrap(wrap);
  .kinditem {
    @include flexbox();
    @include rect(33%, auto);
    @include padding(0.1rem);
    @include flex-direction(column);
    .itemimg {
      @include rect(100%, auto);
      img {
        @include rect(100%, 100%);
        // @include margin(0.1rem);
      }
    }
    .iteminfo {
      h3 {
        @include font-size(0.12rem);
        @include ellipsis(1);
        @include text-align();
      }
    }
  }
}
</style>
