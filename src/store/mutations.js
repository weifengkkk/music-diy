import{
    SET_FULL_SCREEN,
    SET_MINI_PLAYER,
    SET_IS_PLAYING,
    SET_MODE_TYPE,
    SET_LISTPLAYER_SHOW,
    SET_SONG_DETAIL,
    SET_SONG_LYRIC,
    SET_DEL_SONG,
    SET_CURRENT_INDEX
}from './mutations-type'


export default{
    [SET_FULL_SCREEN](state,flag){
        state.isFullScreen = flag
        if(flag){
            state.isShowMiniPlayer = false
            state.listPlayerShow = false
        }
    },
    [SET_MINI_PLAYER](state,flag){
        state.isShowMiniPlayer = flag
        if(flag){
            state.isFullScreen = false
            state.listPlayerShow = false
        }
    },
    [SET_IS_PLAYING](state,flag){
        state.isPlaying = flag
    },
    [SET_MODE_TYPE](state,flag){
        state.modeType = flag
    },
    [SET_LISTPLAYER_SHOW](state,flag){
        state.listPlayerShow = flag
    },
    [SET_SONG_DETAIL](state,list){
        state.songDetail = list
    },
    [SET_SONG_LYRIC](state,lyric){
        state.currentLyric = lyric
    },
    [SET_DEL_SONG](state,index){
        index === undefined ? state.songDetail = [] : state.songDetail.splice(index,1) 
        if(state.currentIndex > index) state.currentIndex -= 1
        if(state.songDetail.length === 0){
            state.isFullScreen = false
            state.isShowMiniPlayer = false
            state.listPlayerShow = false
        }
    },
    [SET_CURRENT_INDEX](state,index){
        if(index < 0){
            index = state.songDetail.length-1
        }else if (index > state.songDetail.length-1){
            index = 0
        }
            state.currentIndex = index
    }
}