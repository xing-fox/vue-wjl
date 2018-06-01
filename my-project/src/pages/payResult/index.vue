<template>
  <div class="page">
    <div class="result">
      <div class="success">支付成功！</div>
      <div class="result-btn">
        <span @click="goHome">返回首页</span>
        <span @click="goTicket">购票纪录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {
  },
  methods: {
    goHome(){
      wx.switchTab({
        url: "/pages/index/main"
      })
    },
    goTicket(){
      wx.redirectTo({
        url: "/pages/myTicket/main"
      })
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.result {
  position: fixed;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background:#fff;
  .success,.fail {
    font-size: 34rpx;
    color:#2f2f2f;
    padding-top: 390rpx;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center 120rpx;
    background-size: 220rpx;
    background-image: url("../../../static/result-success.jpg");
  }
  .fail {
    background-image: url("../../../static/fail.png");
  }
  .result-btn {
    padding-top:100rpx;
    text-align: center;
    span {
      display: inline-block;
      width:180rpx;
      height: 60rpx;
      font-size: 26rpx;
      margin:0 40rpx;
      line-height: 60rpx;
      border:#52b960 solid 1px;
      border-radius: 8rpx;
    }
  }
}
</style>

