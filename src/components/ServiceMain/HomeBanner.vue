<template>
  <div id="banner">
    <div class="slider-wrap">
      <ul class="slider-items" :style="[sliderActiveStyle, {'width': sliderImgs.length*100+'%'}]" @touchstart="stopSlider($event)" @touchmove="moveSlider($event)" @touchend="continSlider(event)">
        <li class="slider-item" v-for="(item, index) in items" :key="index" @click.stop="linkToURL(item)" :style="{'width': 100/sliderImgs.length+'%'}">
          <img :src="getUrl(item, index)" class="item-img">
        </li>
      </ul>
    </div>
    <ul class="banner-page">
      <li class="slider-btn" v-for="(item, index) in bannerList" :key="index" :class="{'active': index === currentSlider}"></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HomeBanner',
  props: ['bannerList'],
  data () {
    return {
      sliderActiveStyle: {
        transfrom: 'translate3d(-100vw, 0, 0)',
        transition: 'transfrom 2s'
      },
      innerTimer: '', // 内部计时器，用于控制banner自动滚动事件
      touchStart: '', // 触摸开始的x坐标
      touchMove: '', // 触摸过程中手指移动的坐标
      canSlider: true, // 指示是否可以滚动的flag
      currentSlider: 0 // 当前slider的索引，同时影响图片展示和下面的indicator
    }
  },
  computed: {
    sliderImgs: function () {
      const [...savedItems] = this.bannerList // 拷贝原有数组以供操作
      const [firstItem, ...other] = this.bannerList // 分段拷贝数组以供操作
      // 上述拷贝的目的是在原数组基础上头部增加一个末尾item，尾部增加一个首个item，完成循环的效果
      savedItems.unshift(other[other.length - 1])
      savedItems.push(firstItem)
      return savedItems
    }
  },
  mounted () {
    var self = this
    if (self.bannerList && self.bannerList.length) {
      self.innerTimer = setInterval(() => {
        self.sliderStart()
      }, 3000)
    }
  },
  methods: {
    linkToURL (item) {
      window.location.href = item.linkUrl
    },
    getUrl (item, index) {
      return item.imgUrl
    },
    stopSlider (event) {
      // 事件委托排除当前绑定的dom
      if (event.target !== event.currentTarget) {
        clearInterval(this.innerTimer)
        delete this.sliderActiveStyle['transition']
        this.touchStart = event.targetTouches[0].screenX // 记录触摸初始的X坐标
      }
    },
    moveSlider (event) {
      let self = this
      // 如果当前slider的索引不在范围内，什么也不作
      if (self.currentSlider === -1 || self.currentSlider === self.bannerList.length) {
        return
      }
      if (event.target !== event.currentTarget) {
        self.touchMove = event.targetTouches[0].screenX
        let sliderDir, targetWidth, tranDir
        sliderDir = self.touchMove - self.touchStart
        targetWidth = parseInt(window.getComputedStyle(event.target).width) // 获取当前触摸目标的宽度
        if (sliderDir < -50 || sliderDir > 50) { // 增加50容错
          if (sliderDir < 0) {
            sliderDir -= 50
          } else {
            sliderDir += 50
          }
          // 触摸时图片随手指移动，距离应该减去当前图片的宽度*当前滚动索引
          tranDir = -targetWidth * (self.currentSlider + 1) + sliderDir
          self.sliderActiveStyle.transfrom = `translate3d(${tranDir}, 0, 0)`
        }
      }
    },
    continSlider (event) {
      // 结束触摸
      let self = this
      if (event.target !== event.currentTarget && self.touchMove) {
        const sliderDir = self.touchMove - self.touchStart
        if (sliderDir < 0) {
          self.currentSlider++
        } else if (sliderDir > 0) {
          self.currentSlider--
        }
        self.currentSlider--
        self.sliderStart()
        // 重置所有跟滑动操作相关属性
        self.touchMove = 0
        self.touchstar = 0
        self.innerTimer = setInterval(() => {
          self.sliderStart()
        }, 3000)
      }
    },
    sliderStart () {
      let self = this
      self.currentSlider++
      self.currentSlider %= self.sliderImgs.length
      if (self.currentSlider === self.bannerList.length) {
        // 向右滑动到最大值时，将位置初始化并清0 currentSlider
        // 设置一个定时器，用于异步处理，一个进行尾端拷贝的图片的正常滑动，这个处理在差不多到达时重置，造成无限循环的错觉
        setTimeout(() => {
          self.sliderActiveStyle = {
            transfrom: `translate3d(-100vw, 0, 0)`
          }
        }, 500)
      }
      if (self.currentSlider === -1) {
        // 向右滑动到最小时，置为最大值
        setTimeout(() => {
          self.currentSlider = self.bannerList.length - 1
          self.sliderActiveStyle = {
            transfrom: `translate3d(${-100 * (self.currentSlider + 1)}vw, 0, 0)`
          }
        }, 500)
      }
      self.sliderActiveStyle = Object.assign({}, {
        transition: 'transfrom 0.5s',
        transfrom: `translate3d(${-100 * (self.currentSlider + 1)}vw, 0, 0)`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$btnActiveColor: #c62f2f;
$btnColor: #aaaaaa;

.banner {
  position: relative;
  width: 100%;
}
.banner-page {
  position: relative;
  bottom: 1rem;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0;
}
.slider-btn {
  width: 0.8rem;
  height: 0.8rem;
  background-color: $btnColor;
  border-radius: 50%;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  list-style: none;
}
.slider-btn[class~="active"] {
  background-color: $btnActiveColor;
}
.slider-wrap {
  overflow: hidden;
}
.slider-items {
  font-size: 0;
  overflow: hidden;
  padding: 0;
}
.slider-item {
  width: 25rem;
  float: left;
}
.slider-item .item-img {
  width: 100%;
}
</style>
