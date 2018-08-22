import Vue from 'vue'
import Router from 'vue-router'
import TravelService from '@/components/ServiceMain/TravelService'
import HotelInfo from '@/components/ServiceSub/Hotel/HotelInfo'
import HotelDetail from '@/components/ServiceSub/Hotel/HotelDetail'
import AgencyInfo from '@/components/ServiceSub/Agency/AgencyInfo'
import AgencyDetail from '@/components/ServiceSub/Agency/AgencyDetail'
import ScenicInfo from '@/components/ServiceSub/Scenic/ScenicInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TravelService',
      component: TravelService
    },
    {
      path: '/service/hotel',
      name: 'HotelInfo',
      component: HotelInfo
    },
    {
      path: '/service/hotel/:hid',
      name: 'HotelDetail',
      component: HotelDetail
    },
    {
      path: '/service/agency',
      name: 'AgencyInfo',
      component: AgencyInfo
    },
    {
      path: '/service/agency/:aid',
      name: 'AgencyDetail',
      component: AgencyDetail
    },
    {
      path: '/service/scenic',
      name: 'ScenicInfo',
      component: ScenicInfo
    }
  ]
})
