<template>
  <div class="page">
    <ul class="list">
      <li>
        <span class="lable">姓名</span>
        <i>张晓燕</i>
      </li>
      <li>
        <span class="lable">年龄</span>
        <i>29</i>
      </li>
      <li>
        <span class="lable">性别</span>
        <i>男</i>
      </li>
      <li>
        <span class="lable">得分情况</span>
        <i>268</i>
      </li>
      <li>
        <span class="lable">活动名称</span>
        <i>西甲俱乐部</i>
      </li>
      <li>
        <span class="lable">性别</span>
        <radio-group class="radio-group" @change="sexChange">
          <label class="radio" v-for="(item, index) in sex" :key="index">
            <radio :value="item.value" :checked="item.checked"/>{{item.name}}
          </label>
        </radio-group>
      </li>
      <li v-if="type == '2'">
        <span class="lable">体验劵</span>
        <div class="searchBox">
          <picker @change="PickerChange" :range="Square" :range-key="'name'">
            <span>{{ choiseSquareValue }}</span>
            <i></i>
          </picker>
        </div>
      </li>
    </ul>
    <div class="btn">
      <button type="primary" @click="submit">球童报名</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId:'',
      orderSeq: '',
      orderId:'',
      type:'',
      name:'',
      age:'',
      nation:'',
      email:'',
      sex: [
        {name: '男', value: 1, checked: 'true'},
        {name: '女', value: 2},
      ],
      sexId:'1',
      Square: [],
      tiyanquan:0,
      choiseSquareValue: '请选择活动名称',
    }
  },
  components: {
  },
  methods: {
    sexChange(e){
      let self = this
      self.sexId = e.mp.detail.value
    },
    PickerChange(e) {
      let self = this
      self.choiseSquareValue = self.Square[e.mp.detail.value].name
      self.tiyanquan =  self.Square[e.mp.detail.value].id
    },
    submit(){
      let self = this
      // if (!self.name) {
      //   return wx.showToast({
      //     title: '请输入姓名',
      //     icon: 'none'
      //   })
      // }
      // if (!self.age) {
      //   return wx.showToast({
      //     title: '请输入年龄',
      //     icon: 'none'
      //   })
      // }
      if (!self.nation) {
        return wx.showToast({
          title: '请输入国籍',
          icon: 'none'
        })
      }
      self.$http.jihuoSave({
        user_id:self.userId,
        orderSeq:self.orderSeq,
        orderId:self.orderId,
        nation:self.nation,
        name: self.name,
        age: self.age,
        sex: self.sexId,
        tiyanquan: self.tiyanquan,
        email: self.email
      }).then(res => {
        let resD = res.data
        if(resD.code == '200'){
          wx.showToast({
            title: '激活成功',
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
      }).catch((cat) => {
        console.log(cat)
      })
    },
  },
  onLoad (options) {
    let self = this
    self.orderSeq = options.orderSeq
    self.orderId = options.orderId
    self.type = options.type
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
      } 
    })
    self.$http.jihuoHuod({}).then(res => {
      if (res.data.code == '200'){
        self.Square = res.data.result
      }
    })
  }
}
</script>
<style lang="less" scoped>
.page {
  .list {
    padding:60rpx 30rpx 90rpx;
    li {
      position: relative;
      height: 65rpx;
      line-height: 65rpx;
      padding: 30rpx 30rpx 30rpx 200rpx;
      color:#2f2f2f;
      font-size: 30rpx;
      border-bottom:#efefef solid 1rpx;
      span.lable{
        position: absolute;
        left:60rpx;
        top:30rpx;
        width:140rpx;
        height:65rpx;
      }
      label{
        padding-right: 20rpx;
      }
      input {
        box-sizing: border-box;
        height: 65rpx;
        width: 100%;
        border:#e4e4e4 solid 1px;
        border-radius: 6rpx;
        padding:0 10rpx;
      }
      .searchBox{
        color: #999;
        font-size: 30rpx;
        height: 65rpx;
        width: 100%;
        line-height: 60rpx;
        padding: 0 0 0 10rpx;
        border-radius: 5rpx;
        border:#e4e4e4 solid 1px;
        box-sizing: border-box;
        position: relative;
        i{
          display: inline-block;
          width: 0;
          height: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 15px;
          margin: auto 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #333;
        }
      }
    }
    
  }
  .btn {
    padding: 0 165rpx;
  }
}
</style>

