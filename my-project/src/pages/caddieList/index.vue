<template>
  <div class="page">
    <div class="swiper-tab">  
        <div :class="{'on' : currentTab==0}" @click="swichNav(0)">投票排行榜</div>  
        <div :class="{'on' : currentTab==1}" @click="swichNav(1)">投票结果</div>
    </div>  
    <swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
        <swiper-item>
          <scroll-view v-if="playerList.length" class="point-List" scroll-y @scrolltolower="toLow">
             <div class="listBox">
              <div class="listTip xbox">
                <div class="tl">排名</div>
                <div class="tc">球童姓名</div>
                <div class="tr">投票数</div>
              </div>

              <div class="xbox player_tab" v-for="(item,index) in playerList" :key="index">
                <div class="tl">{{item.voteId}}</div>
                <div class="tc"><img :src="baseUrl+item.voteImage">{{item.voteName}}</div>
                <div class="tr">{{item.voteNum}}</div>
              </div>
            </div>
          </scroll-view>
          <div v-else class="noData">暂无数据</div>   
         
        </swiper-item>
        <swiper-item>  
          <scroll-view v-if="RList.length" class="point-List" scroll-y @scrolltolower="RtoLow">
             <div class="listBox">
              <div class="listTip xbox">
                <div class="tl">排名</div>
                <div class="tc">球童姓名</div>
                <div class="tr">投票数</div>
              </div>

              <div class="xbox player_tab" v-for="(item,index) in RList" :key="index">
                <div class="tl">{{item.voteId}}</div>
                <div class="tc"><img :src="baseUrl+item.voteImage">{{item.voteName}}</div>
                <div class="tr">{{item.voteNum}}</div>
              </div>
            </div>
          </scroll-view>
          <div v-else class="noData">暂无数据</div>  
        </swiper-item>
    </swiper> 
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      mallId:'',
      currentTab: 0,
      pageSize:10,
      playerPageNum: 1,
      playerHasMore: true,
      playerList:[],
      RPageNum: 1,
      RHasMore: true,
      RList:[],
      baseUrl: this.$http.baseURL
    }
  },
  components: {
  },
  methods: {
    bindChange( e ) {  
      var that = this;
      that.currentTab = e.mp.detail.current;  
    }, 
    swichNav(tab) {  
      var that = this;  
      if( that.currentTab === tab) {  
        return false;  
      } else {  
        that.currentTab = tab 
      }
    },
    getList(pageNum){
      let self = this
      self.playerHasMore = false
      self.$http.listTp({
        type: '1',
        start: pageNum,
        limit:self.pageSize,
        mallId:self.mallId
      }).then(res => {
        if (res.data.code == '200'){
          self.playerList = self.playerList.concat(res.data.result)
          if(res.data.result.length == self.pageSize){
            self.playerHasMore = true
          }
        }
      })
    },
    getRList(pageNum){
      let self = this
      self.RHasMore = false
      self.$http.listTp({
        type: '2',
        start: pageNum,
        limit:self.pageSize,
        mallId:self.mallId
      }).then(res => {
        if (res.data.code == '200'){
          self.RList = self.RList.concat(res.data.result)
          if(res.data.result.length == self.pageSize){
            self.RHasMore = true
          }
        }
      })
    },
    toLow() {
      if(this.playerHasMore){
        this.playerPageNum++;
        this.getList(this.playerPageNum)
      }
    },
    RtoLow(){
      if(this.RHasMore){
        this.RPageNum++;
        this.getRList(this.RPageNum)
      }
    }
  },
  created () {
  },
  onLoad (options) {
    let self = this
    wx.getStorage({
      key: 'mallInfo',
      success: function(res) {
        self.mallId = res.data.mallId
        self.playerPageNum = 1
        self.playerHasMore = true
        self.playerList = []
        self.getList(self.playerPageNum)
        self.RPageNum = 1
        self.RHasMore = true
        self.RList = []
        self.getRList(self.RPageNum)
      } 
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
  }
}
</script>

<style lang="less" scoped>
  .page{
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:40rpx 30rpx 0;
    .swiper-tab{  
      position: relative;
      z-index: 1;
      display: flex;
      width: 100%;
      height:52rpx;
      line-height: 52rpx;
      color: #02a319;
      text-align: center;
      font-size: 26rpx;
      border-radius: 4rpx;
      border:#02a319 solid 1rpx;
      justify-content:space-between;
      div{  
        flex: 1; 
      }  
      .on{ 
        color:#fff;
        background: #05a21b;
      } 
    } 
    .swiper-box{ 
      position:absolute;
      display: block;
      top:0;
      left:0;
      height:100%; 
      width: 100%; 
      overflow: hidden;
      padding:160rpx 30rpx 0;
      box-sizing: border-box;
      .listBox {
        border-radius: 20rpx;
        background:#fdfdfd;
        box-shadow:0 0 10px 1rpx rgba(0, 0, 0, .05) inset;
      }
      .xbox{
        display:flex;
        font-size:28rpx;
        height: 108rpx;
        text-align:center;
        line-height: 108rpx;
      }
      .tl{
        width: 20%;
      }
      .tc{
         width: 50%;
      }
      .tr{
         width: 30%;
      }
      .player_tab{
        width:100%;  
        font-size:28rpx;   
        border-top:1px solid #eee;
        img{
          width:70rpx;
          height:70rpx;
          border-radius:50%;
          margin-right:20rpx;
          vertical-align:middle;
        }
      }
    } 
  }
</style>