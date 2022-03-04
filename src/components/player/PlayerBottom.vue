<template>
  <div class="player-bottom">
    <div class="bottom-progress" >
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-controller">
      <div class="mode" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play"  @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite"></div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import modeType from '../../store/modeType'
import { formatTime } from '../../tool/tools'
export default {
  name: "PlayerBottom",
    props:{
    totalTime:{
      type: Number,
      default: 0,
      required: true
    },
    currentTime:{
      type: Number,
      default: 0,
      required: true
    }
  },
  computed:{
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex'
    ])
  },
  methods:{
    play(){
      this.setIsPlaying(!this.isPlaying)
    },
    prev(){
       this.setCurrentIndex(this.currentIndex-1)
    },
    next(){
      this.setCurrentIndex(this.currentIndex+1)
    },
    mode(){
      if(this.modeType === modeType.loop){
        this.setModeType(modeType.one)
      }else if(this.modeType === modeType.one){
        this.setModeType(modeType.random)
      }else if(this.modeType === modeType.random){
        this.setModeType(modeType.loop)
      }
    },

    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex'
    ]),
 
  },
  watch:{
    isPlaying(newValue){
      if(newValue){
        this.$refs.play.classList.add('active');
      }else{
        this.$refs.play.classList.remove('active');
      }
    },
    modeType(newValue){
      if(newValue === modeType.one){
        this.$refs.mode.classList.add('one')
        this.$refs.mode.classList.remove('loop')
      }else if(newValue === modeType.random){
        this.$refs.mode.classList.add('random')
        this.$refs.mode.classList.remove('one')
      }else if(newValue === modeType.loop){
        this.$refs.mode.classList.add('loop')
        this.$refs.mode.classList.remove('random')
      }
    },
    totalTime(newValue){
      let time = formatTime(newValue)
      this.$refs.eleTotalTime.innerHTML = time.minute + ':' +   time.second
    },
    currentTime(newValue){
      let time = formatTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minute + ':' +   time.second

    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.player-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      @include font_size($font_small);
      @include font_color()
    }
    .progress-bar{
      width: 100%;
      margin: 0 10px;
      height: 10px;
      background: white;
      .progress-line{
        width: 50%;
        height: 100%;
        background: #ccc;
        position: relative;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controller{
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      width: 84px;
      height: 84px;
    }
    .mode{
      @include bg_img('../../assets/images/loop');
       &.loop{
       @include bg_img('../../assets/images/loop');
      }
      &.one{
       @include bg_img('../../assets/images/one');
      }
       &.random{
       @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev{
      @include bg_img('../../assets/images/prev')
    }
    .play{
        @include bg_img('../../assets/images/pause');
        &.active{
        @include bg_img('../../assets/images/play');
        }
      }
    .next{
      @include bg_img('../../assets/images/next')
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite');
      &.active{
        @include bg_img('../../assets/images/favorite')
      }
    }
  }
}
</style>S