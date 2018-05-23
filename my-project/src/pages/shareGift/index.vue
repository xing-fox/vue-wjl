<template>
  <div class="page" style="background-image:url(../../../static/zsjftb.jpg)">
    <div class="btn" @click="shadowShow = true">分享赠送积分</div>
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
    <div v-show="shadowShow" class="shadow">
      <div class="box">
        <div class="close" @click="shadowShow = false"></div>
        <div class="title">温馨提示</div>
        <input placeholder-class="p-gray" type="number" placeholder="请输入积分" v-model="point"/>
        <button open-type="share" @click="submit">分享赠送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mallId:'',
      userId:'',
      shadowShow:false,
      point:'',
      giftId:''
    }
  },
  components: {
  },
  methods: {
    submit(){
      let self = this
      if (!self.point) {
        return wx.showToast({
          title: '请输入积分',
          icon: 'none'
        })
      }
      self.$http.shareGift({
        mallId: self.mallId,
        userId: self.userId,
        score: self.point,
      }).then(res => {
        if (res.data.code == '200'){
          self.giftId = res.data.result.id
        }
      })
    }
  },
  created () {
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
      } 
    })
    wx.getStorage({
      key: 'mallId',
      success: function(res) {
        self.mallId = res.data
      } 
    })
  },
  onShareAppMessage: function (res) {
    let self = this
    self.shadowShow = false
    console.log(self.userId);
    return {
      title: '赠送积分',
      path: '/pages/obtailShareGift/main?id='+ self.userId
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  position:absolute;
  width:100%;
  height:100%;
  overflow-y: auto;
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
  .shadow {
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, .7);
    .box{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 578rpx;
      height:418rpx;
      padding:0 30rpx;
      box-sizing: border-box;
      margin:-209rpx 0 0 -289rpx;
      background:#fafafa;
      border-radius: 10rpx;
      text-align: center;
      .close {
        position: absolute;
        top: -60rpx;
        right: 0;
        width: 47rpx;
        height: 47rpx;
        background:url("../../../static/close.png") no-repeat;
        background-size: 100%;
      }
      .title {
        font-size: 38rpx;
        line-height: 100rpx;
        color:#2f2f2f;
        border-bottom:#d2d2d2 solid 1px;
      }
      input {
        margin: 50rpx auto;
        width: 400rpx;
        height: 82rpx;
        text-align: center;
        font-size: 28rpx;
        border:#d2d2d2 solid 1px;
        border-radius: 8rpx;
      }
      button {
        width: 290rpx;
        height: 70rpx;
        color:#fff;
        background:#05a21b;
        border-radius: 45rpx;
      }
    }
  }
}

</style>

