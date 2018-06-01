<template>
  <div class="page">
    <div class="order-info">
      <p class="mall">{{cityName}}({{mallName}})</p>
    </div>
    <ul class="goods-list">
      <li v-for="(item, index) in dataList" :key="index">
        <div class="ticketName">{{ item.ticketName }}</div>
        <div class="price">单价：￥{{ item.ticketPrice }}<span>X{{ item.num }}</span></div>
        <div class="num">数量：{{ item.num }}张</div>
        <p>合计：￥{{ item.ticketPrice*item.num }}</p>
      </li>
    </ul>
    <div class="foot">
      <div class="total">商品总价：<span>￥{{totalMoney}}</span></div>
      <div class="payTotal" @click="payment">确认付款</div>
    </div>
    <div v-show="resShow" class="result">
      <div v-show="resStatus" class="success">支付成功！</div>
      <div v-show="!resStatus" class="fail">支付失败！</div>
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
    return {
      userId:'',
      cityId:'',
      cityName:'',
      mallId:'',
      mallName:'',
      dataList:[],
      totalMoney:0,
      body:'',
      resShow:false,
      resStatus:true
    }
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
    },
    payment(){
      let self = this
      wx.login({
        success: function(res) {
          self.body = `${self.cityId}/${self.mallId}/${self.dataList[0].ticketId}/${self.dataList[0].num}`
          console.log(self.body)
          self.getPayInfo(res.code)
        }
      });
    },
    getPayInfo (code){
      let self = this
      self.$http.getPayInfo({
        code: code,
        userId: self.userId,
        totalFee: self.totalMoney,
        body: self.body
      }).then(result => {
        if (result.data.code == '200'){
          wx.removeStorage({
            key:"mallId"+self.mallId
          })
          self.wxPayment(JSON.parse(result.data.result))
        } else {
          wx.showToast({
            title: result.data.message,
            icon: 'none'
          })
        }
      })
    },
    wxPayment(data){
      let self = this
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': 'prepay_id='+data.prepay_id,
        'signType': 'MD5',
        'paySign': data.paySign,
        'success':function(res){
          console.log(self.resShow,self.resStatus, res)
          wx.redirectTo({
            url: "/pages/payResult/main"
          })
        },
        'fail':function(res){
          self.resShow = true
          self.resStatus = false
          console.log(res)
        }
      })
    }
  },
  created () {
  },
  onShow () {
    let self = this
    self.resShow = false
    wx.getStorage({
      key: 'cityInfo',
      success: function(res) {
        self.cityId = res.data.cityId
        self.cityName = res.data.Address
      } 
    })
    wx.getStorage({
      key: 'mallInfo',
      success: function(res) {
        self.mallId = res.data.mallId
        self.mallName = res.data.mallName
        wx.getStorage({
          key: 'mallId'+self.mallId,
          success: function(res) {
            self.dataList = res.data.choiseList
            self.totalMoney = res.data.totalMoney
          } 
        })
      } 
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        console.log(self.userId);
      } 
    })
  }
}
</script>

<style lang="less" scoped>

  .order-info {
    padding:30rpx 30rpx 0;
    color:#2f2f2f;
    .mall {
      font-size: 34rpx;
      padding:20rpx 0;
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
  .foot{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    background: #eee;
    padding: 0 0 0 30rpx;
    box-sizing: border-box;
    display: flex;
    .total{
      flex: 1;
      color:#2f2f2f;
      font-size: 28rpx;
      span{
        color:#ca0202;
      }
    }
    .payTotal{
      color: #fff;
      font-size: 28rpx;
      width: 400rpx;
      background: #52b960;
      text-align: center;
    }
  }
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

