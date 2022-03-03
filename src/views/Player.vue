<template>
<div>
  <NormalPlayer></NormalPlayer>
  <MiniPlayer @showList="showList"></MiniPlayer>
  <ListPlayer ref="listPlayer"></ListPlayer>
  <audio :src="currentSong.url"></audio>
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
    'currentSong'
  ]),
  },

  methods:{
    showList(){
      this.$refs.listPlayer.show()
    }
  }
}
</script>

<style scoped lang="scss">

</style>