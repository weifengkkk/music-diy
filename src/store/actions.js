import { getSongDetail } from '../api'
import{
    SET_FULL_SCREEN,
    SET_MINI_PLAYER,
    SET_IS_PLAYING,
    SET_MODE_TYPE,
    SET_LISTPLAYER_SHOW,
    SET_SONG_DETAIL
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
    async setSongDetail({commit},ids){
        let result = await getSongDetail({ids: ids.join(',')})
        let list = []
        result.songs.forEach((value) => {
            let obj = {}
            obj.name = value.name
            let singer = ''
            value['ar'].forEach((item,index) => {
                if(index === 0){
                    singer = item.name
                }else{
                    singer += '-' + item.name
                }
            })
            obj.singer = singer
            obj.picUrl = value['al'].picUrl
            list.push(obj)
        })

        commit(SET_SONG_DETAIL,list)
    }
}