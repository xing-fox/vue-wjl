<template>
  <div class="page">
    <div class="top">
      <img :src="activityData.activityPic">
    </div>
    <div class="caddie-list">
      <div class="title" @click="goToCandidate">
        <div class="cont">球童候选人</div>
      </div>
      <div class="box">
        <img src="../../../static/qiutong1.png">
        <button>投票</button>
      </div>
      <div class="box">
        <img src="../../../static/qiutong1.png">
        <button>投票</button>
      </div>
      <div class="box">
        <img src="../../../static/qiutong1.png">
        <button>投票</button>
      </div>
    </div>
    <div class="act-info">
      <div class="title"><span>活动摘要</span></div>
      <div class="list">
        <p>活动时间：2018-5-30-2018-8-30</p>
        <p>截止时间：2018-8-30 18:00</p>
        <p>主办方：{{ activityData.zhuban }}</p>
        <p class="tel">客服热线：{{ activityData.kefu }}</p>
      </div>
      <div class="title"><span>活动须知</span></div>
      <div class="cont">{{ activityData.activityDetails }}</div>
    </div>
    <div class="btn" @click="goToBuy">
      <button type="primary">立即购票参与活动</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productId: '',
      activityData:{},
    }
  },
  components: {
  },
  methods: {
    goToCandidate(){
      wx.navigateTo({
        url: '/pages/candidate/main',
      })
    },
    goToBuy(){
      wx.navigateTo({
        url: '/pages/buyCard/main',
      })
    }
  },
  created () {
  },
  onLoad (options) {
    let self = this
    self.productId = options.id
    self.$http.activityDetail({
      activityId: self.productId
    }).then(res => {
      if (res.data.code == '200'){
        self.activityData = res.data.result[0];
        wx.setNavigationBarTitle({
          title: self.activityData.activityName + '详情'
        })
      }
    })
  }
}
</script>
<style lang="less" scoped>
.page {
  .top {
    img {
      width: 100%;
    }
  }
  .caddie-list {
    margin:64rpx 30rpx 20rpx;
    padding:54rpx 0 34rpx;
    border:#02a319 solid 1rpx;
    border-radius: 5rpx;
    font-size: 0;
    position: relative;
    .title {
      position: absolute;
      top:-30rpx;
      left:50%;
      margin-left:-80rpx;
      padding:6rpx 8rpx;
      border:#02a319 solid 1rpx;
      background:#fff;
      .cont {
        width: 140rpx;
        height: 42rpx;
        line-height: 42rpx;
        font-size: 24rpx;
        color:#02a319;
        border:#02a319 solid 1rpx;
        text-align: center;
      }
    }
    .box {
      display: inline-block;
      text-align: center;
      width: 33.3%;
      img{
        width: 146rpx;
        height:146rpx;
      }
      button {
        margin: 36rpx auto 0;
        width: 116rpx;
        height: 38rpx;
        font-size: 24rpx;
        line-height: 38rpx;
        color:#02a319;
        border:#02a319 solid 1rpx;
        background:#fff;
        border-radius: 4rpx;
      }
    }
    .name i{
      background-image:url(../../../static/name.png);
      background-size: 33rpx auto;
    }
    .phone i{
      background-image:url(../../../static/phone.png);
      background-size: 29rpx auto;
    }
    .password i{
      background-image:url(../../../static/pass.png);
      background-size: 30rpx auto;
    }
  }
  .act-info {
    padding:0 30rpx 65rpx;
    font-size: 24rpx;
    line-height: 40rpx;
    color:#333;
    .title {
      margin-bottom:18rpx;
      border-bottom: #e5e5e5 solid 1px;
      color:#333;
      font-size: 26rpx;
      line-height: 64rpx;
      span {
        display: inline-block;
        border-bottom: #02a319 solid 4rpx;
      }
    }
    .list {
      margin-bottom: 18rpx;
      p{
        padding-left:36rpx;
        background:url(../../../static/diangray.png) left center no-repeat;
        background-size: 10rpx; 
      }
      .tel {
        background:url(../../../static/phoneicon.png) left center no-repeat;
        background-size: 28rpx; 
      }
    }
    .cont {
      margin-bottom: 18rpx;
      p{
        text-indent: 48rpx;
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    button {
      border-radius: 0;
    }
  }
}

</style>

