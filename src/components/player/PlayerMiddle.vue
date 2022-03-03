<template>
  <swiper :options="swiperOptions" class="banner" >
    <swiper-slide class="item cd" >
      <div class="cd-wrapper" ref="cdwrapper">
        <img :src="currentSong.picUrl" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li v-for="(value,index) in currentLyric" :key="index">{{value}}</li>
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
      'isPlaying',
      'currentSong',
      'currentLyric'
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
  },
  methods:{
    getFirstLyric(){
      for(let key in this.currentLyric){
        return this.currentLyric[key]
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
      animation-play-state: paused;
      &.active{
      animation-play-state: running;
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
