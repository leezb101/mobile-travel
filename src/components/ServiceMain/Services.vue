<template>
  <div id="services">
    <router-link class="service-wrap" tag="a" v-for="(item, index) in serviceList" :key="index" :to="{path: 'service/' + item.id}">
      <p><img :src="item.imgUrl"></p>
      <p>{{ item.title }}</p>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Services',
  props: ['services'],
  computed: {
    serviceList () {
      const [...copyList] = this.services
      return copyList
    }
  }
}
</script>
<style lang="scss" scoped>
$aStyleColor: #000000;
$aBorder: #f5f5f5 0.5px solid;

$servicesDivWidth: 100%;
$servicesDivHeight: 33.1vw;

$iconImgWidth: 40%;
$iconImgHeight: 50%;

a {
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: $aStyleColor;
    text-decoration: none;
  }
}

a {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 33vw;
  height: 100%;
  background: #ffffff;
  text-align: center;
  border-collapse: collapse;
  border-bottom: $aBorder;

  &:nth-of-type(1),
  &:nth-of-type(2) {
    border-right: $aBorder;
  }
}

a p {
  &:first-child {
    margin-bottom: 1.66665vw;
    margin-top: 0;
    line-height: 60%;
  }
  &:last-child {
    margin-top: 1.66665vw;
    margin-bottom: 0;
  }
}

p img {
  margin: 0 auto;
  position: relative;
  display: block;
  width: $iconImgWidth;
  height: $iconImgHeight;
}
</style>
