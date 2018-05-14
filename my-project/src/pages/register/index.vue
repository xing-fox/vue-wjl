<template>
  <div class="page">
    <div class="register">
      <div class="register-input name">
        <img mode='widthFix' src='../../../static/name.png'>
        <input placeholder-class="p-gray" placeholder="请输入姓名" v-model="userName"/>
      </div>
      <div class="register-input phone">
        <img mode='widthFix' src='../../../static/phone.png'>
        <input placeholder-class="p-gray" placeholder="请输入手机号" v-model="telephone"/>
      </div>
      <div class="register-input code">
        <img mode='widthFix' src='../../../static/code.png'>
        <input placeholder-class="p-gray" placeholder="请输入验证码" v-model="code"/>
        <button v-if="phoneSure" @click="sendCodeFunc" size='mini'>获取验证码</button>
        <button v-else>{{ timeLeave }}s后重新发送</button>
      </div>
      <div class="register-input password">
        <img mode='widthFix' src='../../../static/pass.png'>
        <input placeholder-class="p-gray" placeholder="请输入6-16位密码" v-model="password"/>
      </div>
      <button type="primary" @click="submit">立即注册</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName:'',
      telephone:'',
      code:'',
      password:'',
      pic:'',
      timeLeave: 60,
      timeInter: '',
      phoneSure: true
    }
  },
  components: {
  },
  methods: {
    submit(){
      if (!this.userName) {
        return wx.showToast({
          title: '请输入姓名',
          icon: 'none',
          duration: 2000
        })
      }
      if (!this.telephone) {
        return wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000
        })
      }
      if (!this.code) {
        return wx.showToast({
          title: '请输入验证码',
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
      this.$http.saveUser({
        name: this.name,
        mobile: this.telephone,
        smsCode: this.code,
        pwd: this.password,
        pic: this.pic
      }).then(res => {
        console.log(res)
      }).catch((cat) => {
        console.log(cat)
      })
    },
    sendCodeFunc () {
      if (!this.telephone) {
        return wx.showToast({
          title: '请输入手机号',
          icon: 'none',
          duration: 2000
        })
      }
      if (!(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(this.telephone))) {
        return wx.showToast({
          title: '手机号输入有误,请重新输入',
          icon: 'none',
          duration: 2000
        })
      }
      this.$http.getIdentifyCode({
        'phone': this.telephone
      }).then(res => {
        if (res.code === 'E00000') {
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 2000
          })
          this.phoneSure = false
          this.changeTime()
        } else {
          wx.showToast({
            title: '发送失败，请稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  created () {
  },
  onLoad () {
    let self = this
    wx.getUserInfo({
      success: function(res) {
        self.pic = res.userInfo.avatarUrl;
      }
    })
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

