<template>
  <div class="page">
    <ul class="list">
      <li>
        <span class="lable">姓名</span>
        <i>{{ useInfo.name }}</i>
      </li>
      <li>
        <span class="lable">年龄</span>
        <i>{{ useInfo.age }}</i>
      </li>
      <li>
        <span class="lable">性别</span>
        <i>{{ useInfo.sex }}</i>
      </li>
      <li>
        <span class="lable">得分情况</span>
        <i>{{ useInfo.totalSum }}</i>
      </li>
      <li>
        <span class="lable">上传头像</span>
        <div @click="updataImg" class="updataImg">
          <img :src="img">
        </div>
      </li>
      <li>
        <span class="lable">介绍</span>
        <div class="textA">
          <textarea :focus="focus" v-model="content"/>
          <span v-if="!focus" @click="focusTap" class="editBtn">编辑</span>
          <span v-else @click="saveContent" class="editBtn">保存</span>
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
      orderId:'',
      img:'',
      content:'',
      useInfo:{},
      focus:false
    }
  },
  components: {
  },
  methods: {
    updataImg(){
      let self = this
      wx.chooseImage({
        count: 1, 
        sizeType: ['compressed'], 
        sourceType: ['album', 'camera'], 
        success: function (res) {
          self.img = res.tempFilePaths[0]
          console.log(res);
          wx.uploadFile({
            url: self.$http.baseURL+'shiyong/upload_img', 
            filePath: self.img,
            name: 'file',
            formData:{
              'file': 'file'
            },
            success: function(res){
              var data = res.data
              //do something
              console.log(res);
            }
          })
        }
      })
    },
    focusTap(){
      this.focus = true
    },
    saveContent() {
      let self = this
      if (!self.content) {
        return wx.showToast({
          title: '请输入介绍内容',
          icon: 'none'
        })
      }
      self.$http.saveContent({
        orderId:self.orderId,
        userId:self.userId,
        content:self.content
      }).then(res => {
        if (res.data.code == '200'){
          wx.showToast({
            title: '保存成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      })
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
    self.orderId = options.id
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        self.$http.useQuery({
          orderId:self.orderId,
          userId:self.userId
        }).then(res => {
          if (res.data.code == '200'){
            self.useInfo = res.data.result[0] ? res.data.result[0] : {}
          }
        })
      } 
    })
    
  }
}
</script>
<style lang="less" scoped>
.page {
  .list {
    padding:20rpx 30rpx 60rpx;
    li {
      position: relative;
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
      .updataImg {
        width: 88rpx;
        height: 88rpx;
        background:url("../../../static/sctx.png") no-repeat;
        background-size: 100% 100%;
        img {
          width: 100%;
          height:100%;
        }
      }
      .textA {
        text-align: right;
        textarea {
          box-sizing: border-box;
          height: 180rpx;
          width: 100%;
          border:#efefef solid 1rpx;
          border-radius: 6rpx;
          padding:0 10rpx;
          text-align: left;
          border-radius: 8rpx;
        }
        .editBtn {
          display: inline-block;
          color:#05a21b;
          font-size: 26rpx;
          padding:0 22rpx;
          line-height: 46rpx;
          border:#05a21b solid 1rpx;
          border-radius: 6rpx;
        }
      }
      
    }
    li:last-child{
      border:none;
    }
  }
  .btn {
    padding: 0 165rpx;
  }
}
</style>

