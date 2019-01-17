export const MUSIC_LIST = 'MUSIC_LIST' // 音乐列表
export const ALBUMS = 'ALBUMS' // 专辑列表
export const HOME_STATUS = 'HOME_STATUS' // 主页状态
export const HOT_MUSICS = 'HOT_MUSICS'
export const HOT_SEARCHES = 'HOT_SEARCHES'
export const PLAY_MODEL = 'PLAY_MODEL' // 播放模式(列表循环、单曲循环、随机播放、列表一次)
export const PLAY_INDEX = 'PLAY_INDEX'
export const PLAY_LIST = 'PLAY_LIST'

export const VisiabilityFilters = {
  GET_ALL: 'GET_ALL', // 获取所有
  HOME_STATUS: 'HOME_STATUS', // 首页状态
  ALBUMS: 'ALBUMS', // 热门专辑列表
  HOT_MUSICS: 'HOT_MUSICS'
}

/**
 * 添加音乐列表
 * @param {Object} musics 音乐列表对象
 */
export const addMusics = musics => {
  return {
    type: VisiabilityFilters.GET_ALL,
    musics,
    name: 'edgardong'
  }
}

/**
 * 修改首页状态
 * @param {Number} status 状态
 */
export const changeHomeStatus = status => ({
  type: HOME_STATUS,
  status
})

/**
 * 添加专辑列表
 * @param {Array} albums 专辑列表
 */
export const addAlbums = albums => ({
  type: ALBUMS,
  albums
})

/**
 * 添加热门歌曲
 * @param {Array} musics 热歌列表
 */
export const addHotMusics = musics => ({
  type: HOT_MUSICS,
  musics
})

/**
 * 添加最近热搜榜
 * @param {Array} hots 最近热搜榜
 */
export const addHotSearches = hots => ({
  type: HOT_SEARCHES,
  hots
})

/**
 * 设置当前播放的索引
 * @param {Number} index 当前播放索引
 */
export const addPlayIndex = index => ({
  type: PLAY_INDEX,
  index
})

export const addPlayList = musics => ({
  type: PLAY_LIST,
  musics
})