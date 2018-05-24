<template>
  <div class="page">
    <div class="header">
      <div class="addr">
        <i @click="getLocationInfo"></i>
        <picker class="weui-btn" @change="CityChange" :range="cityData" :range-key="'cityName'">
          <span>{{ Address }}</span>
        </picker>
      </div>
      <div class="searchBox">
        <picker @change="PickerChange" :range="Square" :range-key="'mallName'">
          <span>{{ choiseSquareValue }}</span>
          <i></i>
        </picker>
      </div>
    </div>
    <swiper class="absView" indicator-dots="true" autoplay="true">
      <block v-for="(item, index) in Abs" :key="index">
        <swiper-item>
          <img :src="baseUrl+item.bannerImage" @click="goToUrl(item.bannerUrl)"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="tab">
      <div class="tab1_title bor-1px-b">
        <span>精选活动</span>
      </div>
      <ul class="tab1_content">
        <li v-for="(item, index) in imgUrls" :key="index" @click="goToActivityHome(item.activityId)">
          <img :src="baseUrl+item.activityPic">
          <div><span>{{ item.activityName }}</span></div>
        </li>
      </ul>
    </div>
    <div class="tab">
      <div class="tab2_title bor-1px-b">
        <span>专属活动</span>
      </div>
      <ul v-if="imgUrls1.length" class="tab2_content">
        <li v-for="(item, index) in imgUrls1" :key="index">
          <img :src="baseUrl+item.activityPic" @click="goToActivity(item.activityId,item.type)">
          <div class="tab2_content_name">
            <span>{{ item.activityName }}</span>
          </div>
          <div v-if="!item.status" class="mask">敬请期待</div>
        </li>
      </ul>
      <div v-else class="noData">暂无数据</div> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Abs: [],
      cityData:[],
      cityId: '',
      Address: '',
      Square: [],
      mallId: '',
      choiseSquareValue: '选择商场',
      imgUrls: [],
      imgUrls1: [],
      baseUrl: this.$http.baseURL
    }
  },
  components: {},
  methods: {
    goToActivity(id,type){
      wx.navigateTo({
        url: '/pages/activityDetail/main?activityid=' + id +'&type=' + type
      })
    },
    goToActivityHome(id){
      wx.navigateTo({
        url: '/pages/activityHomeDetail/main?activityid=' + id 
      })
    },
    goToCity(){
      wx.navigateTo({
        url: '/pages/activityDetail/main',
      })
    },
    goToUrl (url){
      if(url){
        wx.navigateTo({
          url: '/pages/openUrl/main?url=' + url,
        })
      }
    },
    getLocationInfo(){
      let self = this
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          self.$http.listByGeno({
            ing:res.longitude,
            lat:res.latitude
          }).then(res => {
            if (res.data.code == '200'){
              self.Address = `${res.data.result[0].cityName}`
              self.cityId = res.data.result[0].cityId
              let cityInfo = {
                cityId:self.cityId,
                Address:self.Address
              }
              wx.setStorage({
                key:"cityInfo",
                data: cityInfo
              })
            }else {
              wx.showToast({
                title: '当前城市暂无活动，尽情期待～',
                icon: 'none',
              })
            }
            self.getMallData()
          })
        },
        fail:function(){
          wx.showToast({
            title: '定位失败，您可手动切换城市参与活动～',
            icon: 'none',
            complete:function(){
              self.getMallData()
            }
          })
        }
      })
    },
    getMallData(){
      let self = this
      self.$http.mallList({
        id:  self.cityId
      }).then(res => {
        if (res.data.code == '200'){
          self.Square = res.data.result
          self.choiseSquareValue = self.Square[0].mallName
          self.mallId =  self.Square[0].mallId
          self.getActivityList()
        }
      })
    },
    getActivityList(){
      let self = this
      wx.setStorage({
        key:"mallInfo",
        data:{mallId:self.mallId,mallName:self.choiseSquareValue}
      })
      self.$http.activityList({
        mId: self.mallId
      }).then(res => {
        if (res.data.code == '200'){
          self.imgUrls1 = res.data.result;
        } else {
          self.imgUrls1 = []
        }
      })
    },
    CityChange(e){
      let self = this
      self.Address = self.cityData[e.mp.detail.value].cityName
      self.cityId =  self.cityData[e.mp.detail.value].cityId
      let cityInfo = {
        cityId:self.cityId,
        Address:self.Address
      }
      wx.setStorage({
        key:"cityInfo",
        data:cityInfo
      })
      self.getMallData()
    },
    PickerChange(e) {
      let self = this
      self.choiseSquareValue = self.Square[e.mp.detail.value].mallName
      self.mallId =  self.Square[e.mp.detail.value].mallId
      self.getActivityList()
    }
  },
  created () {
    let self = this
    self.$http.cityList({}).then(res => {
      if (res.data.code == '200'){
        self.cityData = res.data.result;
        self.Address = self.cityData[0].cityName
        self.cityId =  self.cityData[0].cityId
      }
    })
    self.$http.lunboApi({}).then(res => {
      if (res.data.code == '200'){
        self.Abs = res.data.result;
      }
    })
    self.$http.activityHomeList({}).then(res => {
      if (res.data.code == '200'){
        self.imgUrls = res.data.result;
      }
    })
  },
  onLoad () {
    let self = this
    wx.getStorage({
      key: 'cityInfo',
      success: function(res) {
        self.Address = res.data.Address
        self.cityId =  res.data.cityId
        self.getMallData()
      },
      fail: function(){
        self.getLocationInfo()
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
        .weui-btn {
          display: inline-block;
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
      height:  320rpx;
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
          position: relative;
          width: 330rpx;
          height: 126rpx;
          margin: 25rpx 0 0 0;
          border-radius: 3px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
          div{
            position: absolute;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            background:rgba(0, 0, 0, .3);
          }
          span {
            display: block;
            position: absolute;
            right: 18rpx;
            bottom: 18rpx;
            font-size: 24rpx;
            color:#fff;
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

