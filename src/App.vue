<template>
  <div id="app">
    <router-view></router-view>
    <router-view name='footer'></router-view>
  </div>
</template>

<style lang="scss">
@import '@/lib/reset.scss';

html, body, #app {
  @include rect(100%, 100%)
}

#app {
  @include flexbox();
  @include flex-direction(column);
  .container {
    @include flex ();
    @include rect(100%, auto);
    @include flexbox();
    @include flex-direction(column);
    header {
      @include rect(100%, 0.6rem);
    }
    .content {
      @include flex();
      @include rect(100%, auto);
      @include overflow;
    }
  }
  footer {
    @include rect(100%, 0.5rem);
    @include background-color(#efefef);
    ul {
      @include rect(100%, 100%);
      @include flexbox();
      li {
        @include flex();
        @include rect(auto, 100%);
        @include flexbox();
        @include flex-direction(column);
        @include justify-content();
        @include align-items();
        span {
          @include font-size(24px);
        }
        p {
          @include font-size(12px);
        }

        &.router-link-active {
          @include color(#f66);
        }
      }
    }
  }
}
</style>
