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
      totalMoney:0
    }
  },
  components: {
  },
  methods: {
    payment(){
      let self = this
      wx.login({
      success: function(res) {
        console.log(res)
        let body = ''
        self.dataList.map((item) => {
          body += item.ticketId + '/' + item.num + ','
        })
        console.log(body);
        self.$http.getPayInfo({
          code: res.code,
          userId: self.userId,
          totalFee: self.totalMoney,
          body: body
        }).then(result => {
          if (result.data.code == '200'){
            let resD = JSON.parse(result.data.result);
            console.log(JSON.parse(result.data.result));
            wx.requestPayment({
              'timeStamp': resD.timeStamp,
              'nonceStr': resD.nonceStr,
              'package': resD.package,
              'signType': 'MD5',
              'paySign': resD.paySign,
              'success':function(res){
                console.log(res)
              },
              'fail':function(res){
                console.log(res)
              }
            })
          } else {
            self.imgUrls1 = []
          }
          
        })
      }
    });
    }
  },
  created () {
  },
  onShow () {
    let self = this
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

</style>

