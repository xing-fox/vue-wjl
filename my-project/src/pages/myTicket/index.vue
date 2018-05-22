<template>
  <div class="page">
    <div class="swiper-tab">  
        <div :class="{'on' : currentTab==0}" @click="swichNav(0)">购票二维码</div>  
        <div :class="{'on' : currentTab==1}" @click="swichNav(1)">购票记录</div>
    </div>  
      
    <swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
        <swiper-item>  
          <div class="code">
              <img src="../../../static/wxcode.png">
          </div>  
        </swiper-item>  
        <swiper-item>  
          <ul class="ticket-List">
            <li>
              <p>家庭套票（二大一小）</p>
              <span>2018-5-30</span>
              <div class="ticket-no">1张</div>
            </li>
            <li>
              <p>标准（成人）</p>
              <span>2018-5-30</span>
              <div class="ticket-no">1张</div>
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
      currentTab: 0,
      userId:'',
      dataList:[]
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
        self.$http.myTicket({
          userId: self.userId
        }).then(res => {
          if (res.data.code == '200'){
            self.dataList = res.data.result
            console.log(self.dataList)
          }
        })
      } 
    })
  }
}
</script>

<style lang="less" scoped>
.swiper-tab{  
    position: fixed;
    left:0;
    top:0;
    width: 100%;  
    height:90rpx;
    border-bottom: 1rpx solid #f3f3f3;  
    text-align: center;  
    line-height: 90rpx;
    font-size: 28rpx;
    z-index: 1;
    div{  
        font-size: 30rpx;  
        display: inline-block;  
        width: 33.33%;  
        color: #2f2f2f;  
    }  
    .on{ 
      color: #05a21b;  
      border-bottom: 5rpx solid #05a21b;
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
  padding-top:90rpx;
  box-sizing: border-box;
  .code {
    text-align: center;
    padding-top:240rpx;
    img {
      width: 300rpx;
      height:300rpx;
    }
  }
  ul{
    padding:0 30rpx;
    li{
      position: relative;
      padding:40rpx 100rpx 40rpx 0;
      line-height: 40rpx;
      border-bottom:#eee solid 1px;
      font-size: 30rpx;
      p{
        color:#2f2f2f;
      }
      span {
        font-size: 24rpx;
        color:#b5b4b4;
      }
      .ticket-no {
        position: absolute;
        right: 0;
        top:40rpx;
        text-align: right;
        width: 100rpx;
        line-height: 80rpx;
        color:#5e5e5e;
      }
    }
  }
} 

</style>

