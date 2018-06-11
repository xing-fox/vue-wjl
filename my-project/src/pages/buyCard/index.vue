<template>
  <div class="page">
    <ul v-if="dataList.length" >
      <li v-for="(item, index) in dataList" :key="index">
        <img :src="baseUrl + item.imgUrl">
        <div class="listIntro">
          <p class="introName">{{ item.ticketName }}</p>
          <p class="introValidata">有效期:{{ item.startTime }}-{{ item.endTime }}</p>
          <p class="introUse">可用时间:{{ item.useStartTime }}-{{ item.useEndTime }}</p>
          <p class="introPrice">¥{{ item.ticketPrice }}</p>
          <div class="introAdd" @click="addFunc(index, item.ticketId)"><i></i></div>
        </div>
      </li>
    </ul>
    <div v-else class="noData">暂无数据</div>
    <div class="payMent">
      <div class="payNull" v-if="shopCartNum == 0">
        <i></i>
        <span>购物车是空的哦</span>
      </div>
      <div class="payMoney" v-else @click="cartState = true">
        总计: {{totalMoney}}
      </div>
      <div :class="{paySure: shopCartNum == 0, paySureColor: shopCartNum != 0}" @click="payment">
        <span>确认付款</span>
      </div>
    </div>
    <div class="shopCart" v-if="cartState">
      <div class="cartState" :class="{animated: fadeInState, fadeInUp: fadeInState, animated: fadeOutState, fadeOutDown: fadeOutState}">
        <div class="shopCartNum">
          <div class="cartIcon">
            <i class="icon"></i>
            <div class="cartNumber">
              <span>{{ shopCartNum }}</span>
            </div>
          </div>
        </div>
        <div class="cartList">
          <div class="listTitle">
            <span class="titleName" @click="cartState = false">购物车</span>
            <div class="clearBuy" @click="clearFunc">
              <i></i>
              <span>清空</span>
            </div>
          </div>
        </div>
        <ul class="listContent">
          <li v-for="(item, index) in choiseList" :key="index">
            <span class="listName">{{ item.ticketName }}</span>
            <span class="listPrice">¥{{ item.ticketPrice }}</span>
            <span class="listCount">
              <i class="minus icon" @click="minusFunc(index)"></i><span class="count">{{ item.num }}</span><i class="plus icon" @click="plusFunc(index)"></i>
            </span>
          </li>
        </ul>
        <div class="cartBuy">
          <span class="total">合计：<span class="price">¥<span>{{ totalMoney }}</span></span></span>
          <div class="payTotal" @click="payment">确认付款</div>
        </div>
      </div>
      <div class="zzc" @click="zzcFunc"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      mallId:'',
      cityId:'',
      baseUrl: this.$http.baseURL,
      dataList: [],
      shopCartNum: 0,
      choiseList: [],
      cartState: false,
      fadeInState: true,
      fadeOutState: false,
      totalMoney: 0
    }
  },
  components: {
  },
  methods: {
    addFunc (index, id) {
      if(this.userId){
        this.cartState = true
        let _id = -1
        this.choiseList.map((item) => {
          if (item.ticketId === id) {
            _id = 1
          }
        })
        if (_id === -1) {
          this.choiseList.push(this.dataList[index])
        }
        
        this.totalComputed()
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration:2000,
          success:function(){
            setTimeout(() => {
              wx.switchTab({
                url: "/pages/own/main"
              })
            },1500)
            
          }
        })
      }
    },
    totalComputed () {
      [this.shopCartNum, this.totalMoney]= [0, 0]
      this.choiseList.map((item) => {
        this.shopCartNum += item.num
        this.totalMoney += item.num*parseFloat(item.ticketPrice)
      })
      this.saveCardNum()
    },
    minusFunc (index) {
      if (this.choiseList[index].num === 1) {
        wx.showToast({
          title: '票数不能小于1',
          icon: 'none',
          duration: 1000
        })
      } else {
        this.choiseList[index].num--
      }
      this.totalComputed()
    },
    clearFunc () {
      this.choiseList = []
      this.shopCartNum = 0
      this.totalMoney = 0
      this.saveCardNum()
      this.zzcFunc()
    },
    plusFunc (index) {
      this.choiseList[index].num++
      this.totalComputed()
    },
    zzcFunc () {
      [this.fadeInState, this.fadeOutState] = [false, true]
      setTimeout(() => {
        this.cartState = false
        this.fadeInState = true
        this.fadeOutState = false
      }, 300)
    },
    payment(){
      if(this.shopCartNum){
        wx.navigateTo({
          url: '/pages/confirmPay/main',
        })
      } else {
        wx.showToast({
          title: '购物车是空的哦',
          icon: 'none'
        })
      }
    },
    saveCardNum (){
      let self = this
      let payment = {
        choiseList:self.choiseList,
        totalMoney:self.totalMoney,
        shopCartNum:self.shopCartNum
      }
      wx.setStorage({
        key:"mallId"+self.mallId,
        data: payment
      })
    }
  },
  created () {
  },
  onShow () {
    let self = this
    wx.getStorage({
      key: 'mallInfo',
      success: function(res) {
        self.mallId = res.data.mallId
        wx.getStorage({
          key: 'mallId'+self.mallId,
          success: function(res) {
            self.choiseList = res.data.choiseList
            self.totalMoney =  res.data.totalMoney
            self.shopCartNum = res.data.shopCartNum
          },
          fail:function(){
            self.choiseList = []
            self.totalMoney =  0
            self.shopCartNum = 0
            self.cartState = false
          } 
        })
      } 
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        self.userId = res.data.userId
        console.log(self.userId);
      } 
    })
    wx.getStorage({
      key: 'cityInfo',
      success: function(res) {
        self.cityId = res.data.cityId
         self.$http.ticketList({
          cid: self.cityId,
          mallId: self.mallId
        }).then(res => {
          if (res.data.code == '200'){
            self.dataList = res.data.result;
            for (let value of self.dataList) {
              value.num = 1
            }
          } else {
            self.dataList = [];
          }
        })
      } 
    })
    
  }
}
</script>

