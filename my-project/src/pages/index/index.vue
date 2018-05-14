<template>
  <div class="page">
    <div class="header">
      <div class="addr">
        <i></i><span>{{ Address }}</span>
      </div>
      <div class="searchBox">
        <picker class="weui-btn" @change="PickerChange" value="0" :range="Square">
          <span>{{ choiseSquareValue }}</span>
          <i></i>
        </picker>
      </div>
    </div>
    <div class="absView">
      <img v-for="(item, index) in Abs" :key="index" :src="item.img">
    </div>
    <div class="tab">
      <div class="tab1_title bor-1px-b">
        <span>精选活动</span>
      </div>
      <ul class="tab1_content">
        <li v-for="(item, index) in imgUrls" :key="index" @click="goToCaddieList">
          <img :src="item">
        </li>
      </ul>
    </div>
    <div class="tab">
      <div class="tab2_title bor-1px-b">
        <span>专属活动</span>
      </div>
      <ul class="tab2_content">
        <li v-for="(item, index) in imgUrls1" :key="index" @click="goToActivity">
          <img :src="item.img">
          <div class="tab2_content_name">
            <span>{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Abs: [],
      Address: '',
      Square: [
        '万达广场',
        '大润发',
        '家乐福',
        '苏果超市',
        '永辉超市'
      ],
      choiseSquareValue: '选择广场',
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
      imgUrls1: [
        {
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          title: '西甲球童'
        },
        {
          img: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          title: '西甲国家德比大战'
        },
        {
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          title: '球童名单'
        },
        {
          img: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          title: '德比十强'
        }
      ]
    }
  },
  components: {
  },
  methods: {
    PickerChange(e) {
      this.choiseSquareValue = this.Square[e.mp.detail.value]
    },
    goToCaddieList(){
      wx.navigateTo({
        url: '/pages/caddieList/main',
      })
    },
    goToActivity(){
      wx.navigateTo({
        url: '/pages/activityDetail/main',
      })
    }
  },
  created () {
    this.$http.testApi({}).then(res => {
      this.Abs = res.data.data.ad
    })
    this.$http.lunboApi({
      code: '123'
    }).then(res => {
      console.log(res)
    }).catch((cat) => {
      console.log(cat)
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
      font-size: 0;
      padding: 0 30rpx;
      img{
        width: 100%;
        margin: 15px 0 0 0;
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
          width: 330rpx;
          margin: 30rpx 0 0 0;
          border: 1px solid #ddd;
          box-sizing: border-box;
          img{
            width: 100%;
            height: 140rpx;
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

