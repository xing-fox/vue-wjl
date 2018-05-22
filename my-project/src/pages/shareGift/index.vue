<template>
  <div class="page" style="background-image:url(../../../static/zsjftb.jpg)">
    <div class="btn">分享赠送积分</div>
    <div class="about">
      <div class="tit">赠送规则</div>
      <ul>
        <li>
          <div class="title">兑换时间：</div>
          <p>*兑换时间为2018年6月1日-2018年8月1日（以各站点活动时间为准）</p>
        </li>
        <li>
          <div class="title">温馨提示：</div>
          <p>*西甲嘉年华站点获取积分仅限在获得积分站点兑换使用，不可跨站点累积使用（如在A中心获得西甲嘉年华积分不得在B中心西甲嘉年华积分使用或累积）</p>
          <p>*玩家游戏积分需当天在积分柜台录入,并在活动小程序个人账户登记,当天未录入视作放弃该积分。</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      oldPass: '',
      newPass: ''
    }
  },
  components: {
  },
  methods: {
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
.page {
  position:absolute;
  width:100%;
  height:100%;
  box-sizing:border-box;
  padding-top:436rpx;
  background-color:#030304;
  background-position:center top;
  background-repeat:no-repeat;
  background-size:100% auto;
  .btn {
    margin:0 auto 050rpx;
    width:284rpx;
    height:68rpx;
    font-size:26rpx;
    color:#fff;
    text-align:center;
    line-height:68rpx;
    background:#17ae60;
    button {
      margin-bottom:36rpx;
    }
  }
  .about{
    width:690rpx;
    margin:0 auto;
    background:#2d2a2b;
    border-radius:6rpx;
    color:#dcdcdc;
    .tit {
      text-align:center;
      padding-top:50rpx;
      font-size:28rpx;
    }
    ul{
      padding:20rpx 28rpx 50rpx;
      li{
        padding-top:40rpx;
        .title{
          font-size: 28rpx;
          line-height: 48rpx;
          padding:4rpx 0;
        }
        p{
          font-size: 24rpx;
          line-height: 40rpx;
        }
      }
    }
  }
}

</style>

