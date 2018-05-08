<template>
  <div class="page">
    <div class="header">
      <div class="addr">
        <i></i><span>合肥市科学大道</span>
      </div>
      <div class="searchBox">
        <span>选择商场</span>
        <i></i>
      </div>
    </div>
    <div class="absView">
      <img v-for="(item, index) in Abs" :key="index" :src="item.img">
    </div>
    <div class="tab1">
      <div class="tab1_title bor-1px-b">
        <span>精选活动</span>
      </div>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Abs: []
    }
  },
  components: {
  },
  methods: {
  },
  created () {
    this.$http.testApi({}).then(res => {
      console.log(res.data.data.ad.length)
      this.Abs = res.data.data.ad
    })
  }
}
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    padding: 5px 0 0 0;
    .header{
      width: 100%;
      display: flex;
      .addr{
        flex: 1;
        color: #333;
        font-size: 30rpx;
        line-height: 60rpx;
        margin: 0 30rpx;
        i{
          display: inline-block;
          width: 30rpx;
          height: 30rpx;
          background-image: url('../../../static/addr.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
          margin: 0 3px 0 0;
        }
        span{
          vertical-align: middle;
        }
      }
      .searchBox{
        color: #999;
        font-size: 30rpx;
        width: 400rpx;
        height: 60rpx;
        line-height: 60rpx;
        margin: 0 30rpx 0 0;
        padding: 0 0 0 10rpx;
        border-radius: 5rpx;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }
    }
    .absView{
      font-size: 0;
      padding: 0 30rpx;
      img{
        width: 100%;
        margin: 15px 0 0 0;
      }
    }
    .tab1{
      padding: 20rpx 30rpx;
      .tab1_title{
        color: #333;
        font-size: 30rpx;
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 0 0 10rpx;
        border-left: 2px solid #f39f49;
      }
    }
  }
</style>

