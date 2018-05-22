<template>
  <div class="page" v-if="hasData">
    <div class="searchBox">
      <input type="number" placeholder-class="p-gray" placeholder="请输入编号" v-model="numT" auto-focus/>
      <span @click="search">搜索</span>
    </div>
    <scroll-view v-if="hasData" class="player_tab" scroll-y @scrolltolower="toLow">
      <div class="player-li" v-for="(item,index) in playerUr" :key="index">
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
  </div>
  <div v-else>目前还没有人参与此活动哦</div>
</template>

<script>
export default {
  data () {
    return {
      activityid: '',
      userId:'',
      mallId:'',
      num:'',
      numT:'',
      baseUrl: this.$http.baseURL,
      pageSize:10,
      pageNum: 1,
      hasMore: true,
      hasData:true,
      playerUr: []
    }
  },
  components: {
  },
  methods: {
    getList(pageNum){
      let self = this
      self.goleHasMore = false
      self.$http.voteList({
        acId: self.activityid,
        num: self.num,
        start: pageNum,
        limit:self.pageSize
      }).then(res => {
        if (res.data.code == '200'){
          if(pageNum==1 && !res.data.result.length){
            self.hasData = false 
          } else {
            self.playerUr = self.playerUr.concat(res.data.result)
            if(res.data.result.length == self.pageSize){
              self.hasMore = true
            }
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
        self.goleHasMore = false
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
  },
  created () {
  },
  onLoad (options) {
    let self = this
    // self.activityid = options.activityid 
    self.activityid = 14
    self.getList(self.pageNum)
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
      } 
    })
    
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
        display: inline-block;
        border:1px solid #e4e4e4;
        background: #fff;
        width:318rpx;
        margin:0 36rpx 20rpx 0;
        height: 440 rpx;
        overflow: hidden;
        border-right:10rpx;
        color: #000;
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

