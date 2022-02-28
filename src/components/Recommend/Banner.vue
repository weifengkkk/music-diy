<template>
  <swiper :options="swiperOptions" class="banner" v-if="banners.length>0">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img v-lazy="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  name: "Banner",
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay:{
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteration: false,
        },
        pagination: {
          el: '.swiper-pagination'
        },
        observe: true,
        observeParents: true,
        observeSlideChildren: true
        // Some Swiper option/callback...
      }
    }
  },
  props:{
    banners:{
      type:Array,
      default:()=>[],
      required:true
    }
  },
  components:{
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="scss">
  .banner{
    .item{
      width: 100%;
      height: 300px;
    }
  }
</style>
<style lang="scss">
@import "../../assets/css/mixin";
.banner{
  .swiper-pagination-bullet{
    width: 12px;
    height: 12px;
    background: #FFFFFF;
    opacity: 0.7;
  }
  .swiper-pagination-bullet-active{
    @include bg_color()
  }
}
</style>