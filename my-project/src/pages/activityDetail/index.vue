<template>
  <div class="page">
    <div class="top">
      <img src="../../../static/updataPhoto.png">
    </div>
    <ul class="list-input">
      <li class="name">
        <i></i>
        <input placeholder-class="p-gray" placeholder="请输入姓名" />
      </li>
      <li class="phone">
        <i></i>
        <input placeholder-class="p-gray" placeholder="请输入手机号" />
      </li>
      <li class="password">
        <i></i>
        <input placeholder-class="p-gray" placeholder="请输入6-16位密码" />
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
<style lang="less" scoped>
.page {
  .top {
    height: 420rpx;
    width: 100%;
    img {
      width: 100%;
      height:100%;
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
    .phone i{
      background-image:url(../../../static/phone.png);
      background-size: 29rpx auto;
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

