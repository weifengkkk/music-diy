<template>
<transition @leave="leave" @enter="enter" @css="false">
  <div class="mini-player" v-show="this.isShowMiniPlayer" ref="miniPlayer">
  <div class="player-wrapper">
  <div class="player-left" @click="showNormalPlayer"> 
    <img src="../../assets/images/list_qq.png" alt="" >
    <div class="player-title">
      <h3>演员</h3>
      <p>薛之谦</p>
    </div>
  </div>
  <div class="player-right">
    <div class="play" ref="play" @click="play"></div>
    <div class="list" @click.stop="showList"></div>
  </div>
  </div>
</div>
</transition>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: "MiniPlayer",
  methods:{
    showList(){
      this.$emit('showList')
    },
     ...mapActions([
    'setFullScreen',
    'setMiniPlayer',
    'setIsPlaying'
  ]),
  showNormalPlayer(){
    this.setFullScreen(true);
    this.setMiniPlayer(false)
  },
    enter(el,done){
    Velocity(this.$refs.miniPlayer, 'transition.bounceIn', { duration: 500 },function(){
      done()
    })
  },
  leave(el,done){
    Velocity(this.$refs.miniPlayer, 'transition.bounceOut', { duration: 500 },function(){
      done()
    })
  },
  play(){
    this.setIsPlaying(!this.isPlaying)
  }
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
      'isShowMiniPlayer',
      'isPlaying'
    ])
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.mini-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 120px;
  .player-wrapper{
    @include bg_color();
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    .player-left{
      display: flex;
      img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .player-title{
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h3{
          @include font_size($font_medium);
          @include font_color();
        }
        p{
          padding-top: 10px;
          @include font_size($font_medium_s);
          @include font_color();
        }
      }
    }
    .player-right{
      display: flex;
      align-items: center;
      .play{
        width: 84px;
        height: 84px;
        @include bg_img('../../assets/images/pause');
        &.active{
        @include bg_img('../../assets/images/play');
        }
      }
      .list{
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list');
      }
    }
  }

}
</style>