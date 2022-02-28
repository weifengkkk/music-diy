<template>
<div>
  <NormalPlayer></NormalPlayer>
  <MiniPlayer @showList="showList"></MiniPlayer>
  <ListPlayer ref="listPlayer"></ListPlayer>
</div>
</template>
<script>
import NormalPlayer from "@/components/player/NormalPlayer";
import MiniPlayer from "@/components/player/MiniPlayer";
import ListPlayer from "@/components/player/ListPlayer";
export default {
  name: "Player",
  components:{
    MiniPlayer,
    NormalPlayer,
    ListPlayer
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