<style>
page{
  background: #f3f5f9;
}
</style>

<style lang="less" scoped>
  .page{
    padding-bottom: 82rpx;
    ul{
      li{
        width: 100%;
        height: 270rpx;
        background: #fff;
        margin: 0 0 15rpx 0;
        display: flex;
        img{
          width: 230rpx;
          height: 190rpx;
          margin: 40rpx 20rpx 40rpx 30rpx;
        }
        .listIntro{
          flex: 1;
          margin: 40rpx 0;
          position: relative;
          .introName{
            color: #333;
            font-size: 28rpx;
          }
          .introValidata{
            color: #999;
            font-size: 24rpx;
            line-height: 34rpx;
            margin: 10rpx 0 0 0;
          }
          .introUse{
            color: #999;
            font-size: 24rpx;
            line-height: 34rpx;
            margin: 10rpx 0 0 0;
          }
          .introPrice{
            color: #e02105;
            font-size: 26rpx;
            margin: 20rpx 0 0 0;
          }
          .introAdd{
            width: 65rpx;
            height: 45rpx;
            line-height: 45rpx;
            position: absolute;
            right: 35rpx;
            bottom: 0;
            border-radius: 3px;
            border: 1px solid #ccc;
            text-align: center;
            i{
              display: inline-block;
              width: 30rpx;
              height: 30rpx;
              vertical-align:middle;
              background-image: url('../../../static/plus.png');
              background-size: auto 100%;
              background-position:center;
              background-repeat: no-repeat;
            }
          }
        }
      }
    }
    .payMent{
      width: 100%;
      height: 82rpx;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f1f1f1;
      display: flex;
      .payNull{
        flex: 1;
        color: #c1c1c1;
        font-size: 26rpx;
        line-height: 82rpx;
        i{
          display: inline-block;
          width: 82rpx;
          height: 82rpx;
          position: absolute;
          top: 0;
          left: 0;
          background-image: url('../../../static/shopCart.png');
          background-size: 80% 80%;
          background-position: center center;
          background-repeat: no-repeat;
        }
        span{
          margin: 0 0 0 100rpx;
        }
      }
      .payMoney{
        flex: 1;
        color: #e02105;
        font-size: 30rpx;
        text-align: left;
        line-height: 82rpx;
        margin: 0 0 0 20rpx;
      }
      .paySure{
        color: #fff;
        font-size: 28rpx;
        width: 200rpx;
        line-height: 82rpx;
        text-align: center;
        background: #c0c0c0;
      }
      .paySureColor{
        color: #fff;
        font-size: 28rpx;
        width: 200rpx;
        line-height: 82rpx;
        text-align: center;
        background: #52b960;
      }
    }
    .shopCart{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      .zzc{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
      }
      .cartState{
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        .shopCartNum{
          width: 90rpx;
          height: 90rpx;
          border-radius: 45rpx;
          margin: 0 0 0 20rpx;
          background: #e1dfe0;
          position: relative;
          .cartIcon{
            width: 80rpx;
            height: 80rpx;
            border-radius: 40rpx;
            position: absolute;
            top: 5rpx;
            left: 5rpx;
            background: #fff;
            position: relative;
            i{
              display: inline-block;
              width: 80rpx;
              height: 80rpx;
              background-image: url('../../../static/shopCartState.png');
              background-size: 60% 60%;
              background-position: center center;
              background-repeat: no-repeat;
            }
            .cartNumber{
              color: #fff;
              font-size: 20rpx;
              width: 36rpx;
              height: 36rpx;
              line-height: 36rpx;
              border-radius: 18rpx;
              text-align: center;
              background: #ed1719;
              position: absolute;
              top: -10rpx;
              right: -10rpx;
            }
          }
        }
        .cartList{
          width: 100%;
          height: 74rpx;
          line-height: 74rpx;
          background: #f2eeef;
          .listTitle{
            display: flex;
            color: #999;
            font-size: 26rpx;
            width: 100%;
            .titleName{
              flex: 5;
              margin: 0 0 0 20rpx;
            }
            .clearBuy{
              flex: 1;
              margin: 0 20rpx 0 0;
              text-align: right;
              position: relative;
              i{
                display: inline-block;
                width: 74rpx;
                height: 74rpx;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 40rpx;
                background-image: url('../../../static/dele.png');
                background-size: 50% 50%;
                background-position: center center;
                background-repeat: no-repeat;
              }
              span{
                vertical-align: middle;
              }
            }
          }
        }
        .listContent{
          width: 100%;
          padding: 10rpx 20rpx;
          box-sizing: border-box;
          background: #fff;
          li{
            width: 100%;
            height: 90rpx;
            line-height: 90rpx;
            margin: 0;
            display: flex;
            .listName{
              color: #666;
              font-size: 26rpx;
              width: 300rpx;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .listPrice{
              color: #fd2322;
              font-size: 30rpx;
              width: 150rpx;
              text-align: center;
            }
            .listCount{
              flex: 1;
              text-align: right;
              .count{
                display: inline-block;
                width: 70rpx;
                text-align: center;
                vertical-align: middle;
              }
              .icon{
                display: inline-block;
                width: 65rpx;
                height: 45rpx;
                background-size: 50% 60%;
                background-position: center center;
                background-repeat: no-repeat;
                vertical-align: middle;
                border-radius: 3px;
                border: 1px solid #ccc;
                &.minus{
                  background-image: url('../../../static/minus.png');
                }
                &.plus{
                  background-image: url('../../../static/plus.png');
                }
              }
            }
          }
        }
        .cartBuy{
          color: #999;
          font-size: 26rpx;
          width: 100%;
          height: 80rpx;
          line-height: 80rpx;
          background: #eee;
          padding: 0 0 0 20rpx;
          box-sizing: border-box;
          display: flex;
          .total{
            flex: 1;
            .price{
              color: #ef1816;
              span{
                font-size: 32rpx;
              }
            }
          }
          .payTotal{
            color: #fff;
            font-size: 28rpx;
            width: 200rpx;
            background: #52b960;
            text-align: center;
          }
        }
      }
    }
  }
</style>

