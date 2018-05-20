<template>
  <div class="page">
    <div class="top" style="background-image: url('../../../static/bgydl.png')">
      <div  @click="updataPhoto">
        <img :src="userPic">
        <span></span>
      </div>
    </div>
    <ul class="list-input">
      <li class="name">
        <i></i>
        <input placeholder-class="p-gray" placeholder="请输入姓名" v-model="userName" />
      </li>
      <li class="password">
        <i></i>
        <input placeholder-class="p-gray" placeholder="请输入6-16位密码" v-model="userPass"/>
      </li>
    </ul>
    <div class="btn">
      <button type="primary">确认修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      userName:'',
      userPass: '',
      userPic:'',
    }
  },
  components: {
  },
  methods: {
    updataPhoto () {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            console.log(res.tempFilePaths);
        },        
    });
    },
  },
  created () {
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(res);
        self.userId = res.data.userId
        self.userName = res.data.userName
        self.userPass = res.data.userPass
        self.userPic = res.data.pic
      } 
    })
  }
}
</script>
<style lang="less" scoped>
.page {
  .top {
    height: 254rpx;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top:52rpx;
    background-size: 100% 100%;
    div {
      margin:0 auto;
      width: 145rpx;
      height:145rpx;
      border-radius:50%;
      overflow: hidden;
      background: url(../../../static/updataPhoto.png) no-repeat;
      background-size: 100% 100%;
    }
    img {
      width: 145rpx;
      height:145rpx;
      border-radius:50%;
    }
  }
  .list-input {
    padding:60rpx 32rpx 0;
    li {
      position: relative;
      border:#dcdcdc solid 1rpx;
      margin-bottom: 40rpx;
      border-radius: 6rpx;
      padding-left: 96rpx;
      i{
        position: absolute;
        left:0;
        top:0;
        width: 94rpx;
        height:88rpx;
        background-repeat: no-repeat;
        background-position: center;
      }
      input {
        display: inline-block;
        vertical-align:top;
        width: 100%;
        height: 88rpx;
        font-size: 26rpx;
        color:#2f2f2f;
      }
    }
    .name i{
      background-image:url(../../../static/name.png);
      background-size: 33rpx auto;
    }
    .password i{
      background-image:url(../../../static/pass.png);
      background-size: 30rpx auto;
    }
  }
  .btn {
    padding:110rpx 32rpx 0;
    button {
      margin-bottom:36rpx;
    }
  }
}

</style>

