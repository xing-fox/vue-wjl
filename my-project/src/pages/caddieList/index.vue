<template>
  <div class="page">
    <div class="listTip xbox">
      <div class="xbox-1-3 tl">排名</div>
      <div class="xbox-1-3 tc">球童姓名</div>
      <div class="xbox-1-3 tr">投票数</div>
    </div>

    <div class="xbox player_tab" v-for="(item,index) in playerUr" :key="index">
      <div class="xbox-1-3 tl">{{item.number}}</div>
      <div class="xbox-1-3 tc"><img :src="item.img">{{item.name}}</div>
      <div class="xbox-1-3 tr">{{item.list}}</div>
    </div>
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
          number: '1',
          list: '256',
        },
        {
          img: '../../../static/qiutonglist.png',
          name: '小二',
          number: '2',
          list: '1252',
        },
        {
          img: '../../../static/qiutonglist.png',
          name: '小三',
          number: '3',
          list: '2303',
        },
        {
          img:'../../../static/qiutonglist.png',
          name: '小四',
          number: '4',
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
      padding:0 20rpx;
    .xbox{display:-webkit-flex;display:flex;}
    .xbox-1-3{width: 33.3328%;}
    .tl{text-align: left}
    .tc{text-align:center}
    .tr{text-align:right}
    .player_tab{
      width:100%;  
      height: 100rpx;
      line-height: 100rpx;
      font-size: 30rpx;   
      border-bottom:1px solid #eee;
      img{
        width:40rpx;
        height:40rpx;
        border-radius:50%;
        margin-right:10rpx;
        vertical-align:middle;
      }
    }
  }
</style>