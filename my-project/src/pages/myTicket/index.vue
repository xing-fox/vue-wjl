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
          <div class="order-info">
            <p class="mall">合肥市(国购广场)</p>
            <p class="title">订单信息</p>
            <ul class="order-list">
              <li><span>订单编号：</span>DSGH00000542</li>
              <li><span>下单时间：</span>2018-07-21 17:00:10:10</li>
              <li><span>订单状态：</span>待消费</li>
            </ul>
            <p class="title">售票类型</p>
          </div>
          <ul class="goods-list">
            <li>
              <div class="ticketName">成人票</div>
              <div class="price">单价：￥30<span>X5</span></div>
              <div class="num">数量：5张</div>
              <p>合计：￥320</p>
            </li>
            <li>
              <div class="ticketName">儿童票</div>
              <div class="price">单价：￥30<span>X5</span></div>
              <div class="num">数量：5张</div>
              <p>合计：￥320</p>
            </li>
          </ul>
          <div class="total">商品总价：<span>￥352</span></div>
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
  onLoad(options){
    let self = this
    self.currentTab = options.tab ? options.tab : 0;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        self.$http.myTicket({
          userId: self.userId,
          start:1,
          limit:10
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
  .order-info {
    padding:30rpx 30rpx 0;
    color:#2f2f2f;
    .mall {
      font-size: 34rpx;
      padding:20rpx 0;
    }
    .title {
      font-size: 28rpx;
      line-height: 72rpx;
      border-bottom:#bfbfbf solid 1rpx;
    }
    .order-list {
      font-size: 28rpx;
      line-height: 44rpx;
      padding:30rpx 0; 
      span{
        color:#929292;
      }
    }
  }
  .goods-list {
    font-size: 24rpx;
    line-height: 36rpx;
    li{
      padding:30rpx;
      border-bottom:#f9f9f9 solid 16rpx;
      .ticketName{
        font-size: 26rpx;
        line-height: 46rpx;
      }
      .price {
        span{
          color:#ca0202;
          float: right;
          font-size: 28rpx;
        }
      }
      p{
        margin-top:40rpx;
        color:#ca0202;
        line-height: 50rpx;
        border-top:#bfbfbf dashed 1rpx;
        border-bottom:#bfbfbf solid 1rpx;
      }
    }
    li:last-child {
      border-bottom: 0;
    }
  }
  .total {
    padding:0 30rpx;
    text-align: right;
    color:#2f2f2f;
    font-size: 28rpx;
    line-height: 70rpx;
    span{
      color:#ca0202;
    }
  }
} 

</style>

