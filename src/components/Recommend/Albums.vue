<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>推荐专辑</h3>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="value in albums" :key="value.id">
        <img v-lazy="value.picUrl" alt="">
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Albums",
  props:{

    albums:{
      type:Array,
      default:()=>[],
      required:true
    }
  }

}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.personalized{
  @include bg_sub_color();
  .personalized-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3{
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
    }
  }
  .personalized-list{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item{
      width: 200px;
      padding-bottom: 20px;
      img{
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }

    }
  }
}
</style>