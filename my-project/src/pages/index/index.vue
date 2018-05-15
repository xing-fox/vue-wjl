<template>
  <div class="page">
    <div class="header">
      <div class="addr">
        <i></i><span>{{ Address }}</span>
      </div>
      <div class="searchBox">
        <picker class="weui-btn" @change="PickerChange" :range="Square" :range-key="'mallName'">
          <span>{{ choiseSquareValue }}</span>
          <i></i>
        </picker>
      </div>
    </div>
    <swiper class="absView" indicator-dots="true" autoplay="true">
      <block v-for="(item, index) in Abs" :key="index">
        <swiper-item>
          <img :src="item.bannerImage"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="tab">
      <div class="tab1_title bor-1px-b">
        <span>精选活动</span>
      </div>
      <ul class="tab1_content">
        <li v-for="(item, index) in imgUrls" :key="index">
          <img :src="item.activityPic">
        </li>
      </ul>
    </div>
    <div class="tab">
      <div class="tab2_title bor-1px-b">
        <span>专属活动</span>
      </div>
      <ul class="tab2_content">
        <li v-for="(item, index) in imgUrls1" :key="index">
          <img :src="item.activityPic" @click="goToActivity(item.activityId)">
          <div class="tab2_content_name">
            <span>{{ item.activityName }}</span>
          </div>
          <div v-if="!item.status" class="mask">敬请期待</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cityId: '2',
      Abs: [],
      Address: '',
      Square: [],
      choiseSquareValue: '选择广场',
      imgUrls: [],
      imgUrls1: []
    }
  },
  components: {},
  methods: {
    PickerChange(e) {
      this.choiseSquareValue = this.Square[e.mp.detail.value].mallName
    },
    goToActivity(id){
      wx.navigateTo({
        url: '/pages/activityDetail/main?id=' + id
      })
    },
    goToCity(){
      wx.navigateTo({
        url: '/pages/activityDetail/main',
      })
    }
  },
  created () {
    this.$http.mallList({
      id:  this.cityId
    }).then(res => {
      if (res.data.code == '200'){
        this.Square = res.data.result;
      }
    })
    this.$http.lunboApi({}).then(res => {
      if (res.data.code == '200'){
        this.Abs = res.data.result;
      }
    })
    this.$http.activityList({
      mId: this.cityId
    }).then(res => {
      if (res.data.code == '200'){
        this.imgUrls1 = res.data.result;
      }
    })
    this.$http.activityHomeList({}).then(res => {
      if (res.data.code == '200'){
        this.imgUrls = res.data.result;
      }
    })
  },
  onLoad () {
    let self = this
    wx.getUserInfo({
      success: function(res) {
        self.Address = `${res.userInfo.province} ${res.userInfo.city}`
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    padding: 5px 0 0 0;
    .header{
      width: 100%;
      display: flex;
      .addr{
        flex: 1;
        color: #333;
        font-size: 30rpx;
        line-height: 60rpx;
        margin: 0 30rpx;
        i{
          display: inline-block;
          width: 30rpx;
          height: 30rpx;
          background-image: url('../../../static/addr.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: middle;
          margin: 0 3px 0 0;
        }
        span{
          vertical-align: middle;
        }
      }
      .searchBox{
        color: #999;
        font-size: 30rpx;
        width: 400rpx;
        height: 60rpx;
        line-height: 60rpx;
        margin: 0 30rpx 0 0;
        padding: 0 0 0 10rpx;
        border-radius: 5rpx;
        border: 1px solid #ccc;
        box-sizing: border-box;
        position: relative;
        i{
          display: inline-block;
          width: 0;
          height: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 15px;
          margin: auto 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #333;
        }
      }
    }
    .absView{
      margin: 20rpx 0 0 0;
      font-size: 0;
      padding: 0 30rpx;
      img {
        width: 100%;
        height:  320rpx;
      }
    }
    .tab{
      padding: 20rpx 30rpx;
      .tab1_title{
        color: #333;
        font-size: 30rpx;
        height: 50rpx;
        span{
          display: inline-block;
          line-height: 35rpx;
          padding: 0 0 0 10rpx;
          border-left: 2px solid #f39f49;
        }
      }
      .tab1_content{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        li{
          width: 330rpx;
          height: 126rpx;
          margin: 25rpx 0 0 0;
          border-radius: 3px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
      .tab2_title{
        color: #333;
        font-size: 30rpx;
        height: 50rpx;
        span{
          display: inline-block;
          line-height: 35rpx;
          padding: 0 0 0 10rpx;
          border-left: 2px solid #f39f49;
        }
      }
      .tab2_content{
        font-size: 0;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
        li{
          position: relative;
          width: 330rpx;
          margin: 30rpx 0 0 0;
          border: 1px solid #ddd;
          box-sizing: border-box;
          img{
            width: 100%;
            height: 140rpx;
          }
          .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            color:rgba(255, 255, 255, .6);
            font-size: 24rpx;
            line-height: 180rpx;
            text-align: center;
            background-color: rgba(0, 0, 0, .45)
          }
        }
        .tab2_content_name{
          color: #999;
          font-size: 28rpx;
          width: 100%;
          line-height: 50rpx;
          text-align: center;
        }
      }
    }
  }
</style>

