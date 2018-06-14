<template>
  <div class="page">
      <div class="swiper-box" v-if="dataList.length">
        <div v-for="(item, index) in dataList" :key="index">
          <div class="order-info">
            <p class="title">订单信息 <span class="mall">{{ item.cityName }}({{ item.mallName }})</span></p>
            <ul class="order-list">
              <li><span>订单编号：</span>{{ item.orderSeq }}</li>
              <li><span>下单时间：</span>{{ item.time }}</li>
            </ul>
          </div>
          <ul class="goods-list">
            <li v-for="(item2, index2) in item.list" :key="index2" @click="goCode(item2.orderId)">
              <div class="ticketName">{{ item2.ticketName }}</div>
              <p>单价：￥{{ item2.unitTicketPrice }}</p>
              <p>订单状态：<span>{{ item2.orderStatus === 3 ? '已消费' : (item2.orderStatus === 2 ? '支付失败' : (item2.orderStatus === 1 ? '支付成功' : '待支付')) }}</span></p>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="noData">暂无数据</div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      orderSeq:'',
      dataList:[]
    }
  },
  components: {
  },
  methods: {
    goCode(orderId){
      wx.navigateTo({
        url: "/pages/code/main?orderId=" + orderId
      })
    },
    getData(orderSeq){
      let self = this
      self.$http.ticketDetail({
        userId: self.userId,
        orderSeq:orderSeq
      }).then(res => {
        if (res.data.code == '200'){
          res.data.result.map((item) => {
            item.time = item.createTime ? self.$format.formatT(item.createTime,1) : '--'
          })
          self.dataList = res.data.result
        } else {
          self.dataList = []
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
        }
      })
    }
  },
  created () {
  },
  onLoad(options){
    let self = this
    self.orderSeq = options.orderSeq
    self.dataList = []
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        self.getData(self.orderSeq)
      } 
    })
  }
}
</script>
<style lang="less" scoped>

.swiper-box{ 
  position:absolute;
  display: block;
  top:0;
  left:0;
  height:100%; 
  width: 100%; 
  background:#f9f9f9;
  box-sizing: border-box;
  .order-info {
    color:#2f2f2f;
    background:#fff;
    margin-bottom:10rpx;
    .title {
      margin:0 30rpx;
      font-size: 34rpx;
      line-height: 100rpx;
      border-bottom:#bfbfbf solid 1rpx;
      .mall {
        font-size: 24rpx;
        float: right;
      }
    }
    .order-list {
      font-size: 26rpx;
      line-height: 44rpx;
      padding:60rpx 30rpx; 
      span{
        color:#929292;
      }
      .red {
        color:#ca0202;
      }
    }
  }
  .goods-list {
    font-size: 24rpx;
    line-height: 36rpx;
    li{
      padding:26rpx 30rpx;
      margin-bottom:10rpx;
      color:#2e2e2e;
      line-height: 40rpx;
      font-size: 24rpx;
      background:url("../../../static/jiantright.png") 710rpx center #fff no-repeat;
      background-size: 18rpx auto;
      .ticketName{
        font-size: 26rpx;
      }
      p{
        span{
          color:#ca0202;
        }
      }
    }
  }
} 

</style>

