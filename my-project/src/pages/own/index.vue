<template>
  <div class="page">
    <div class="top" :style="{ background: bgImg }">
      <i></i>
      <p v-if="!!userId">当前积分：{{ total }}</p>
    </div>
    <ul v-if="!!userId" class="nav-list">
      <li>
        <div @click="openTicket">
          <i class="icon1"></i>
          购票记录
        </div>
      </li>
      <li>
        <div  @click="openShareGift">
          <i class="icon2"></i>
          赠送积分
        </div>
      </li>
      <li>
        <div  @click="openPoint">
          <i class="icon3"></i>
          积分明细
        </div>
      </li>
      <li>
        <div  @click="openEditInfo">
          <i class="icon4"></i>
          编辑资料
        </div>
      </li>
      <li>
        <div>
          <i class="icon5"></i>
          扫一扫
        </div>
      </li>
      <!--<li>
        <div  @click="openEditInfo">
          <i class="icon6"></i>
          使用记录
        </div>
      </li>-->
    </ul>
    <div v-if="!!userId" class="btn">
      <button type="primary" @click="logOut">退出账号</button>
    </div>
    <div v-else class="btn">
      <button type="primary" @click="goToLogin">登录</button>
      <button type="primary" @click="goToRegister">立即注册</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId:'',
      total:0,
      editInfo: false,
      bgImg: 'url('+this.$http.baseURL + 'bgydl.jpg)'
    }
  },
  components: {
  },
  methods: {
    openTicket (){
      wx.navigateTo({
        url: "/pages/myTicket/main"
      })
    },
    openPoint () {
      wx.navigateTo({
        url: "/pages/pointDetail/main"
      })
    },
    openEditInfo () {
      wx.navigateTo({
        url: "/pages/editInfo/main"
      })
    },
    openShareGift (){
      wx.navigateTo({
        url: "/pages/shareGift/main"
      })
    },
    goToLogin () {
      wx.navigateTo({
        url: "/pages/login/main"
      })
    },
    goToRegister () {
      wx.navigateTo({
        url: "/pages/register/main"
      })
    },
    logOut (){
      let self = this
      wx.removeStorage({
        key: 'userInfo',
        success: function(res) {
          self.userId = ''
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
        self.$http.userIntegral({
          userId: self.userId,
          start: 1,
          limit:10
        }).then(res => {
          if (res.data.code == '200'){
            self.total = res.data.result[0].sumGole 
          }
        })
      } 
    })
  }
}
</script>
<style>
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  .top {
    height: 254rpx;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top: 46rpx;
    background-size: 100% 100% !important;
    i {
      display:inline-block;
      width: 130rpx;
      height: 130rpx;
      border-radius:50%;
      background:url("../../../static/logoblack.png") center #fff no-repeat;
      background-size:72rpx 72rpx;
    }
    p{
      color:#fff;
      font-size:24rpx;
    }
  }
  .nav-list li {
    background: #fff;
    margin-top: 20rpx;
    padding: 0 30rpx;
    height: 86rpx;
    font-size: 26rpx;
    line-height: 86rpx;
    i {
      display: inline-block;
      width: 46rpx;
      height: 86rpx;
      vertical-align: top;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 30rpx auto;
    }
    .icon1 {
      background-image: url(../../../static/menpiao.png);
    }
    .icon2 {
      background-image: url(../../../static/zsjficon.png);
    }
    .icon3 {
      background-image: url(../../../static/jfmx.png);
    }
    .icon4 {
      background-image: url(../../../static/bianj.png);
    }
    .icon5 {
      background-image: url(../../../static/sysicon.png);
    }
    .icon6 {
      background-image: url(../../../static/syjltb.png);
    }
    div{
      color:#313131;
      background-image:url(../../../static/jiantright.png);
      background-position: right center;
      background-size: 12rpx auto;
      background-repeat: no-repeat;
    }
  }
  .btn {
    padding: 80rpx 32rpx 0;
    button {
      margin-bottom: 36rpx;
    }
  }
}
</style>

