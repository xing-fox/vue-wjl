<template>
  <div class="page">
    <div v-if="activityData.activityDetailsPic" class="top">
      <img :src="baseUrl+activityData.activityDetailsPic">
    </div>
    <div v-if="caddieShow" class="caddie-list" @click="goToCandidate">
      <div class="title">
        <div class="cont">球童候选人</div>
      </div>
      <div class="box" v-for="(item, index) in caddieData" :key="index">
        <img :src="baseUrl+item.voteImage">
        <div class="ticket-btn">投票</div>
      </div>
    </div>
    <div class="act-info">
      <div class="title"><span>活动摘要</span></div>
      <div class="list">
        <p>活动时间：{{ activityData.Time }}</p>
        <p>截止时间：{{ activityData.enddate}}</p>
        <p>主办方：{{ activityData.zhuban }}</p>
        <p class="tel">客服热线：{{ activityData.kefu }}</p>
      </div>
      <div v-if="activityData.activityDetails">
        <div class="title"><span>活动须知</span></div>
        <div class="cont">{{ activityData.activityDetails }}</div>
      </div>
      <div v-if="teamShow" class="team">
        <a v-for="(item, index) in teamList" :key="index" @click="selectTeam(item.teamId,item.teamName)">{{ item.teamName }}</a>
      </div>
    </div>
    <div class="btn" @click="goToBuy">
      <button type="primary">立即购票参与活动</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userId:'',
      activityid: '',
      caddieShow: false,
      teamShow: false,
      teamList:[],
      caddieData:[],
      activityData:{},
      baseUrl: this.$http.baseURL
    }
  },
  components: {
  },
  methods: {
    goToCandidate(){
      wx.navigateTo({
        url: '/pages/candidate/main?activityid=' + this.activityid ,
      })
    },
    goToBuy(){
      wx.switchTab({
        url: '/pages/buyCard/main',
      })
    },
    selectTeam (teamId,teamName){
      let self = this
      if(!self.userId){
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
      } else {
        self.$http.selectTeam({
          userId: self.userId,
          activityId: self.activityid,
          teamId:teamId
        }).then(res => {
          if (res.data.code == '200'){
            wx.showToast({
              title: '成功加入' + teamName + '球队',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        })
      }
    }
  },
  created () {
  },
  onLoad (options) {
    let self = this
    self.activityid = options.activityid
    self.teamShow = options.type == "2" ? true : false
    self.$http.activityDetail({
      activityId: self.activityid
    }).then(res => {
      if (res.data.code == '200'){
        self.activityData = res.data.result[0]
        self.activityData.Time = `${self.$format.formatT(self.activityData.startdate)}-${self.$format.formatT(self.activityData.enddate)}`
        self.activityData.enddate = self.$format.formatT(self.activityData.enddate,1)
        self.caddieData = res.data.result[0].voteDoList
        self.caddieShow = self.caddieData.length ? true : false
        if (self.teamShow) {
          self.teamList = res.data.result[0].teamName ? JSON.parse(res.data.result[0].teamName) : [];
          console.log(self.teamList)
        }
        wx.setNavigationBarTitle({
          title: self.activityData.activityName
        })
      }
    })
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
  .top {
    img {
      width: 100%;
      height:420rpx;
    }
  }
  .caddie-list {
    margin:64rpx 30rpx 20rpx;
    padding:54rpx 0 34rpx;
    border:#02a319 solid 1rpx;
    border-radius: 5rpx;
    font-size: 0;
    position: relative;
    .title {
      position: absolute;
      top:-30rpx;
      left:50%;
      margin-left:-80rpx;
      padding:6rpx 8rpx;
      border:#02a319 solid 1rpx;
      background:#fff;
      .cont {
        width: 140rpx;
        height: 42rpx;
        line-height: 42rpx;
        font-size: 24rpx;
        color:#02a319;
        border:#02a319 solid 1rpx;
        text-align: center;
      }
    }
    .box {
      display: inline-block;
      text-align: center;
      width: 33.3%;
      img{
        width: 146rpx;
        height:146rpx;
        border-radius: 50%;
      }
      .ticket-btn {
        margin: 36rpx auto 0;
        width: 116rpx;
        height: 38rpx;
        font-size: 24rpx;
        line-height: 38rpx;
        color:#02a319;
        border:#02a319 solid 1rpx;
        background:#fff;
        border-radius: 4rpx;
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
    .list {
      margin-bottom: 18rpx;
      p{
        padding-left:36rpx;
        background:url(../../../static/diangray.png) left center no-repeat;
        background-size: 10rpx; 
      }
      .tel {
        background:url(../../../static/phoneicon.png) left center no-repeat;
        background-size: 28rpx; 
      }
    }
    .cont {
      margin-bottom: 18rpx;
      p{
        text-indent: 48rpx;
      }
    }
    .team {
      padding:40rpx 0;
      display: flex;
      justify-content:space-between;
      a {
        width: 280rpx;
        height:56rpx;
        line-height: 56rpx;
        color: #02a319;
        text-align: center;
        font-size: 24rpx;
        border-radius: 4rpx;
        border:#02a319 solid 1rpx;
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    button {
      border-radius: 0;
    }
  }
}

</style>

