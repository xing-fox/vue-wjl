<template>
  <div class="page">
    <div class="login" style="background-image: url('../../../static/bg.png')">
      <img class="login-bg" mode='widthFix' src='../../../static/players.png'>
      <div class="login-input phone">
        <img mode='widthFix' src='../../../static/phone.png'>
        <input placeholder-class="p-gray" placeholder="请输入手机号" />
      </div>
      <div class="login-input code">
        <img mode='widthFix' src='../../../static/code.png'>
        <input placeholder-class="p-gray" placeholder="请输入验证码" />
        <button size='mini'>获取验证码</button>
      </div>
      <div>
        <button type="primary">登陆</button>
      </div>
      <div class="logo">
        <img mode='widthFix' src='../../../static/logo.png'>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
.page{
  button {
    height: 88rpx;
    font-size: 32rpx;
    line-height: 88rpx;
    border-radius: 5rpx;
  }
  .login {
    background-image: url('../../../static/bg.png');
    background-size: 100% 100%; 
    padding: 440rpx 30rpx;
    position: relative;
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
  .login .phone img {
    left: 32rpx;
    top: 22rpx;
    width: 29rpx;
  }
  .login .code img {
    left: 32rpx;
    top: 28rpx;
    width: 32rpx;
  }

  .login .code {
    padding-right: 200rpx;
  }
  .login .code button {
    position: absolute;
    right: 0;
    top: 12rpx;
    color: #05a21b;
    border-color: #fff;
    background: none;
  }
  .login .code button::after {
    border: 0;
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

