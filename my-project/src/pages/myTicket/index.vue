<template>
  <div class="page">
      <scroll-view class="swiper-box" v-if="dataList.length" scroll-y @scrolltolower="toLow">
        <div class="order-info" v-for="(item, index) in dataList" :key="index">
          <p class="title">订单信息 <span class="mall">{{ item.cityName }}({{ item.mallName }})</span></p>
          <ul class="order-list" @click="goDetail(item.orderSeq)">
            <li><span>订单编号：</span>{{ item.orderSeq }}</li>
            <li><span>下单时间：</span>{{ item.time }}</li>
          </ul>
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
    goDetail(orderSeq){
      wx.navigateTo({
        url: "/pages/orderDetail/main?orderSeq=" + orderSeq
      })
    },
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
            item.time = item.createTime ? self.$format.formatT(item.createTime,1) : '--'
          })
          self.dataList = self.dataList.concat(res.data.result)
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
      padding:60rpx 0;
      margin:0 30rpx; 
      background:url("../../../static/jiantright.png") right center no-repeat;
      background-size: 18rpx auto;
      span{
        color:#929292;
      }
    }
  }
} 

</style>

