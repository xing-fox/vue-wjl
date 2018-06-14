<template>
  <div class="page">
      <div class="codeBox" v-if="!!erweima">
        <img class="codeImg" :src="baseUrl+erweima">
        <p>订单编号：<span>{{orderSeq}}</span></p>
      </div>
      <div v-else class="noData">暂无数据</div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      orderId:'',
      erweima:'',
      orderSeq:'',
      baseUrl: this.$http.baseURL
    }
  },
  components: {
  },
  methods: {
    getData(orderId){
      let self = this
      self.$http.getQRCode({
        userId: self.userId,
        orderId:orderId
      }).then(res => {
        if (res.data.code == '200'){
          self.erweima = res.data.result.erweima
          self.orderSeq = res.data.result.orderSeq
        } else {
          self.erweima = ''
          self.orderSeq = ''
        }
      })
    }
  },
  created () {
  },
  onLoad(options){
    let self = this
    self.orderId = options.orderId
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        self.getData(self.orderId)
      } 
    })
  },
  onUnload () {
    let self = this
    self.erweima = ''
    self.orderSeq = ''
  }
}
</script>
<style lang="less" scoped>
.codeBox {
  padding:160rpx 30rpx;
  text-align: center;
  font-size: 26rpx;
  color:#949494;
  img {
    width: 250rpx;
    height: 250rpx;
    margin:0 auto;
  }
  p {
    margin-top:60rpx;
    span{
      color:#323232;
    }
  }
}

</style>

