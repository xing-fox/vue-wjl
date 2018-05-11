<template>
  <div class="page">
    <div class="top" style="background-image: url('../../../static/bgydl.png')">
      <img src="../../../static/logo.png">
    </div>
    <ul class="list-input">
      <li class="name">
        <img mode='widthFix' src='../../../static/name.png'>
        <input placeholder-class="p-gray" placeholder="请输入姓名" />
      </li>
      <li class="phone">
        <img mode='widthFix' src='../../../static/phone.png'>
        <input placeholder-class="p-gray" placeholder="请输入手机号" />
      </li>
      <li class="password">
        <img mode='widthFix' src='../../../static/pass.png'>
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
<style>
page{background: #f9f9f9}
</style>
<style lang="less" scoped>
.page {
  .top {
    height: 254rpx;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top:46rpx;
    background-size: 100% 100%;
    img {
      width: 126rpx;
      height:126rpx;
    }
  }
  .btn {
    padding:180rpx 32rpx 0;
    button {
      margin-bottom:36rpx;
    }
  }
}

</style>

