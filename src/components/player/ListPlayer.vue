<template>
<transition @leave="leave" @enter="enter" @css="false" >
  <div class="list-player" v-show="this.listPlayerShow" ref="listPlayer">
    <div class="player-wrapper">
      <div class="player-top">
        <div class="top-left">
          <div class="mode" @click="mode" ref="mode"></div>
          <p v-if="this.modeType === 0">顺序循环</p>
          <p v-else-if="this.modeType === 1">单曲循环</p>
          <p v-else>随机循环</p>
        </div>
        <div class="top-right">
          <div class="del" @click="delAll"></div>
        </div>
      </div>
      <div class="player-middle">
        <ScrollView>
          <ul ref="play" >
                <li class="item" v-for="(value,index) in songDetail" :key="value.id" @click="selectMusic(index)">
              <div class="item-left">
                <div class="item-play"  @click.stop="play" v-show="currentIndex === index"></div>
                <p>{{value.name}}</p>
              </div>
              <div class="item-right">
                <div class="item-favorite">
                </div>
                <div class="item-del" @click.stop="del(index)">
                </div>
              </div>
            </li>
          </ul>
        </ScrollView>
      </div>
      <div class="player-bottom" @click.stop="hidden">
        <p>关闭</p>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import ScrollView from "@/components/ScrollView";
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapActions, mapGetters } from 'vuex';
import modeType from '../../store/modeType'
export default {
  name: "ListPlayer",
  components:{
    ScrollView
  },

    computed:{
    ...mapGetters([
      'isPlaying',
      'modeType',
      'listPlayerShow',
      'songDetail',
       'currentIndex',
    ]),
    },
    methods:{
      enter(el,done){
        Velocity(this.$refs.listPlayer, 'transition.perspectiveUpIn', { duration: 500 },function(){
          done()
        })
      },
      leave(el,done){
        Velocity(this.$refs.listPlayer, 'transition.perspectiveUpOut', { duration: 500 },function(){
          done()
        })
      },
      play(){
        this.setIsPlaying(!this.isPlaying)
      },
      hidden(){
        this.setListPlayerShow(false)
      },
      selectMusic(index){
         this.setCurrentIndex(index)
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
      del(index){
        this.setDelSong(index)
      },
      delAll(){
        this.setDelSong()
      },
      ...mapActions([
        'setIsPlaying',
        'setModeType',
        'setListPlayerShow',
        'setDelSong',
        'setCurrentIndex'

      ]),
  },
    watch:{
    isPlaying(newValue){
      if(newValue){
        this.$refs.play.classList.add('active')
      }else{
        this.$refs.play.classList.remove('active')
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
    listPlayerShow(newValue){
      if(newValue){
        this.$refs.ScrollView.refresh()
      }
    }
  }
    }
</script>

<style scoped lang="scss">
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.list-player{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-wrapper{
    .player-top{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left{
        display: flex;
        margin-left: 20px;
        .mode{
          width: 50px;
          height: 50px;
          @include bg_img('../../assets/images/small_loop');
          &.loop{
          @include bg_img('../../assets/images/small_loop');
          }
          &.one{
          @include bg_img('../../assets/images/small_one');
          }
          &.random{
          @include bg_img('../../assets/images/small_shuffle');
      }
        }
        p{
          margin-left: 20px;
          @include font_size($font_medium);
          @include font_color();
        }
      }
      .top-right{
        .del{
          width: 84px;
          height: 84px;
          @include bg_img('../../assets/images/small_del');
        }
      }
    }
    .player-middle{
      width: 100%;
      overflow: hidden;
      ul{
        &.active{
          .item{
            .item-play{
              @include bg_img('../../assets/images/small_play');
            }
          }
        }
      }
      .item{
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left{
          display: flex;
          align-items: center;
          .item-play{
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_pause');
         
          }
          p{
            margin-left: 20px;
            @include font_color();
            @include font_size($font_medium_s);
          }
        }
        .item-right{
          display: flex;
          align-items: center;
          .item-favorite{
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_favorite')
          }
          .item-del{
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img('../../assets/images/small_close')
          }
        }
      }
    }
    .player-bottom{
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p{
        text-align: center;
        @include font_size($font_medium);
        color: #cccccc;
      }
    }
  }
}
</style>