<template>
  <div class="page">
    <div class="top" style="background-image: url('http://61.190.254.82:8080/xijia/bgydl.png')">
      <i></i>
    </div>
    <ul class="list-input">
      <li class="password">
        <i></i>
        <input :password="oldPassShow" placeholder-class="p-gray" placeholder="请输入原始密码"  maxlength="16" v-model="oldPass"/>
        <span :class="{'see' : !oldPassShow}" @click="oldPassShow = !oldPassShow"></span>
      </li>
      <li class="password">
        <i></i>
        <input :password="newPassShow" placeholder-class="p-gray" placeholder="请输入6-16位新密码"  maxlength="16" v-model="newPass"/>
        <span :class="{'see' : !newPassShow}" @click="newPassShow = !newPassShow"></span>
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
      newPass: '',
      oldPassShow:true,
      newPassShow:true
    }
  },
  components: {
  },
  methods: {
    newSee(){
      newPassShow:false
      this.newPassShow = !this.newPassShow
    },
    submit(){
      let self = this
      if (!self.oldPass) {
        return wx.showToast({
          title: '请输入原始密码',
          icon: 'none'
        })
      }
      if (!self.newPass || (self.newPass.length < 6)) {
        return wx.showToast({
          title: '请输入6-16位新密码',
          icon: 'none'
        })
      }
      self.$http.updateuser({
        id : self.userId,
        pwd : self.oldPass,
        newPwd : self.newPass
      }).then(res => {
        let resD = res.data
        console.log(res.data)
        if(resD.code == '200'){
          wx.showToast({
            title: '密码修改成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: resD.message,
            icon: 'none'
          })
        }
      })
    }
  },
  created () {
  },
  onShow () {
    let self = this
    self.oldPass = ''
    self.newPass = ''
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
    padding-top: 46rpx;
    background-size: 100% 100%;
    i {
      display:inline-block;
      width: 130rpx;
      height: 130rpx;
      border-radius:50%;
      background:url("../../../static/logoblack.png") center #fff no-repeat;
      background-size:72rpx 72rpx;
    }
  }
  .list-input {
    padding:60rpx 32rpx 0;
    li {
      position: relative;
      border:#dcdcdc solid 1rpx;
      margin-bottom: 40rpx;
      border-radius: 6rpx;
      padding:0 88rpx 0 96rpx;
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
        background:#fff;
      }
      span {
        position:absolute;
        top:0;
        right:0;
        width:88rpx;
        height:88rpx;
        background:url("../../../static/eye1.png") center no-repeat;
        background-size:44rpx auto;
        z-index:1;
      }
      .see {
        background-image:url("../../../static/eye2.png");
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

