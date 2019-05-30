<template>
<div class="sf-site-all">
  <navigation />
  <nuxt class="sf-site-content"></nuxt>
  <bottom />
</div>
</template>

<script>
import Bottom from '~/components/Bottom.vue'
import Navigation from '~/components/Navigation.vue'

export default {
  components: {
    Bottom,
    Navigation
  }
}
</script>

<style>
.sf-site-all {
  min-height: 100vh;
  /* 全体の高さを最低でもビューポートの100%にする */
  display: flex;
  /* 子クラスを横並びにする */
  flex-direction: column;
  /* 子クラスの横並びの方向を縦にする */
}

.sf-site-content {
  flex: 1;
  /* flexに1つだけ数値を指定するとその要素は伸びる */
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
