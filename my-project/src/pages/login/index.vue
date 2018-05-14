<template>
    <div class="login" style="background-image: url('../../../static/bg.jpg')">
      <img class="login-bg" mode='widthFix' src='../../../static/players.png'>
      <div class="login-input phone">
        <img mode='widthFix' src='../../../static/phone.png'>
        <input placeholder-class="p-gray" placeholder="请输入手机号" v-model="telephone"/>
      </div>
      <div class="login-input password">
        <img mode='widthFix' src='../../../static/pass.png'>
        <input placeholder-class="p-gray" placeholder="请输入6-16位密码" v-model="password" />
      </div>
      <div>
        <button type="primary" @click="submit">登陆</button>
      </div>
      <div class="logo">
        <img mode='widthFix' src='../../../static/logo.png'>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      telephone:'',
      password:''
    };
  },
  components: {},
  methods: {
    submit(){
      if (!this.telephone) {
        return wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000
        })
      }
      if (!this.password) {
        return wx.showToast({
          title: '请输入6-16位密码',
          icon: 'none',
          duration: 2000
        })
      }
      this.$http.userLogin({
        mobile: this.telephone,
        pwd: this.password
      }).then(res => {
        console.log(res)
      }).catch((cat) => {
        console.log(cat)
      })
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
page{
  button {
    height: 88rpx;
    font-size: 32rpx;
    line-height: 88rpx;
    border-radius: 5rpx;
  }
  .login {
    background-size: 100% 100%; 
    padding: 440rpx 30rpx 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: fixed;
  }
  .login img {
    position: absolute;
  }
  .login-bg {
    top: 50rpx;
    left: 5%;
    width: 90%;
  }
  .login-input {
    position: relative;
    border: #dcdcdc solid 1rpx;
    margin-bottom: 40rpx;
    border-radius: 6rpx;
    padding-left: 96rpx;
    background: #fff;
  }
  .login .phone image{
    left:32rpx;
    top:22rpx;
    width: 29rpx;
  }
  .login .password image{
    left:32rpx;
    top:24rpx;
    width: 30rpx;
  }
  .login-input input {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 88rpx;
    font-size: 26rpx;
    color: #2f2f2f;
  }
  .login-input icon {
    padding: 8px;
  }
  .login button[type="primary"] {
    margin-top: 60rpx;
  }
  .login .logo {
    margin-top: 90rpx;
    text-align: center;
  }
  .login .logo img {
    position: static;
    width: 154rpx;
  }
}
</style>

