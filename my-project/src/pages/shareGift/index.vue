<template>
  <div class="page" :style="{ background: bgImg }">
    <div class="shareBtn">
      <input placeholder-class="p-gray" type="number" placeholder="请输入积分" v-model="point"/>
      <button class="btn" @click="submit">分享赠送积分</button>
    </div>
    <div class="about">
      <div class="tit">赠送规则</div>
      <ul>
        <li>
          <div class="title">兑换时间：</div>
          <p>*兑换时间为{{ time }}（以各站点活动时间为准）</p>
        </li>
        <li>
          <div class="title">温馨提示：</div>
          <p>{{ tips }}</p>
        </li>
      </ul>
    </div>
    <div v-show="shadowShow" class="shadow">
      <div class="box">
        <div class="close" @click="shadowShow = false"></div>
        <div class="title">温馨提示</div>
        <div class="txt">当前赠送：{{ point }}积分</div>
        <button open-type="share">分享赠送</button>
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
      maxPoint:0,
      giftId:'',
      time:'',
      tips:'',
      bgImg: 'url('+this.$http.baseURL + 'zsjftb.jpg) center top #030304 no-repeat'
    }
  },
  components: {
  },
  methods: {
    submit(){
      let self = this
      if (!self.point) {
        return self.toast('请输入积分')
      }
      if (isNaN(self.point)) {
        return  self.toast('请输入正确的数字')
      }
      if (self.point < 10) {
        return  self.toast('最少赠送10个积分')
      }
      if (self.point > self.maxPoint) {
        return  self.toast('您目前只有' + self.maxPoint + '积分')
      }
      self.$http.shareGift({
        mallId: self.mallId,
        userId: self.userId,
        score: self.point,
      }).then(res => {
        if (res.data.code == '200'){
          self.giftId = res.data.result.id
          self.shadowShow = true
        } else {
          self.toast(res.data.message)
        }
      })
    },
    toast(msg){
      wx.showToast({
        title: msg,
        icon: 'none'
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
        self.$http.userIntegral({
          userId: self.userId,
          start: 1,
          limit:10
        }).then(res => {
          if (res.data.code == '200'){
            self.maxPoint = res.data.result[0].sumGole
          }
        })
      } 
    })
    wx.getStorage({
      key: 'mallInfo',
      success: function(res) {
        self.mallId = res.data.mallId
        self.$http.getShareDescription({
          mallId:self.mallId 
        }).then(res => {
          if (res.data.code == '200'){
            let resData = res.data.result
            self.time = `${resData.startTime}-${resData.endTime}`
            self.tips = `${resData.tips}`
          }
        })
      } 
    })
  },
  onShareAppMessage: function (res) {
    let self = this
    self.shadowShow = false
    console.log(self.giftId);
    return {
      title: '赠送积分',
      path: '/pages/obtailShareGift/main?id='+ self.giftId
    }
  },
  onUnload () {
    let self = this
    self.shadowShow = false
    self.point = ''
    self.maxPoint = 0
    self.giftId = ''
    self.time = ''
    self.tips = ''
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
  background-size:100% auto !important;
  .shareBtn {
    text-align:center;
    input{
      display:inline-block;
      width:304rpx;
      height:68rpx;
      font-size:28rpx;
      background:#fff;
      border-radius:6rpx;
      vertical-align:top;
      padding:0 10rpx; 
      text-align:left;
    }
    .btn {
      display:inline-block;
      margin:0 0 50rpx 50rpx;
      width:210rpx;
      height:68rpx;
      font-size:28rpx;
      color:#fff;
      line-height:68rpx;
      background:#17ae60;
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
    z-index:2;
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
      .txt {
        margin: 50rpx auto;
        width: 400rpx;
        height: 82rpx;
        text-align: center;
        font-size: 26rpx;
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

