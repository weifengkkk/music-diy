<template>
<transition @leave="leave" @enter="enter" @css="false" >
  <div class="list-player" v-show="isShow" ref="listPlayer">
    <div class="player-wrapper">
      <div class="player-top">
        <div class="top-left">
          <div class="mode"></div>
          <p>顺序播放</p>
        </div>
        <div class="top-right">
          <div class="del"></div>
        </div>
      </div>
      <div class="player-middle">
        <ScrollView>
          <ul>
            <li class="item">
              <div class="item-left">
                <div class="item-play" ref="is"></div>
                <p>演员</p>
              </div>
              <div class="item-right">
                <div class="item-favorite">
                </div>
                <div class="item-del">
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
export default {
  name: "ListPlayer",
  components:{
    ScrollView
  },
  data:function (){
    return{
      isShow: false
    }
  },
  methods:{
    show(){
      this.isShow = true
    },
    hidden(){
      this.isShow = false
    },
  enter(el,done){
    Velocity(this.$refs.listPlayer, 'transition.perspectiveUpIn', { duration: 500 },function(){
      done()
    })
  },
  leave(el,done){
    Velocity(this.$refs.listPlayer, 'transition.perspectiveUpOut', { duration: 500 },function(){
      done()
    })
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
          @include bg_img('../../assets/images/small_loop')
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
            @include bg_img('../../assets/images/small_pause')
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