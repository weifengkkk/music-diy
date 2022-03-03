<template>
  <ul class="detail-bottom" >
    <li class="detail-top" @click="playAllMusic">
      <div class="bottom-icon"  ref="play" ></div>
      <div class="bottom-title" >播放全部</div>
    </li>
    <li  v-for="value in playlist" :key="value.id"  class="item" @click="selectMusic(value.id)">
      <h3>{{value.name}}</h3>
      <p>{{value.al.name}} - {{value.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "DetailBottom",
  props:{
    playlist:{
      type:Array,
      default:()=>[],
      required:true
    }
  },
  methods:{
    ...mapActions(
      ['setFullScreen','setMiniPlayer','setIsPlaying','setSongDetail','setMiniPlayer']
    ),
    selectMusic(id) {
      /* this.$store.dispatch('setFullScreen',true) */
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
    },

    playAllMusic(){
      this.setIsPlaying(!this.isPlaying)
      this.setFullScreen(true)
      let ids = this.playlist.map((item)=>{
        return item.id
      })
      this.setSongDetail([ids])

    }
  },
  computed:{
    ...mapGetters([
      'isPlaying',
      'songDetail'
    ])
  },
  watch:{
    isPlaying(newValue){
      if(newValue){
        this.$refs.play.classList.add('active')
      }else{
        this.$refs.play.classList.remove('active')
      }

    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";
.detail-bottom{
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: black solid 1px;
  }
}
.detail-top{
  display: flex;
  align-items: center;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  .bottom-icon{
    width: 60px;
    height: 60px;
    @include bg_img('../../assets/images/small_pause');
    &.active{
      @include bg_img('../../assets/images/small_play');
    }
  }
  .bottom-title{
    margin-left: 20px;
    @include font_color();
    @include font_size($font_large)
  }
}
.item{
  h3{
    @include font_color();
    @include font_size($font_medium)
  }
  p{
    @include font_color();
    @include font_size($font_small)
  }
  opacity: 0.9;
}
</style>