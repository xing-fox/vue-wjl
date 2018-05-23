<template>
  <div class="page">
    <div class="register">
      <div class="register-input name">
        <img mode='widthFix' src='../../../static/name.png'>
        <input placeholder-class="p-gray" placeholder="请输入姓名" v-model="userName"/>
      </div>
      <div class="register-input phone">
        <img mode='widthFix' src='../../../static/phone.png'>
        <input type="number" placeholder-class="p-gray" placeholder="请输入手机号" v-model="telephone" maxlength="11"/>
      </div>
      <div class="register-input code">
        <img mode='widthFix' src='../../../static/code.png'>
        <input type="number" placeholder-class="p-gray" placeholder="请输入验证码" v-model="code"/>
        <div v-if="phoneSure" @click="sendCodeFunc">获取验证码</div>
        <div v-else class="disable">{{ timeLeave }}s后重新发送</div>
      </div>
      <div class="register-input password">
        <img mode='widthFix' src='../../../static/pass.png'>
        <input :password="passShow" placeholder-class="p-gray" placeholder="请输入6-16位密码" v-model="password" maxlength="16"/>
        <span :class="{'see' : !passShow}" @click="passShow = !passShow"></span>
      </div>
      <div class="agreement">立即注册表示同意<span @click="goAgreement">《用户协议》</span></div>
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
      phoneSure: true,
      passShow:true
    }
  },
  components: {
  },
  methods: {
    changeTime () {
      this.timeInter = setInterval(() => {
        if (this.timeLeave === 0) {
          this.phoneSure = true
          this.timeLeave = 60
          clearInterval(this.timeInter)
          return false
        }
        this.timeLeave--
      }, 1000)
    },
    goAgreement(){
      wx.navigateTo({
        url: "/pages/agreement/main"
      })
    },
    submit(){
      let self = this
      if (!self.userName) {
        return wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
      }
      if (!self.telephone) {
        return wx.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
      }
      if (!self.code) {
        return wx.showToast({
          title: '请输入验证码',
          icon: 'none'
        })
      }
      if (!self.password || (self.password.length < 6)) {
        return wx.showToast({
          title: '请输入6-16位密码',
          icon: 'none'
        })
      }
      self.$http.saveUser({
        name: self.userName,
        mobile: self.telephone,
        smsCode: self.code,
        pwd: self.password,
        pic: self.pic
      }).then(res => {
        let resD = res.data
        if(resD.code == '200'){
          let data = {
            userId: resD.result.userId,
            userName: resD.result.userName,
            usermobile: resD.result.usermobile,
            pic: resD.result.pic,
          }
          wx.setStorage({
            key:"userInfo",
            data:data,
            success:function(){
              self.userName = ''
              self.telephone = ''
              self.password = ''
              self.code = ''
              wx.switchTab({
                url: "/pages/own/main"
              })
            }
          })
        } else {
          wx.showToast({
            title: resD.message,
            icon: 'none'
          })
        }
      }).catch((cat) => {
        console.log(cat)
      })
    },
    sendCodeFunc () {
      let self = this
      if (!self.telephone) {
        return wx.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
      }
      if (!(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test(self.telephone))) {
        return wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none'
        })
      }
      self.$http.getCode({
        'mobile': self.telephone
      }).then(res => {
        console.log(res);
        if (res.data.code === '200') {
          wx.showToast({
            title: '发送成功',
            icon: 'none'
          })
          self.phoneSure = false
          self.changeTime()
        } else {
          wx.showToast({
            title: '发送失败，请稍后重试',
            icon: 'none'
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
.register .password {
  padding-right: 88rpx;
}
.register .code div {
  position: absolute;
  right: 0;
  top:0;
  width: 200rpx;
  height: 88rpx;
  line-height: 88rpx;
  font-size: 30rpx;
  text-align: center;
  color:#05a21b;
}
.register .code .disable {
  color:#999;
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
.register .agreement{
  color:#666;
  font-size:28rpx;
  text-align:center;
  span {
    color:#1a87ff;
  }
}
.register-input span {
  position:absolute;
  top:0;
  right:0;
  width:88rpx;
  height:88rpx;
  background:url("../../../static/eye1.png") center no-repeat;
  background-size:44rpx auto;
  z-index:1;
}
.register-input .see {
  background-image:url("../../../static/eye2.png");
}
</style>

