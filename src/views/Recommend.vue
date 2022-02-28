<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized :personals="personals" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
          <Personalized :personals="albums" :title="'推荐专辑'" @select="fatherSelectItem" :type="'album'"></Personalized>
          <SongList :songs="newSongs" :title="'最新歌曲'"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {getBanner, getNewAlbum, getNewSong, getPersonalized} from "@/api";
import Banner from "@/components/Recommend/Banner";
import Personalized from "@/components/Recommend/Personalized";
import SongList from "@/components/Recommend/SongList";
import ScrollView from "@/components/ScrollView";
export default {
  name: "Recommend",
  methods: {
    fatherSelectItem(id,type){
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  data(){
    return {
      banners: [],
      personals: [],
      albums: [],
      newSongs: []
    }
  },
  created() {
    const this_ = this
    getBanner()
    .then(function (data) {
      this_.banners = data.banners
    })
    .catch(function (error){
      // eslint-disable-next-line no-console
      console.log(error)
    })
    getPersonalized()
        .then(function (data) {
          // eslint-disable-next-line no-console
          this_.personals = data.result
        })
        .catch(function (error){
          // eslint-disable-next-line no-console
          console.log(error)
        })
    getNewAlbum()
      .then(function (data){
        this_.albums = data.albums.splice(0,6)
      })
    getNewSong()
      .then(function (data) {
        this_.newSongs = data.result.splice(0,6)
        // eslint-disable-next-line no-console
        // console.log(this_.newSongs)
      })
  },
  components: {
    SongList,
    Banner,
    Personalized,
    ScrollView
  }
}
</script>

<style scoped lang="scss">
.recommend{
   position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  //overflow: hidden;
  .recommend-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

//过渡动画
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 0.5s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 0.5s;
}
</style>