export default{
    isFullScreen(state){
        return state.isFullScreen;
    },
    isShowMiniPlayer(state){
        return state.isShowMiniPlayer;
    },
    isPlaying(state){
        return state.isPlaying;
    },
    modeType(state){
        return state.modeType;
    },
    listPlayerShow(state){
        return state.listPlayerShow;
    },
    songDetail(state){
        return state.songDetail
    },
    currentSong(state){
        let obj = {
            name: '',
            singer: '',
            picUrl: null,
            id: null,
            url: null
        }
        if(state.songDetail !== 0){
            obj = state.songDetail[state.currentIndex]
        }

        return obj
    },
    currentLyric(state){
        return state.currentLyric
    },
    currentIndex(state){
        return state.currentIndex
    },
    curTime(state){
        return state.curTime
    }
}