<template>
  <div class="page">
      <scroll-view class="swiper-box" v-if="dataList.length" scroll-y @scrolltolower="toLow">
        <div class="order-info" v-for="(item, index) in dataList" :key="index">
          <p class="title">订单信息 <span class="mall">{{ item.cityName }}({{ item.mallName }})</span></p>
          <ul class="order-list">
            <li><span>订单编号：</span>{{ item.orderSeq }}</li>
            <li><span>下单时间：</span>{{ item.time }}</li>
            <li><span>订单状态：</span><span class="red">{{ item.oStatus }}</span></li>
          </ul>
          <div v-if="!item.detailShow" @click="item.detailShow=true" class="show"><span>展开</span></div>
          <div v-else @click="item.detailShow=false" class="show"><span>收起</span></div>
          <div v-if="item.detailShow">
            <ul class="goods-list">
              <li v-for="(item2, index2) in item.list" :key="index2">
                <div class="ticketName">{{ item2.ticketName }}</div>
                <div class="price">单价：￥{{ item2.unitTicketPrice }}<span>X{{ item2.orderNum }}</span></div>
                <div class="num">数量：{{ item2.orderNum }}张</div>
                <p>合计：￥{{ item2.orderPrice }}</p>
              </li>
            </ul>
          </div>
        </div>
      </scroll-view>
      <div v-else class="noData">暂无数据</div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      pageSize:6,
      pageNum: 1,
      hasMore: true,
      dataList:[]
    }
  },
  components: {
  },
  methods: {
    getList(pageNum){
      let self = this
      self.hasMore = false
      self.$http.myTicket({
        userId: self.userId,
        start:pageNum,
        limit:self.pageSize
      }).then(res => {
        if (res.data.code == '200'){
          res.data.result.map((item) => {
            item.detailShow = false
            item.time = item.createTime ? self.$format.formatT(item.createTime,1) : '--'
            item.oStatus = item.orderStatus === 2 ? '已消费' : (item.orderStatus === 1 ? '已支付' : '未支付')
          })
          self.dataList = self.dataList.concat(res.data.result)
          console.log(self.dataList)
          if(res.data.result.length == self.pageSize){
            self.hasMore = true
          }
        }
      })
    },
    toLow(){
      if(this.hasMore){
        this.pageNum++;
        this.getList(this.pageNum)
      }
    }
  },
  created () {
  },
  onLoad(){
    let self = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.dataList = []
        self.hasMore = true
        self.pageNum = 1
        self.userId = res.data.userId
        self.getList(self.pageNum)
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
    margin-bottom:10rpx;
    background:#fff;
    .mall {
      font-size: 26rpx;
      float: right;
    }
    .title {
      margin:0 30rpx;
      font-size: 34rpx;
      line-height: 100rpx;
      border-bottom:#bfbfbf solid 1rpx;
    }
    .order-list {
      font-size: 28rpx;
      line-height: 44rpx;
      padding:30rpx 30rpx 0; 
      span{
        color:#929292;
      }
      .red {
        color:#ca0202;
      }
    }
    .show{
      margin:0 30rpx;
      text-align: right;
      color:#929292;
      font-size: 24rpx;
      padding-bottom: 20rpx;
      span {
        display: inline-block;
        padding-top:24rpx;
        background:url("../../../static/arrow-up.jpg") center 0 no-repeat;
        background-size: 36rpx;
      }
    }
  }
  .goods-list {
    font-size: 24rpx;
    line-height: 36rpx;
    li{
      padding:30rpx;
      border-bottom:#f9f9f9 solid 10rpx;
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

