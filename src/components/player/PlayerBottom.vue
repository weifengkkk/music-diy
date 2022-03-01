<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom-controller">
      <div class="mode"></div>
      <div class="prev"></div>
      <div class="play" ref="play" @click="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "PlayerBottom",
 
  methods:{
    ...mapActions([
      'setIsPlaying'
    ]),
    play(){
        this.setIsPlaying(!this.isPlaying)
    },
  
  },
  watch:{
    isPlaying(newValue){
      if(newValue){
        this.$refs.play.classList.add('active');
      }else{
        this.$refs.play.classList.remove('active');
      }
    }
  },
   computed:{
    ...mapGetters([
      'isPlaying'
    ])
  },

}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
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
      position: relative;
      .progress-line{
        width: 50%;
        height: 100%;
        background: #cccccc;
        .progress-dot{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          left: 50%;
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
      @include bg_img('../../assets/images/loop')
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