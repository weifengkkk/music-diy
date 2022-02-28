<template>
<div class="detail">
  <DetailHeader :title="playlist.name"></DetailHeader>
  <DetailTop :path="playlist.path" ref="top"></DetailTop>
  <div class="bottom">
    <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
    </ScrollView>
  </div>

</div>
</template>

<script>
import DetailHeader from "@/components/Detail/DetailHeader";
import {getPlayList, getAlbum} from "@/api";
import DetailTop from "@/components/Detail/DetailTop";
import DetailBottom from "@/components/Detail/DetailBottom";
import ScrollView from "@/components/ScrollView";
export default {
  name: "Detail",
  components:{
    ScrollView,
    DetailHeader,
    DetailTop,
    DetailBottom
  },
  data(){
    return{
      playlist: {
        name:'',
        path:'',
        tracks:[]
      }
    }
  },
  created() {
    if (this.$route.params.type==='personalized'){
      getPlayList({id:this.$route.params.id})
          .then((data)=>{
            // eslint-disable-next-line no-console
            this.playlist.name=data.playlist.name
            this.playlist.path=data.playlist.coverImgUrl
            this.playlist.tracks=data.playlist.tracks
          })
          .catch((err)=>{
            // eslint-disable-next-line no-console
            console.log(err)
          })
    }else if (this.$route.params.type==='album'){
      getAlbum({id:this.$route.params.id})
          .then((data)=>{
            // eslint-disable-next-line no-console
            console.log(data)
            this.playlist.name=data.album.name
            this.playlist.path=data.album.picUrl
            this.playlist.tracks=data.songs
          })
          .catch((err)=>{
            // eslint-disable-next-line no-console
            console.log(err)
          })
    }
  },
  mounted() {
    let defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrolling( (offsetY)=>{
      // eslint-disable-next-line no-console
      if (offsetY < 0){
        //高斯模糊非常消耗性能,建议限制监听次数
        let scale =  0.5 * Math.abs(offsetY)/defaultHeight
        this.$refs.top.changeMask(scale)
        // eslint-disable-next-line no-console
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
        // eslint-disable-next-line no-console
      }else {
        // eslint-disable-next-line no-console
        let scale = 1+offsetY/defaultHeight
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }

}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin';

.detail{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();

  .bottom{
    position: fixed;
    top:500px;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

</style>