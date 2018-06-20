<template>
  <div class="page">
    <ul class="list">
      <li>
        <span class="lable">订单编号</span>
        <i>{{ orderSeq }}</i>
      </li>
      <li>
        <span class="lable">姓名</span>
        <input placeholder-class="p-gray" placeholder="请输入姓名" v-model="name"/>
      </li>
      <li>
        <span class="lable">年龄</span>
        <input type="number" placeholder-class="p-gray" placeholder="请输入年龄" v-model="age" maxlength="2"/>
      </li>
      <li>
        <span class="lable">国籍</span>
        <input placeholder-class="p-gray" placeholder="请输入国籍" v-model="nation"/>
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
      <li>
        <span class="lable">Email</span>
        <input placeholder-class="p-gray" placeholder="请输入Email" v-model="email"/>
      </li>
    </ul>
    <div class="btn">
      <button type="primary" @click="submit">激活</button>
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
  },
  onUnload () {
    let self = this
    self.name = ''
    self.age = ''
    self.nation = ''
    self.email = ''
    self.sex = [
      {name: '男', value: 1, checked: 'true'},
      {name: '女', value: 2}
    ],
    self.sexId = '1'
    self.Square = []
    self.tiyanquan = 0
    self.choiseSquareValue = '请选择活动名称'
  }
}
</script>
<style lang="less" scoped>
.page {
  .list {
    padding:90rpx;
    li {
      position: relative;
      height: 65rpx;
      line-height: 65rpx;
      margin-bottom: 60rpx;
      padding-left: 140rpx;
      color:#2f2f2f;
      font-size: 30rpx;
      span.lable{
        position: absolute;
        left:0;
        top:0;
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

