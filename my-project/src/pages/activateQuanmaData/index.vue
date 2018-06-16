<template>
  <div class="page">
    <div class="searchBox">
      <input type="number" placeholder-class="p-gray" placeholder="请输入兑换券码" v-model="quanma" focus/>
      <span @click="search">搜索</span>
    </div>
    <div class="result" v-if="dataList.length">
      <p class="title">姓名：{{ name }}</p>
      <ul class="list">
        <li v-for="(item, index) in dataList" :key="index" @click="goToDetail(item.name,item.id)">
          <p>
            <label>活动名称:</label>{{ item.name }}
          </p>
          <p>
            <label>得分:</label>
            <input type="number" disabled :value="item.score"/>
          </p>
        </li>
      </ul>
    </div>
    <div v-else class="noData">暂无数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId:'',
      quanma:'',
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
        url: "/pages/activateDataDetail/main?name=" + name + "&xianxiaId=" + xianxiaId + "&quanma=" + self.quanma
      })
    },
    search(){
      let self = this
      if(self.quanma){
        self.$http.jihuoDataQuanma({
          quanma: self.quanma,
          userId: self.userId
        }).then(res => {
          if (res.data.code == '200'){
            self.name = res.data.result.name
            self.dataList = res.data.result.list
          } else {
            self.name = ''
            self.dataList = []
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        })
      } else {
        wx.showToast({
          title: '请输入兑换券码',
          icon: 'none'
        })
      }
      
    }
  },
  onShow(){
    let self = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        if(self.quanma) {
          self.search();
        }
      } 
    })
  },
  onUnload () {
    let self = this
    self.quanma = ''
    self.name = ''
    self.dataList = []
  }
}
</script>
<style lang="less" scoped>
.page {
  color:#2f2f2f;
  font-size: 30rpx;
  line-height: 60rpx;
  .searchBox{
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    flex: 1;
    height:70rpx;
    padding:60rpx 30rpx 20rpx;
    input{
      width:550rpx;
      height:60rpx;
      background:#fff;
      padding:0 20rpx;
      font-size:30rpx;
      border:1px solid #e4e4e4;
      border-radius:10rpx;
      color:#333;
      box-sizing: border-box;
    }
    span{
      width:94rpx;
      height:56rpx;
      line-height:56rpx;
      font-size:30rpx;
      color:#fff;
      text-align: center;
      background:#00a320;
      display: inline-block;
      border-radius:10rpx;
      margin-left:26rpx;
    }
  }
  .title{
    padding:20rpx 30rpx;
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

