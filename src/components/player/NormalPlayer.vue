<template>
<transition @leave="leave" @enter="enter" @css="false">
<div class="normal-player" v-show="this.isFullScreen" ref="normalPlayer">
  <div class="player-wrapper">
  <PlayerHeader></PlayerHeader>
  <PlayerMiddle></PlayerMiddle>
  <PlayerBottom></PlayerBottom>
  </div>
  <div class="player-bg" >
    <img :src="currentSong.picUrl" alt="" >
  </div>
</div>
</transition>
</template>

<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
import { mapGetters,mapActions } from 'vuex';
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: "NormalPlayer",
  components:{
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
    computed:{
    ...mapGetters([
      'isFullScreen',
      'currentSong',
    ])
  },
  methods:{
      ...mapActions([
     'getSongLyric'
   ]),
    enter(el,done){
      Velocity(this.$refs.normalPlayer, 'transition.shrinkIn', { duration: 500 },function(){
        done()
      })
    },
    leave(el,done){
      Velocity(this.$refs.normalPlayer, 'transition.shrinkOut', { duration: 500 },function(){
        done()
      })
    },
 
  },


    watch:{
    currentSong(newValue){
      if(newValue.id === undefined){
        return 
      }
      this.getSongLyric(newValue.id)
    }
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.normal-player{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img{
      position: absolute;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      filter: blur(10px);
    }
  }
}
</style>