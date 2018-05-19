<template>
  <div class="page">
    <div class="total">我的积分:<span>{{ total }}</span></div>
    <div class="swiper-tab">  
        <div :class="{'on' : currentTab==0}" @click="swichNav(0)"><span>积分记录</span></div>  
        <div :class="{'on' : currentTab==1}" @click="swichNav(1)"><span>赠送记录</span></div>
        <div :class="{'on' : currentTab==2}" @click="swichNav(2)"><span>关于兑换</span></div>
    </div>  
    <swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
        <swiper-item>  
          <ul class="point-List">
            <li v-for="(item, index) in goleList" :key="index" >
              <p>{{ item.xijiaActivityName }}</p>
              <span>{{ item.xijiaintegralchangedate }}</span>
              <div class="mark">{{ item.xijiaintegralchangegole }}积分</div>
            </li>
          </ul>  
        </swiper-item>
        <swiper-item>  
          <ul class="point-List">
            <li>
              <p>嘉年华积分</p>
              <span>2018-5-30</span>
              <div class="mark">2400积分</div>
            </li>
            <li>
              <p>嘉年华积分</p>
              <span>2018-5-30</span>
              <div class="mark">2400积分</div>
            </li>
          </ul>  
        </swiper-item>
        <swiper-item>  
          <ul class="about">
              <li>
                <div class="title">兑换时间：</div>
                <p>*兑换时间为2018年6月1日-2018年8月1日（以各站点活动时间为准）</p>
              </li>
              <li>
                <div class="title">温馨提示：</div>
                <p>*西甲嘉年华站点获取积分仅限在获得积分站点兑换使用，不可跨站点累积使用（如在A中心获得西甲嘉年华积分不得在B中心西甲嘉年华积分使用或累积）</p>
                <p>*玩家游戏积分需当天在积分柜台录入,并在活动小程序个人账户登记,当天未录入视作放弃该积分</p>
              </li>
          </ul>  
        </swiper-item> 
    </swiper>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      total:'',
      currentTab: 0,
      userId:'',
      goleList:[]
    }
  },
  components: {
  },
  methods: {
    bindChange( e ) {  
      var that = this;
      that.currentTab = e.mp.detail.current;  
    },  
    swichNav(tab) {  
      var that = this;  
      if( that.currentTab === tab) {  
        return false;  
      } else {  
        that.currentTab = tab 
      }
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
          start:1,
          limit:10
        }).then(res => {
          if (res.data.code == '200'){
            self.goleList = res.data.result
            self.total = self.goleList[0].sumGole 
          }
        })
      } 
    })
  }
}
</script>

<style lang="less" scoped>
.total {
  text-align: center;
  height: 160rpx;
  line-height: 160rpx;
  color:#2f2f2f;
  font-size: 32rpx;
  span{
    color:#05a21b;
    font-size: 36rpx;
  }
}
.swiper-tab{  
    position: fixed;
    left:0;
    top:160rpx;
    box-sizing: border-box;
    padding:0 30rpx;
    width: 100%;  
    height:90rpx;
    border-bottom: 1rpx solid #f3f3f3;  
    text-align: center;  
    line-height: 86rpx;
    font-size: 28rpx;
    z-index: 1;
    div{  
        font-size: 30rpx;  
        display: inline-block;  
        width: 33.33%;  
        color: #2f2f2f;  
    }  
    .on{ 
      span{
        display: block;
        width: 180rpx;
        height: 86rpx;
        margin:0 auto;
        color: #05a21b;  
        border-bottom: 5rpx solid #05a21b;
      }
    } 
} 
.swiper-box{ 
  position:absolute;
  display: block;
  top:0;
  left:0;
  height:100%; 
  width: 100%; 
  overflow: hidden;
  padding-top:250rpx;
  box-sizing: border-box;
  .code {
    text-align: center;
    padding-top:240rpx;
    img {
      width: 300rpx;
      height:300rpx;
    }
  }
  ul.point-List{
    padding:0 30rpx;
    li{
      position: relative;
      padding:40rpx 200rpx 40rpx 70rpx;
      line-height: 40rpx;
      border-bottom:#eee solid 1px;
      font-size: 30rpx;
      background:url(../../../static/iconPoint.png) left center no-repeat;
      background-size: 54rpx;
      p{
        color:#2f2f2f;
      }
      span {
        font-size: 24rpx;
        color:#b5b4b4;
      }
      .mark {
        position: absolute;
        right: 0;
        top:40rpx;
        text-align: right;
        width: 200rpx;
        line-height: 80rpx;
        color:#5e5e5e;
      }
    }
  }
  ul.about{
    color:#2f2f2f;
    padding:10rpx 50rpx;
    li{
      padding-top:40rpx;
      padding-left:24rpx;
      background:url(../../../static/point1.png) left 64rpx no-repeat;
      background-size: 8rpx;
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

</style>

