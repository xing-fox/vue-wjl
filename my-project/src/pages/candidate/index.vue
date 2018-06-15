<template>
  <div class="page">
    <div class="searchBox">
      <input type="number" placeholder-class="p-gray" placeholder="请输入编号" v-model="numT"/>
      <span @click="search">搜索</span>
    </div>
    <scroll-view v-if="playerUr.length" class="player_tab" scroll-y @scrolltolower="toLow">
      <div class="player-li" v-for="(item,index) in playerUr" :key="index">
        <button open-type="share">分享</button>
        <img :src="baseUrl+item.voteImage">
        <div class="tab_name">
          <p class="fl">{{item.voteName}}</p>
          <span class="fr">编号：{{item.voteNum}}</span>
        </div>
        <div class="tab_list">
          <p class="fl">{{item.sumVote}}</p>
          <span class="fr" @click="vote(index,item.voteId)">投票</span>
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
      activityid: '',
      userId:'',
      num:'',
      numT:'',
      baseUrl: this.$http.baseURL,
      pageSize:10,
      pageNum: 1,
      hasMore: true,
      playerUr: []
    }
  },
  components: {
  },
  methods: {
    getList(pageNum){
      let self = this
      self.hasMore = false
      self.$http.voteList({
        acId: self.activityid,
        start: pageNum,
        limit:self.pageSize
      }).then(res => {
        if (res.data.code == '200'){
            self.playerUr = self.playerUr.concat(res.data.result)
            if(res.data.result.length == self.pageSize){
              self.hasMore = true
            }
        }
      })
    },
    toLow() {
        if(this.hasMore){
          this.pageNum++;
          this.getList(this.pageNum)
        }
    },
    search(){
      let self = this
      if(self.numT){
        self.hasMore = false
        self.pageNum = 1;
        self.num = self.numT
        self.$http.voteList({
          acId: self.activityid,
          num: self.num,
          start: self.pageNum,
          limit:self.pageSize
        }).then(res => {
          if (res.data.code == '200'){
            self.playerUr = res.data.result
            if(res.data.result.length == self.pageSize){
              self.hasMore = true
            }
          }else{
            self.playerUr = [];
          }
        })
      } else {
        wx.showToast({
          title: '请输入编号',
          icon: 'none'
        })
      }
    },
    vote(index,voteId){
      let self = this
      if(!self.userId){
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration:2000,
          success:function(){
            setTimeout(() => {
              wx.switchTab({
                url: "/pages/own/main"
              })
            },1500)
            
          }
        })
      } else {
        self.$http.voteDo({
          voteId: voteId,
          userId: self.userId
        }).then(res => {
          if (res.data.code == '200'){
            self.playerUr[index].sumVote ++
            wx.showToast({
              title: '投票成功',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        })
      }
      
    }
  },
  created () {
  },
  onLoad (options) {
    let self = this
    self.activityid = options.activityid 
    self.playerUr = []
    self.getList(self.pageNum)
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
      } 
    })
  },
  onShareAppMessage: function (res) {
    let self = this
    return {
      title: '今天，你投票了吗？2018年夏季世界杯火爆朋友圈，最IN的打招呼方式',
      path: '/pages/candidate/main?activityid=' + self.activityid ,
    }
  },
  onUnload () {
    let self = this
    self.activityData = {}
    self.num = ''
    self.numT = ''
    self.pageNum =  1
    self.hasMore = true
  }
}
</script>

<style>
  page{background:#f9f9f9;}
</style>
<style lang="less" scoped>
  .page{
    padding:20rpx 0 0 36rpx;
    .fl{
      float: left;
    }
    .fr{
      float: right;
    }
    .searchBox{
      position: relative;
      z-index: 1;
      width: 100%;
      display: flex;
      flex: 1;
      height:70rpx;
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
    .player_tab{
      position: absolute;
      left:0;
      top:0;
      padding:100rpx 0 0 36rpx;
      width:100%;
      height: 100%;
      box-sizing: border-box;
      .player-li{
        position: relative;
        display: inline-block;
        border:1px solid #e4e4e4;
        background: #fff;
        width:318rpx;
        margin:0 36rpx 20rpx 0;
        height: 440 rpx;
        overflow: hidden;
        border-right:10rpx;
        color: #000;
        button{
          position: absolute;
          right: 0;
          top:0;
          width: 80rpx;
          padding:0;
          height: 50rpx;
          color:#fff;
          font-size: 24rpx;
          line-height: 50rpx;
          background:rgba(0, 0, 0, .4);
        }
        img{
          width:100%;
          height:318rpx;
          border-right:10rpx;
        }
        .tab_name{
          height:58rpx;
          line-height:58rpx;
          font-size:30rpx;
          padding:0 8rpx;
        }
        .tab_list{
          height:48rpx;
          line-height:48rpx;
          margin-bottom:10rpx;
          font-size:34rpx;
          padding:0 8rpx;
          span{
            height:48rpx;
            line-height:48rpx;
            color:#0ba31d;
            border:1px solid #0ba31d;
            padding:0 20rpx;
            border-radius: 6rpx;
          }
        }
      }
    }
  }
</style>

