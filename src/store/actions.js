import { getSongDetail, getSongUrl } from '../api'
import { getSongLyric } from '../api'
import{
    SET_FULL_SCREEN,
    SET_MINI_PLAYER,
    SET_IS_PLAYING,
    SET_MODE_TYPE,
    SET_LISTPLAYER_SHOW,
    SET_SONG_DETAIL,
    SET_SONG_LYRIC,
    SET_DEL_SONG
}from './mutations-type'


export default{
    setFullScreen({commit},flag){
        commit(SET_FULL_SCREEN,flag)
    },
    setMiniPlayer({commit},flag){
        commit(SET_MINI_PLAYER,flag)
    },
    setIsPlaying({commit},flag){
        commit(SET_IS_PLAYING,flag)
    },
    setModeType({commit},flag){
        commit(SET_MODE_TYPE,flag)
    },
    setListPlayerShow({commit},flag){
        commit(SET_LISTPLAYER_SHOW,flag)
    },
    setDelSong({commit},flag){
        commit(SET_DEL_SONG,flag)
    }
    ,
    async setSongDetail({commit},ids){
        let result = await getSongDetail({ids: ids.join(',')})
        let urls = await getSongUrl({id:ids.join(',')})
        let list = []
        result.songs.forEach((value,i) => {
            let obj = {}
            obj.url = urls.data[i].url
            obj.name = value.name
            let singer = ''
            let picUrl = ''
            value['ar'].forEach((item,index) => {
                if(index === 0){
                    singer = item.name
                }else{
                    singer += '-' + item.name
                }
            })
            picUrl = value['al'].picUrl
            obj.singer = singer
            obj.picUrl = picUrl
            obj.id = value.id
            list.push(obj)
        })

        commit(SET_SONG_DETAIL,list)
    },
    async getSongLyric ({ commit }, id) {
        let result = await getSongLyric({ id: id })
        // console.log(result.lrc.lyric)
        let obj = parseLyric(result.lrc.lyric)
        commit(SET_SONG_LYRIC, obj)
      },

}
function parseLyric (lrc) {
    let lyrics = lrc.split('\n')
    // [00:00.000] 作曲 : 林俊杰
    // 1.定义正则表达式提取[00:00.000]
    let reg1 = /\[\d*:\d*\.\d*\]/g
    // 2.定义正则表达式提取 [00
    let reg2 = /\[\d*/i
    // 3.定义正则表达式提取 :00
              //eslint-disable-next-line
    let reg3 = /\:\d*/i
    // 4.定义对象保存处理好的歌词
    let lyricObj = {}
    lyrics.forEach(function (lyric) {
      // 1.提取时间
      let timeStr = lyric.match(reg1)
      if (!timeStr) { return }
      timeStr = timeStr[0]
      // 2.提取分钟
      let minStr = timeStr.match(reg2)[0].substr(1)
      // 3.提取秒钟
      let secondStr = timeStr.match(reg3)[0].substr(1)
      // 4.合并时间, 将分钟和秒钟都合并为秒钟
      let time = parseInt(minStr) * 60 + parseInt(secondStr)
      // 5.处理歌词
      let text = lyric.replace(reg1, '').trim()
      // 6.保存数据
      lyricObj[time] = text
    })
    return lyricObj
  }