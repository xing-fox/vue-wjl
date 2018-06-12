<template>
    <div class="login" :style="{ background: bgImg }">
      <div class="login-input phone">
        <i></i>
        <input type="number" placeholder-class="p-gray" placeholder="请输入手机号" maxlength="11" v-model="telephone"/>
      </div>
      <div class="login-input password">
        <i></i>
        <input :password="passShow" placeholder-class="p-gray" placeholder="请输入6-16位密码" maxlength="16" v-model="password" />
        <span :class="{'see' : !passShow}" @click="passShow = !passShow"></span>
      </div>
      <div>
        <button type="primary" @click="submit">登录</button>
      </div>
      <div class="logo">
        <img mode='widthFix' :src='logoImg'>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      telephone:'',
      password:'',
      passShow:true,
      logoImg: this.$http.baseURL + 'logo.png',
      bgImg: 'url('+this.$http.baseURL + 'bg.jpg)'
    };
  },
  components: {},
  methods: {
    submit(){
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
      if (!self.password || (self.password.length < 6)) {
        return wx.showToast({
          title: '请输入6-16位密码',
          icon: 'none'
        })
      }
      self.$http.userLogin({
        mobile: self.telephone,
        pwd: self.password
      }).then(res => {
        let resD = res.data
        if(resD.code == '200'){
          let userData = {
            userId: resD.result.userId
          }
          resD.result.list[0] && resD.result.list[0].city_id ? userData.cityid = resD.result.list[0].city_id : ''
          wx.setStorage({
            key:"userInfo",
            data: userData,
            success:function(){
              self.password = ''
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
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>

  button {
    height: 88rpx;
    font-size: 32rpx;
    line-height: 88rpx;
    border-radius: 5rpx;
  }
  .login {
    background-size: 100% 100% !important; 
    padding: 490rpx 30rpx 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: fixed;
  }
  .login i {
    position: absolute;
    left:0;
    top:0;
    width:96rpx;
    height:88rpx;
    background-repeat: no-repeat;
    background-position: center;
    background-size:100% auto;
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
  .login .phone i{
    background-image:url(../../../static/phone.png);
    background-size:29rpx auto;
  }
  .login .password i{
    background-image:url(../../../static/pass.png);
    background-size:30rpx auto;
  }
  .login .password {
    padding-right: 88rpx;
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
  .login-input span {
  position:absolute;
  top:0;
  right:0;
  width:88rpx;
  height:88rpx;
  background:url("../../../static/eye1.png") center no-repeat;
  background-size:44rpx auto;
  z-index:1;
}
.login-input .see {
  background-image:url("../../../static/eye2.png");
}

</style>

