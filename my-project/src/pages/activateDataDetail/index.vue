<template>
  <div class="page">
    <p>
      <label>活动名称</label>{{ name }}
    </p>
    <p>
      <label>得分</label>
      <input type="number" v-model="score"/>
    </p>
    <div class="btn">
      <button type="primary" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId:'',
      orderId:'',
      quanma:'',
      xianxiaId:'',
      name:'',
      score:''
    }
  },
  components: {
  },
  methods: {
    submit(){
      let self = this
      if (!self.score) {
        return wx.showToast({
          title: '请输入得分',
          icon: 'none'
        })
      }
      if(!self.quanma){
        self.$http.jihuoSaveData({
          userId:self.userId,
          orderId:self.orderId,
          xianxiaId:self.xianxiaId,
          score: self.score
        }).then(res => {
          self.ajaxData (res.data)
        })
      } else {
        self.$http.jihuoSaveDataQuanma({
          userId:self.userId,
          quanma:self.quanma,
          xianxiaId:self.xianxiaId,
          score: self.score
        }).then(res => {
          self.ajaxData (res.data)
        })
      }
      
    },
    ajaxData (resD){
      if(resD.code == '200'){
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          complete:function(){
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            },1500)
          }
        })
      } else {
        wx.showToast({
          title: resD.message,
          icon: 'none'
        })
      }
    }
  },
  onLoad (options) {
    let self = this
    self.orderId = options.orderId
    self.quanma = options.quanma
    self.name = options.name
    self.xianxiaId = options.xianxiaId
    self.score = ''
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
      } 
    })
  }
}
</script>
<style lang="less" scoped>
.page {
  color:#2f2f2f;
  font-size: 30rpx;
  line-height: 60rpx;
  padding:60rpx 30rpx 20rpx;
  p{
    position: relative;
    height: 60rpx;
    padding:0 0 40rpx 140rpx;
    input {
      box-sizing: border-box;
      padding: 0 10rpx;
      width: 100%;
      height: 60rpx;
      line-height: 60rpx;
      border:#f5f5f5 solid 1px;
    }
  }
  label {
    position: absolute;
    left: 0;
    top:0;
    display: block;
    width: 140rpx;
  }
  .btn {
    padding: 200rpx 165rpx 0;
  }
}
</style>

