<template>
  <swiper :options="swiperOptions" class="banner" >
    <swiper-slide class="item cd" >
      <div class="cd-wrapper" ref="cdwrapper">
        <img src="https://img2.baidu.com/it/u=2909654508,3731451178&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750" alt="">
      </div>
      <p>歌词部分</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li>我是1个li</li>
          <li>我是2个li</li>
          <li>我是3个li</li>
          <li>我是4个li</li>
          <li>我是5个li</li>
          <li>我是6个li</li>
          <li>我是7个li</li>
          <li>我是8个li</li>
          <li>我是9个li</li>
          <li>我是10个li</li>
          <li>我是11个li</li>
          <li>我是12个li</li>
          <li>我是13个li</li>
          <li>我是14个li</li>
          <li>我是15个li</li>
          <li>我是16个li</li>
          <li>我是17个li</li>
          <li>我是18个li</li>
          <li>我是19个li</li>
          <li>我是20个li</li>
          <li>我是21个li</li>
          <li>我是22个li</li>
          <li>我是23个li</li>
          <li>我是24个li</li>
          <li>我是25个li</li>
          <li>我是26个li</li>
          <li>我是27个li</li>
          <li>我是28个li</li>
          <li>我是29个li</li>
          <li>我是30个li</li>
          <li>我是31个li</li>
          <li>我是32个li</li>
          <li>我是33个li</li>
          <li>我是50个li</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import ScrollView from "@/components/ScrollView";
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import { mapGetters } from 'vuex';
export default {
  name: "PlayerMiddle",
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observe: true,
        observeParents: true,
        observeSlideChildren: true
        // Some Swiper option/callback...
      }
    }
  },
  components:{
    swiper,
    swiperSlide,
    ScrollView
  },
  computed:{
    ...mapGetters([
      'isPlaying'
    ])
  },
  watch:{
    isPlaying(newValue){
      if(newValue){
        this.$refs.cdwrapper.classList.add('active')
      }else{
        this.$refs.cdwrapper.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/css/mixin";
@import "src/assets/css/variable";
.banner{
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd{
    .cd-wrapper{
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #FFFFFF;
      overflow: hidden;
      animation: sport 15s linear infinite;
      animation-play-state: running;
      &.active{
      animation-play-state: paused;
      }
      img{
        height: 100%;
        width: 100%;
      }
    }
    p{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
    }
  }
}
.lyric{
  li{
    text-align: center;
    @include font_size($font_medium);
    @include font_color();
    margin: 10px 0;
    &:last-of-type{
      padding-bottom: 100px;
    }
  }
}
 @keyframes sport{
   from{
     transform: rotate(0deg)
   }
   to{
     transform: rotate(360deg)
   }
 }
</style>
<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active{
  width: 60px;
  @include bg_color();
}
</style>
