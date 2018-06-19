<template>
  <div class="page">
    <div v-if="dataList.length">
      <p class="title">
        <lable class="lab1">姓名</lable>
        <lable class="lab2">年龄</lable>
      </p>
      <div class="list-scroll">
        <div class="list" v-for="(item,index) in dataList" :key="index">
          <lable class="lab1">{{item.name}}</lable>
          <lable class="lab2">{{item.age}}</lable>
          <lable class="lab3"><span @click="openDetail(item.id)">查看</span></lable>
        </div>
      </div>
    </div>
    <div v-else class="noData">暂无数据</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId:'',
      dataList: [
        {name:'张晓燕',age:'30',id:1},
        {name:'张晓燕',age:'30',id:1}
      ]
    }
  },
  components: {
  },
  methods: {
    openDetail (id){
      wx.navigateTo({
        url: "/pages/useRecordDetail/main?id=" + id
      })
    },
    getList(){
      let self = this
      self.$http.useList({
        userId : self.userId 
      }).then(res => {
        if (res.data.code == '200'){
            self.dataList = self.dataList.concat(res.data.result)
        }
      })
    }
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        // self.dataList = []
        // self.getList()
      } 
    })
  }
}
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  font-size:0;
  color:#2f2f2f;
  line-height:100rpx;
  p{
    margin: 0 30rpx;
    font-size:30rpx !important;
    border-bottom:#e5e5e5 solid 1rpx;
  }
  .list-scroll {
    position: absolute;
    left:0;
    top:0;
    padding:100rpx 30rpx 0;
    width:100%;
    height: 100%;
    box-sizing: border-box;
    
    .list {
      border-bottom:#e5e5e5 solid 1rpx;
    }
  }
  lable {
    display:inline-block;
    font-size:26rpx;
    text-align: center;
    vertical-align: top;
  }
  .lab1 {
    width: 26%;
  }
  .lab2 {
    width: 44%;
  }
  .lab3 {
    width: 30%;
    span {
      border:#a1a1a1 solid 1rpx;
      padding:4rpx 22rpx;
      border-radius: 6rpx;
    }
  }
}
</style>

