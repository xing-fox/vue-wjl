<template>
  <div class="page">
    <div v-if="resultData.length">
      <div class="swiper-tab">  
          <div :class="{'on' : currentTab==0}" @click="swichNav(0)">{{title1}}</div>  
          <div :class="{'on' : currentTab==1}" @click="swichNav(1)">{{title2}}</div>
      </div>  
      <swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
          <swiper-item>
            <div class="teamLogo">
              <img :src="baseUrl+resultData[0].img">
              <p>进球总数：{{resultData[0].sumBall}}</p>
            </div>
            <div v-if="resultData[0].list.length" class="point-List">
              <div class="listBox">
                <div class="listTip xbox">
                  <div class="tl">排名</div>
                  <div class="tc">姓名</div>
                  <div class="tr">进球数</div>
                </div>

                <div class="xbox player_tab" v-for="(item,index) in resultData[0].list" :key="index">
                  <div class="tl">{{item.id}}</div>
                  <div class="tc"><img :src="item.img">{{item.userName}}</div>
                  <div class="tr">{{item.ballNum}}</div>
                </div>
              </div>
            </div>
            <div v-else class="noData">暂无数据</div>   
          
          </swiper-item>
          <swiper-item>  
            <div class="teamLogo">
              <img :src="baseUrl+resultData[1].img">
              <p>进球总数：{{resultData[1].sumBall}}</p>
            </div>
            <div v-if="resultData[1].list.length" class="point-List">
              <div class="listBox">
                <div class="listTip xbox">
                  <div class="tl">排名</div>
                  <div class="tc">姓名</div>
                  <div class="tr">进球数</div>
                </div>

                <div class="xbox player_tab" v-for="(item,index) in resultData[1].list" :key="index">
                  <div class="tl">{{item.id}}</div>
                  <div class="tc"><img :src="item.img">{{item.userName}}</div>
                  <div class="tr">{{item.ballNum}}</div>
                </div>
              </div>
            </div>
            <div v-else class="noData">暂无数据</div>  
          </swiper-item>
      </swiper> 
    </div>
    <div v-else class="noData">暂无数据</div>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      mallId:'',
      currentTab: 0,
      title1:'球队',
      title2:'球队',
      resultData:[],
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
    getList(){
      let self = this
      self.$http.debiRank({
        mallId:self.mallId
      }).then(res => {
        if (res.data.code == '200'){
          self.resultData = res.data.result
          self.title1 =  self.resultData[0].teamName
          self.title2 =  self.resultData[1].teamName
        }
      })
    }
  },
  created () {
  },
  onLoad (options) {
    let self = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
      } 
    })
    wx.getStorage({
      key: 'mallInfo',
      success: function(res) {
        self.mallId = res.data.mallId
        self.getList()
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
      .teamLogo {
        text-align: center;
        font-size: 30rpx;
        padding-bottom: 30rpx;
        img {
          width:150rpx;
          height: 140rpx;
          background:#ccc;
          margin-bottom: 20rpx;
        }
      }
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