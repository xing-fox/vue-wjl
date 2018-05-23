<template>
  <div class="page">
    <div v-if="activityData.activityDetails || activityData.activityDetailsPic">
      <div v-if="activityData.activityDetailsPic" class="top">
        <img :src="baseUrl+activityData.activityDetailsPic">
      </div>
      
      <div class="act-info" v-if="activityData.activityDetails">
        <div class="title"><span>规则说明</span></div>
        <div class="cont">{{ activityData.activityDetails }}</div>
      </div>
    </div>
    <div v-else class="noData">暂无数据</div> 
  </div>
</template>

<script>
export default {
  data () {
    return {
      activityid: '',
      activityData:{},
      baseUrl: this.$http.baseURL
    }
  },
  components: {
  },
  methods: {
  },
  created () {
  },
  onLoad (options) {
    let self = this
    self.activityid = options.activityid
    self.$http.activityHomeDetail({
      activityId: self.activityid
    }).then(res => {
      if (res.data.code == '200'){
        self.activityData = res.data.result[0];
        wx.setNavigationBarTitle({
          title: self.activityData.activityName
        })
      }
    })
  }
}
</script>
<style lang="less" scoped>
.page {
  .top {
    img {
      width: 100%;
      height:420rpx;
    }
  }
  .act-info {
    padding:0 30rpx 65rpx;
    font-size: 24rpx;
    line-height: 40rpx;
    color:#333;
    .title {
      margin-bottom:18rpx;
      border-bottom: #e5e5e5 solid 1px;
      color:#333;
      font-size: 26rpx;
      line-height: 64rpx;
      span {
        display: inline-block;
        border-bottom: #02a319 solid 4rpx;
      }
    }
    .cont {
      margin-bottom: 18rpx;
      p{
        text-indent: 48rpx;
      }
    }
  }
}

</style>

