<template>
  <div class="page">
    <div class="top" style="background-image: url('../../../static/bgydl.png')">
      <img src="../../../static/logo.png">
    </div>
    <ul class="list-input">
      <li class="password">
        <i></i>
        <input password placeholder-class="p-gray" placeholder="请输入原始密码" v-model="oldPass"/>
      </li>
      <li class="password">
        <i></i>
        <input password placeholder-class="p-gray" placeholder="请输入6-16位新密码" v-model="newPass"/>
      </li>
    </ul>
    <div class="btn">
      <button @click="submit" type="primary">确认修改</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      oldPass: '',
      newPass: ''
    }
  },
  components: {
  },
  methods: {
    submit(){
      let self = this
      if (!self.oldPass) {
        return wx.showToast({
          title: '请输入原始密码',
          icon: 'none'
        })
      }
      if (!self.newPass) {
        return wx.showToast({
          title: '请输入6-16位新密码',
          icon: 'none'
        })
      }
      self.$http.updateuser({
        userId: self.userId,
        oldPass: self.oldPass,
        newPass: self.newPass
      }).then(res => {
        let resD = res.data
        console.log(res.data)
        if(resD.code == '200'){
          
        } else {
          wx.showToast({
            title: resD.message,
            icon: 'none'
          })
        }
        
      }).catch((cat) => {
        console.log(cat)
      })
    }
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

