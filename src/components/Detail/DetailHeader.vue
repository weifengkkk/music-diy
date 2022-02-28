<template>
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <div class="header-title" >{{title | ellipsis}}</div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: "SubHeader",
  data(){
    return {
      themes: ['theme','theme1','theme2'],
      index: 0
    }
  },
  props:{
    title:{
      type:String,
      default:'',
      required: true
    }
  },
  methods:{
    changeTheme(){
      this.index++
      if (this.index >= this.themes.length){
        this.index = 0;
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    back(){
      window.history.back()
    }
  },
  filters:{
    ellipsis(value){
      if(!value) return ''
      else if(value.length > 15){
        return value.slice(0,15) + '...'
      }
      return value
    }
  },
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.header{
  width: 100%;
  height: 100px;
  /*background: red;*/
  @include bg_color();
  display: flex;
  justify-content: space-between;
  //position: relative;
  //z-index: 999;
  .header-left, .header-right{
    width: 84px;
    height: 84px;
    /*background: #000;*/
    margin-top: 8px;
  }
  .header-left{
    @include bg_img('../../assets/images/back')
  }
  .header-right{
    @include bg_img('../../assets/images/more')
  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #FFFFFF;
    font-weight: bold;
    @include font_size($font_medium)
  }
;
}
</style>