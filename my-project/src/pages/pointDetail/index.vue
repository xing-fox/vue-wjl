<template>
  <div class="page">
    <div class="total">我的积分:<span>{{ total }}</span></div>
    <div class="swiper-tab">  
        <div :class="{'on' : currentTab==0}" @click="swichNav(0)"><span>积分记录</span></div>  
        <div :class="{'on' : currentTab==1}" @click="swichNav(1)"><span>赠送记录</span></div>
        <div :class="{'on' : currentTab==2}" @click="swichNav(2)"><span>兑换记录</span></div>
        <div :class="{'on' : currentTab==3}" @click="swichNav(3)"><span>关于兑换</span></div>
    </div>  
    <swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
        <swiper-item>  
          <scroll-view v-if="goleList.length" class="point-List" scroll-y @scrolltolower="toLow">
            <div class="list" v-for="(item, index) in goleList" :key="index" >
              <p>{{ item.xijiaActivityName }}</p>
              <span>{{ item.xijiaintegralchangedate }}</span>
              <div class="mark">{{ item.xijiaintegralchangegole }}积分</div>
            </div>
          </scroll-view>
          <div v-else class="noData">暂无数据</div>
        </swiper-item>
        <swiper-item>  
          <scroll-view v-if="giftList.length" class="point-List" scroll-y @scrolltolower="giftToLow">
            <div class="list" v-for="(item, index) in giftList" :key="index" >
              <p>{{ item.mallName }}</p>
              <span>{{ item.createTime }}</span>
              <div class="mark">{{ item.score }}积分</div>
            </div>
          </scroll-view>
          <div v-else class="noData">暂无数据</div> 
        </swiper-item>
        <swiper-item>  
          <scroll-view v-if="DHList.length" class="point-List" scroll-y @scrolltolower="DHToLow">
            <div class="list exchange" v-for="(item, index) in DHList" :key="index" >
              <p>{{ item.mallName }}</p>
              <p class="pt">{{ item.score }}积分</p>
              <span>{{ item.createTime }}</span>
              <div class="mark">{{ item.goodsNum }}游戏币</div>
            </div>
          </scroll-view>
          <div v-else class="noData">暂无数据</div> 
        </swiper-item>
        <swiper-item>  
          <ul class="about">
              <li>
                <div class="title">兑换时间：</div>
                <p>*兑换时间为{{ time }}（以各站点活动时间为准）</p>
              </li>
              <li>
                <div class="title">温馨提示：</div>
                <p>{{ tips }}</p>
              </li>
          </ul>  
        </swiper-item> 
    </swiper>  
  </div>
</template>

