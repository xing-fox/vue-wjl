<template>
  <div class="page">
    <div class="btn">
      <button type="primary" @click="goToActivate">激活票</button>
      <button type="primary" @click="goToQuanma">兑换券码</button>
      <button type="primary" @click="goToActivateData">活动数据</button>
      <button type="primary" @click="goToQuanmaData">兑换码活动数据</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {
  },
  methods: {
    goToActivate (){
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          let parm = res.result.split(',');
          if(parm.length === 3){
            wx.navigateTo({
              url: "/pages/activate/main?orderSeq=" + parm[0] + "&orderId=" + parm[1] + "&type=" + parm[2]
            })
          } else {
            wx.showToast({
              title: '扫码失败',
              icon: 'none'
            })
          }
          
        },
        fail :() => {
          wx.showToast({
            title: '扫码失败',
            icon: 'none'
          })
        },
      })
    },
    goToActivateData () {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          let parm = res.result.split(',');
          if(parm.length === 3){
            wx.navigateTo({
              url: "/pages/activateData/main?orderSeq=" + parm[0] + "&orderId=" + parm[1] + "&type=" + parm[2]
            })
          } else {
            wx.showToast({
              title: '扫码失败',
              icon: 'none'
            })
          }
          
        },
        fail :() => {
          wx.showToast({
            title: '扫码失败',
            icon: 'none'
          })
        },
      })
    },
    goToQuanma (){
      wx.navigateTo({
        url: "/pages/activateQuanma/main"
      }) 
    },
    goToQuanmaData (){
      wx.navigateTo({
        url: "/pages/activateQuanmaData/main"
      }) 
    }
  }
}
</script>
<style>
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scoped>
.page {
  .btn {
    padding: 300rpx 165rpx 0;
    button {
      margin-bottom: 70rpx;
    }
  }
}
</style>

