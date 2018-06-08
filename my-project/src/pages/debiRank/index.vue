<template>
  <div class="page">
    <div class="swiper-tab">  
        <div :class="{'on' : currentTab==0}" @click="swichNav(0)">投票排行榜</div>  
        <div :class="{'on' : currentTab==1}" @click="swichNav(1)">投票结果</div>
    </div>  
    <swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
        <swiper-item>  
          <div class="listTip xbox">
            <div class="xbox-1-3 tl">排名</div>
            <div class="xbox-1-3 tc">球童姓名</div>
            <div class="xbox-1-3 tr">投票数</div>
          </div>

          <div class="xbox player_tab" v-for="(item,index) in playerUr" :key="index">
            <div class="xbox-1-3 tl">{{item.number}}</div>
            <div class="xbox-1-3 tc"><img :src="item.img">{{item.name}}</div>
            <div class="xbox-1-3 tr">{{item.list}}</div>
          </div>
        </swiper-item>
        <swiper-item>  
          <!-- <scroll-view v-if="giftList.length" class="point-List" scroll-y @scrolltolower="giftToLow">
            <div class="list" v-for="(item, index) in giftList" :key="index" >
              <p>{{ item.mallName }}</p>
              <span>{{ item.createTime }}</span>
              <div class="mark">{{ item.score }}积分</div>
            </div>
          </scroll-view>
          <div v-else class="noData">暂无数据</div>  -->
        </swiper-item>
    </swiper> 
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTab: 0,
      playerUr: [
        {
          img: '../../../static/qiutonglist.png',
          name: '小一',
          number: '1',
          list: '256',
        },
        {
          img: '../../../static/qiutonglist.png',
          name: '小二',
          number: '2',
          list: '1252',
        },
        {
          img: '../../../static/qiutonglist.png',
          name: '小三',
          number: '3',
          list: '2303',
        },
        {
          img:'../../../static/qiutonglist.png',
          name: '小四',
          number: '4',
          list: '28',
        }
      ]
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
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
  .page{
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:0 30rpx;
    .xbox{display:-webkit-flex;display:flex;font-size:34rpx;height: 120rpx;line-height: 120rpx;}
    .xbox-1-3{width: 33.3328%;}
    .tl{text-align: left}
    .tc{text-align:center}
    .tr{text-align:right}
    .player_tab{
      width:100%;  
      font-size:34rpx;   
      border-top:1px solid #eee;
      img{
        width:75rpx;
        height:75rpx;
        border-radius:50%;
        margin-right:20rpx;
        vertical-align:middle;
      }
    }
    .swiper-tab{  
      position: relative;
      z-index: 1;
      display: flex;
      box-sizing: border-box;
      width: 100%;
      height:56rpx;
      line-height: 56rpx;
      color: #02a319;
      text-align: center;
      font-size: 24rpx;
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
      padding:100rpx 30rpx 0;
      box-sizing: border-box;
    } 
  }
</style>