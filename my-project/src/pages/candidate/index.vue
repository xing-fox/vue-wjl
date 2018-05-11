<template>
  <div class="page">
    <div class="searchBox">
      <input type="text" placeholder="请输入编号" auto-focus/>
      <span>搜索</span>
    </div>
    <ul class="player_tab">
      <li v-for="(item,index) in playerUr" :key="index">
        <img :src="item.img">
        <div class="tab_name">
          <p class="fl">{{item.name}}</p>
          <span class="fr">编号：{{item.number}}</span>
        </div>
        <div class="tab_list">
          <p class="fl">{{item.list}}</p>
          <span class="fr">投票</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      playerUr: [
        {
          img: '../../../static/qiutonglist.png',
          name: '小一',
          number: '25',
          list: '256',
        },
        {
          img: '../../../static/qiutonglist.png',
          name: '小二',
          number: '26',
          list: '1252',
        },
        {
          img: '../../../static/qiutonglist.png',
          name: '小三',
          number: '27',
          list: '2303',
        },
        {
          img:'../../../static/qiutonglist.png',
          name: '小四',
          number: '28',
          list: '28',
        }
      ]
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
  page{background:#f9f9f9;padding:3% 0 3% 4%;}
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
</style>
<style lang="less" scoped>
  .page{

    .searchBox{
      width: 100%;
      display: flex;
      flex: 1;
      height:77rpx;
      input{
        width:74%;
        height:77rpx;
        background:#fff;
        padding:0 20rpx;
        font-size:30rpx;
        border:1px solid #e4e4e4;
        border-radius:10rpx;
        color:#333;
        box-sizing: border-box;
      }
      span{
        height:77rpx;
        line-height:77rpx;
        font-size:30rpx;
        color:#fff;
        background:#00a320;
        display: inline-block;
        padding: 0 18px;
        border-radius:10rpx;
        margin-left:16rpx;
      }
    }
    .player_tab{
      width:100%;
      li{
        margin-top:25rpx;
        border:1px solid #e4e4e4;
        background: #fff;
        width:43%;
        margin-right:4%;
        float: left;
        height: 300 rpx;
        overflow: hidden;
        border-right:10rpx;
        color: #000;
        img{
          width:100%;
          height:230rpx;
          border-right:10rpx;
        }
        .tab_name{
          height:58rpx;
          line-height:58rpx;
          font-size:30rpx;
          padding:0 8rpx;
        }
        .tab_list{
          height:48rpx;
          line-height:48rpx;
          margin-bottom:10rpx;
          font-size:34rpx;
          padding:0 8rpx;
          span{
            height:48rpx;
            line-height:48rpx;
            color:#0ba31d;
            border:1px solid #0ba31d;
            padding:0 20rpx;
            box-sizing: border-box;
          }
        }
      }
    }
  }
</style>

