<template>
  <div class="page">
    <div class="register">
  <div class="register-input name">
    <img mode='widthFix' src='../../../static/name.png'>
    <input placeholder-class="p-gray" placeholder="请输入姓名" />
  </div>
  <div class="register-input phone">
    <img mode='widthFix' src='../../../static/phone.png'>
    <input placeholder-class="p-gray" placeholder="请输入手机号" />
  </div>
  <div class="register-input code">
    <img mode='widthFix' src='../../../static/code.png'>
    <input placeholder-class="p-gray" placeholder="请输入验证码" />
    <button size='mini'>获取验证码</button>
  </div>
  <div class="register-input password">
    <img mode='widthFix' src='../../../static/pass.png'>
    <input placeholder-class="p-gray" placeholder="请输入6-16位密码" />
  </div>
  <button type="primary">立即注册</button>
</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  },
  created () {
  }
}
</script>

<style>
button {
    height: 88rpx;
    font-size: 32rpx;
    line-height: 88rpx;
    border-radius: 5rpx;
}
.register {
  padding:80rpx 30rpx;
}
.register-input {
  position: relative;
  border:#dcdcdc solid 1rpx;
  margin-bottom: 40rpx;
  border-radius: 6rpx;
  padding-left: 96rpx;
}
.register image{
  position: absolute;
}
.register .name image{
  left:32rpx;
  top:24rpx;
  width: 33rpx;
}
.register .phone image{
  left:32rpx;
  top:22rpx;
  width: 29rpx;
}
.register .code image{
  left:32rpx;
  top:28rpx;
  width: 32rpx;
}
.register .password image{
  left:32rpx;
  top:24rpx;
  width: 30rpx;
}
.register .code {
  padding-right: 200rpx;
}
.register .code button {
  position: absolute;
  right: 0;
  top:12rpx;
  color:#05a21b;
  border-color:#fff;
  background: none;
}
.register .code button::after {
  border: 0;
} 
.register-input input {
  display: inline-block;
  vertical-align:top;
  width: 100%;
  height: 88rpx;
  font-size: 26rpx;
  color:#2f2f2f;
}
.register-input icon {
  padding:8px;
}
.register button[type=primary] {
  margin-top:168rpx;
}
</style>

