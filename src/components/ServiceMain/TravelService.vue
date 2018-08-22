<template>
  <div id="travel-service">
    <banner-component v-if="bannerlist.length" :bannerlist='bannerlist' ></banner-component>
    <services-component v-if="services.length" :services='services' ></services-component>
  </div>
</template>
<script>
import BannerComponent from './HomeBanner'
import ServicesComponent from './Services'

export default {
  name: 'TravelService',
  data () {
    return { // TODO:这里需要填入初始数据
      bannerlist: [
        {
          imgUrl: require('../../assets/benner@2x.png')
        }
      ],
      services: [
        {
          title: '星级饭店查询',
          id: 'hotel',
          imgUrl: require('../../assets/xingji@2x.png')
        },
        {
          title: '旅行社信息查询',
          id: 'agency',
          imgUrl: require('../../assets/lvxing@2x.png')
        },
        {
          title: 'A级景区查询',
          id: 'scenic',
          imgUrl: require('../../assets/aji@2x.png')
        }]
    }
  },
  components: {
    BannerComponent,
    ServicesComponent
  },
  mounted () {
    // TODO: 这里需要填入获取json数据作为data的逻辑
  }
}
</script>
