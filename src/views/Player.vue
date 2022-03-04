<template>
<div>
  <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
  <MiniPlayer @showList="showList"></MiniPlayer>
  <ListPlayer ref="listPlayer"></ListPlayer>
  <audio :src="currentSong.url"  ref="audio" @timeupdate="timeupdate"></audio>
</div>
</template>
<script>
import NormalPlayer from "@/components/player/NormalPlayer";
import MiniPlayer from "@/components/player/MiniPlayer";
import ListPlayer from "@/components/player/ListPlayer";
import { mapGetters } from 'vuex';
export default {
  name: "Player",
  components:{
    MiniPlayer,
    NormalPlayer,
    ListPlayer
  },
   
  computed:{
      ...mapGetters([
    'currentSong',
    'isPlaying',
    'currentIndex',
    'curTime'
  ]),
  },

  methods:{
    showList(){
      this.$refs.listPlayer.show()
    },
    timeupdate(e){
      let time = e.target.currentTime
      this.currentTime =  time;
      this.curTime = time
    }
  },
  watch:{
    isPlaying(newValue){
      if(newValue){
        this.$refs.audio.play()
      }else{
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      /*
      注意点: 在iOS中系统不会自动加载歌曲, 所以oncanplay不会自动执行
              https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html
              在PC端和Android端, 系统会自动加载歌曲, 所以oncanplay会自动被执行
      解决方案: 如何监听iOS中Audio的歌曲是否已经准备好了, 通过ondurationchange事件来监听
                ondurationchange事件什么时候执行: 当歌曲加载完成之后执行, 因为只有歌曲加载完成之后才能获取到歌曲的总时长
      * */
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue) {
      this.$refs.audio.currentTime = newValue
    },
    },
    mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration
    }
   },
  data(){
      return{
        totalTime: 0,
        currentTime: 0
      }
    },
}
</script>

<style scoped lang="scss">

</style>