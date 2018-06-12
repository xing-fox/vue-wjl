<template>
  <div class="page">
    <p>我接受西甲的商业合作伙伴根据隐私政策的约定，通过个人电子邮箱发送与西甲相关的活动、优惠及其他商业信息。<br/>I accept that subject to the Private Policy, the business partners of LaLiga shall be able to send activities related to LaLiga, discounts and other business information via personal emails.</p>
    <p @click="goUrl()"><span>http://www.laliga.es/aviso-legal-privacidad-cookies/#privacidad-cookies</span></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
    goUrl(){
      wx.navigateTo({
        url: '/pages/openUrl/main?url=http://www.laliga.es/aviso-legal-privacidad-cookies/#privacidad-cookies',
      })
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.page {
  color:#666;
  font-size: 28rpx;
  line-height: 42rpx;
  padding:20rpx 40rpx;
  p{
    text-indent: 56rpx;
    padding: 30rpx 0;
    span {
      text-decoration:underline;
      color:#1a87ff;
    }
  }
}
</style>

