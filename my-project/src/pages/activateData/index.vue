<template>
  <div class="page">
    <p class="title">姓名：{{ name }}</p>
    <ul class="list" v-if="dataList.length" >
      <li v-for="(item, index) in dataList" :key="index" @click="goToDetail(item.name,item.id)">
        <p>
          <label>活动名称:</label>{{ item.name }}
        </p>
        <p>
          <label>得分:</label>
          <input type="number" readonly :value="item.score"/>
        </p>
      </li>
    </ul>
    <div v-else class="noData">暂无数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId:'',
      orderId:'',
      name:'',
      dataList: []
    }
  },
  components: {
  },
  methods: {
    goToDetail(name,xianxiaId){
      let self = this
      wx.navigateTo({
        url: "/pages/activateDataDetail/main?name=" + name + "&xianxiaId=" + xianxiaId + "&orderId=" + self.orderId
      })
    }
  },
  onLoad (options) {
    let self = this
    self.orderId = options.orderId
  },
  onShow(){
    let self = this
    self.name = ''
    self.dataList = []
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        self.$http.jihuoData({
          orderId: self.orderId,
          userId: self.userId
        }).then(res => {
          if (res.data.code == '200'){
            self.name = res.data.result.name
            self.dataList = res.data.result.list
          }
        })
      } 
    })
  }
}
</script>
<style lang="less" scoped>
.page {
  color:#2f2f2f;
  font-size: 30rpx;
  line-height: 60rpx;
  .title{
    padding:60rpx 30rpx 20rpx;
  }
  ul{
    font-size: 0;
    li {
      display: inline-block;
      width: 48%;
      font-size: 30rpx;
      box-sizing: border-box;
      padding:30rpx;
      margin:1%;
      border:#f5f5f5 solid 1px;
      p{
        position: relative;
        padding:0 0 10rpx 134rpx;
        input {
          box-sizing: border-box;
          padding: 0 10rpx;
          width: 100%;
          height: 60rpx;
          line-height: 60rpx;
          border:#f5f5f5 solid 1px;
        }
      }
      label {
        position: absolute;
        left: 0;
        top:0;
        display: block;
        width: 134rpx;
      }
    }
  }
  
}
</style>

