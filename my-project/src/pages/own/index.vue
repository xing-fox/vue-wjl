<template>
  <div class="page">
    <div class="top" style="background-image: url('../../../static/bgydl.png')">
      <img src="../../../static/logo.png">
    </div>
    <ul class="nav-list">
      <li>
        <div  @click="openEditInfo">
          <i class="icon1"></i>
          我的门票
        </div>
      </li>
      <li>
        <div  @click="openEditInfo">
          <i class="icon3"></i>
          积分明细
        </div>
      </li>
      <li>
        <div  @click="openEditInfo">
          <i class="icon5"></i>
          赠送积分
        </div>
      </li>
      <li>
        <div  @click="openEditInfo">
          <i class="icon4"></i>
          编辑资料
        </div>
      </li>
    </ul>
    <div class="btn">
      <button type="primary">退出账号</button>
    </div>
    <editInfo v-if="editInfo"></editInfo>
  </div>
</template>

<script>
import editInfo from "@/components/editInfo"
export default {
  data() {
    return {
      editInfo: false
    }
  },
  components: {
    editInfo
  },
  methods: {
    openEditInfo () {
      this.editInfo = true
      // wx.navigateTo({
      //   url: "/pages/editInfo/main"
      // })
    }
  },
  onLoad () {}
}
</script>
<style>
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  position: relative;
  .top {
    height: 254rpx;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding-top: 46rpx;
    background-size: 100% 100%;
    img {
      width: 126rpx;
      height: 126rpx;
    }
  }
  .nav-list li {
    background: #fff;
    margin-top: 20rpx;
    padding: 0 30rpx;
    height: 86rpx;
    font-size: 26rpx;
    line-height: 86rpx;
    i {
      display: inline-block;
      width: 46rpx;
      height: 86rpx;
      vertical-align: top;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 30rpx auto;
    }
    .icon1 {
      background-image: url(../../../static/menpiao.png);
    }
    .icon2 {
      background-image: url(../../../static/jfdh.png);
    }
    .icon3 {
      background-image: url(../../../static/jfmx.png);
    }
    .icon4 {
      background-image: url(../../../static/bianj.png);
    }
    .icon5 {
      background-image: url(../../../static/zsjficon.png);
    }
    div{
      color:#313131;
      background-image:url(../../../static/jiantright.png);
      background-position: right center;
      background-size: 12rpx auto;
      background-repeat: no-repeat;
    }
  }
  .btn {
    padding: 180rpx 32rpx 0;
    button {
      margin-bottom: 36rpx;
    }
  }
}
</style>