<script>
export default {
  data () {
    return {
      mallId:'',
      userId:'',
      total:'',
      currentTab: 0,
      pageSize:10,
      golePageNum: 1,
      goleHasMore: true,
      goleList:[],
      giftPageNum: 1,
      giftHasMore: true,
      giftList:[],
      DHPageNum: 1,
      DHHasMore: true,
      DHList:[],
      time:'',
      tips:'',
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
    getGoleList(pageNum){
      let self = this
      self.goleHasMore = false
      self.$http.userIntegral({
        userId: self.userId,
        start: pageNum,
        limit:self.pageSize
      }).then(res => {
        if (res.data.code == '200'){
          self.goleList = self.goleList.concat(res.data.result)
          self.total = self.goleList[0].sumGole 
          if(res.data.result.length == self.pageSize){
            self.goleHasMore = true
          }
        }
      })
    },
    getGiftList(pageNum){
      let self = this
      self.giftHasMore = false
      self.$http.getShareGift({
        userId: self.userId,
        start: pageNum,
        limit:self.pageSize
      }).then(res => {
        if (res.data.code == '200'){
          self.giftList = self.giftList.concat(res.data.result)
          if(res.data.result.length == self.pageSize){
            self.giftHasMore = true
          }
        }
      })
    },
    getDHList(pageNum){
      let self = this
      self.DHHasMore = false
      self.$http.getDuihuan({
        userId: self.userId,
        start: pageNum,
        limit:self.pageSize,
        mallId:self.mallId
      }).then(res => {
        if (res.data.code == '200'){
          self.DHList = self.DHList.concat(res.data.result)
          if(res.data.result.length == self.pageSize){
            self.DHHasMore = true
          }
        }
      })
    },
    toLow() {
        if(this.goleHasMore){
          this.golePageNum++;
          this.getGoleList(this.golePageNum)
        }
    },
    giftToLow(){
        if(this.giftHasMore){
          this.giftPageNum++;
          this.getGiftList(this.giftPageNum)
        }
    },
    DHToLow(){
        if(this.DHHasMore){
          this.DHPageNum++;
          this.getDHList(this.DHPageNum)
        }
    }
  },
  created () {
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        self.golePageNum = 1
        self.goleHasMore = true
        self.goleList = []
        self.giftPageNum = 1
        self.giftHasMore = true
        self.giftList = []
        self.getGoleList(self.golePageNum)
        self.getGiftList(self.giftPageNum)
      } 
    })
    wx.getStorage({
      key: 'mallInfo',
      success: function(res) {
        self.mallId = res.data.mallId
        self.DHPageNum = 1
        self.DHHasMore = true
        self.DHList = []
        self.getDHList(self.DHPageNum)
        self.$http.getShareDescription({
          mallId:self.mallId 
        }).then(res => {
          if (res.data.code == '200'){
            let resData = res.data.result
            self.time = `${resData.startTime}-${resData.endTime}`
            self.tips = `${resData.tips}`
          }
        })
      } 
    })
  }
}
</script>

<style lang="less" scoped>
.total {
  text-align: center;
  height: 160rpx;
  line-height: 160rpx;
  color:#2f2f2f;
  font-size: 32rpx;
  span{
    color:#05a21b;
    font-size: 36rpx;
  }
}
.swiper-tab{  
    position: fixed;
    left:0;
    top:160rpx;
    box-sizing: border-box;
    padding:0 30rpx;
    width: 100%;  
    height:90rpx;
    border-bottom: 1rpx solid #f3f3f3;  
    text-align: center;  
    line-height: 86rpx;
    font-size: 28rpx;
    z-index: 1;
    div{  
        font-size: 30rpx;  
        display: inline-block;  
        width: 25%;  
        color: #2f2f2f;  
    } 
    span{
        display: block;
        width: 140rpx;
        height: 86rpx;
        margin:0 auto;
    } 
    .on{ 
      span{
        color: #05a21b;  
        border-bottom: 5rpx solid #05a21b;
      }
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
  padding-top:250rpx;
  box-sizing: border-box;
  .code {
    text-align: center;
    padding-top:240rpx;
    img {
      width: 300rpx;
      height:300rpx;
    }
  }
  .point-List{
    padding:0 30rpx;
    box-sizing: border-box;
    height: 100%;
    .list{
      position: relative;
      padding:40rpx 200rpx 40rpx 0;
      line-height: 40rpx;
      border-bottom:#eee solid 1px;
      font-size: 30rpx;
      p{
        color:#2f2f2f;
      }
      .pt {
        font-size: 24rpx;
        line-height: 24rpx;
        padding-top:4rpx;
      }
      span {
        font-size: 24rpx;
        color:#b5b4b4;
      }
      .mark {
        position: absolute;
        right: 0;
        top:40rpx;
        text-align: right;
        width: 200rpx;
        line-height: 80rpx;
        color:#5e5e5e;
      }
    }
    .exchange {
      padding-left:70rpx;
      background:url(../../../static/iconPoint.png) left center no-repeat;
      background-size: 54rpx;
    }
  }
  ul.about{
    color:#2f2f2f;
    padding:10rpx 50rpx;
    li{
      padding-top:40rpx;
      padding-left:24rpx;
      background:url(../../../static/point1.png) left 64rpx no-repeat;
      background-size: 8rpx;
      .title{
        font-size: 28rpx;
        line-height: 48rpx;
        padding:4rpx 0;
      }
      p{
        font-size: 24rpx;
        line-height: 40rpx;
      }
    }
  }
} 

</style>

