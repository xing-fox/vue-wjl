<template>
  <div class="page" style="background-image:url(../../../static/zsjftb.jpg)">
    <div class="btn" @click="shadowShow = true">领取积分</div>
    <div class="about">
      <div class="tit">赠送规则</div>
      <ul>
        <li>
          <div class="title">兑换时间：</div>
          <p>*兑换时间为2018年6月1日-2018年8月1日（以各站点活动时间为准）</p>
        </li>
        <li>
          <div class="title">温馨提示：</div>
          <p>*西甲嘉年华站点获取积分仅限在获得积分站点兑换使用，不可跨站点累积使用（如在A中心获得西甲嘉年华积分不得在B中心西甲嘉年华积分使用或累积）</p>
          <p>*玩家游戏积分需当天在积分柜台录入,并在活动小程序个人账户登记,当天未录入视作放弃该积分。</p>
        </li>
      </ul>
    </div>
    <div v-show="shadowShow" class="shadow">
      <div class="box">
        <div class="close" @click="shadowShow = false"></div>
        <div class="title">积分领取</div>
        <ul class="list-input">
          <li class="phone">
            <i></i>
            <input type="number" placeholder-class="p-gray" placeholder="请输入手机号" maxlength="11" v-model="telephone"/>
          </li>
          <li class="password">
            <i></i>
            <input :password="passShow" placeholder-class="p-gray" placeholder="请输入6-16位密码" maxlength="16" v-model="password"/>
            <span :class="{'see' : !passShow}" @click="passShow = !passShow"></span>
          </li>
        </ul>
        <button @click="submit">确认领取</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      shadowShow:false,
      telephone:'',
      password:'',
      giftId:'',
      passShow:true
    }
  },
  components: {
  },
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
          self.userId = resD.result.userId;
          wx.setStorage({
            key:"userInfo",
            data:{userId: resD.result.userId}
          })
          self.$http.obtailShareGift({
            changeId: self.giftId,
            changeUserId: self.userId
          }).then(result => {
            self.shadowShow = false
            if(result.data.code == '200'){
              wx.showToast({
                title: '积分领取成功',
                icon: 'none'
              })
            }else{
              wx.showToast({
                title: result.data.message,
                icon: 'none'
              })
            }
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
  onLoad (options)  {
    let self = this
    self.giftId = options.id
  }
}
</script>
<style lang="less" scoped>
.page {
  position:absolute;
  width:100%;
  height:100%;
  overflow-y: auto;
  box-sizing:border-box;
  padding-top:436rpx;
  background-color:#030304;
  background-position:center top;
  background-repeat:no-repeat;
  background-size:100% auto;
  .btn {
    margin:0 auto 050rpx;
    width:284rpx;
    height:68rpx;
    font-size:26rpx;
    color:#fff;
    text-align:center;
    line-height:68rpx;
    background:#17ae60;
    button {
      margin-bottom:36rpx;
    }
  }
  .about{
    width:690rpx;
    margin:0 auto;
    background:#2d2a2b;
    border-radius:6rpx;
    color:#dcdcdc;
    .tit {
      text-align:center;
      padding-top:50rpx;
      font-size:28rpx;
    }
    ul{
      padding:20rpx 28rpx 50rpx;
      li{
        padding-top:40rpx;
        .title{
          font-size: 28rpx;
          line-height: 48rpx;
          padding:4rpx 0;
        }
        p{
          font-size: 24rpx;
          line-height: 40rpx;
        }
      }
    }
  }
  .shadow {
    position: absolute;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, .7);
    .box{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 578rpx;
      height:540rpx;
      padding:0 30rpx;
      box-sizing: border-box;
      margin:-270rpx 0 0 -289rpx;
      background:#fafafa;
      border-radius: 10rpx;
      text-align: center;
      .close {
        position: absolute;
        top: -60rpx;
        right: 0;
        width: 47rpx;
        height: 47rpx;
        background:url("../../../static/close.png") no-repeat;
        background-size: 100%;
      }
      .title {
        font-size: 38rpx;
        line-height: 100rpx;
        color:#2f2f2f;
        border-bottom:#d2d2d2 solid 1px;
      }
      .list-input {
        padding:60rpx 32rpx 0;
        text-align: left;
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
        .phone i{
          background-image:url(../../../static/phone.png);
          background-size: 29rpx auto;
        }
        .password {
          padding-right:88rpx;
          i{
            background-image:url(../../../static/pass.png);
            background-size: 30rpx auto;
          }
        }
      }
      button {
        width: 290rpx;
        height: 70rpx;
        color:#fff;
        background:#05a21b;
        border-radius: 45rpx;
      }
    }
  }
}

</style>

