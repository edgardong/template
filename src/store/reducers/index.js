import {
  VisiabilityFilters
} from '../actions'
import {
  combineReducers
} from 'redux'

/**
 * 定义初始音乐列表
 */
const initialMusic = {
  visiabilityFilter: VisiabilityFilters.GET_ALL,
  musics: []
}

/**
 * 添加一条音乐
 * @param {*} state
 * @param {*} action
 */
function getALLMusic(state = [], action) {
  // console.log('..reduces.index.js...getAllMusic', state)
  switch (action.type) {
    case 'GET_ALL':
      return action.musics
    default:
      return state
  }
}

/**
 * 删除一条音乐
 * @param {*} state
 * @param {*} action
 */
function delMusic(state = [], action) {
  return state.length > 0 ? state[0] : state
}

/**
 * 获取首页状态
 */
const getHomeStatus = (state = 0, action) => {
  switch (action.type) {
    case 'HOME_STATUS':
      return action.status
    default:
      return state
  }
}

/**
 * 获取专辑列表
 * @param {} state
 * @param {*} action
 */
const getAlbums = (state = [], action) => {
  switch (action.type) {
    case 'ALBUMS':
      return action.albums
    default:
      return state
  }
}

/**
 * 获取热门歌曲列表
 * @param {*} state
 * @param {*} action
 */
const getHotMusics = (state = [], action) => {
  switch (action.type) {
    case 'HOT_MUSICS':
      return action.musics
    default:
      return state
  }
}

/**
 * 获取热门搜索列表
 * @param {*} state
 * @param {*} action
 */
const getHotSearches = (state = [], action) => {
  // console.log('....reducers...', action)
  switch (action.type) {
    case 'HOT_SEARCHES':
      return action.hots
    default:
      return state
  }
}

/**
 * 获取当前列表中的播放索引
 * @param {*} state 
 * @param {*} action 
 */
const getPlayIndex = (state = 0, action) => {
  switch (action.type) {
    case 'PLAY_INDEX':
      return action.index
    default:
      return state
  }
}

/**
 * 获取当前列表中的播放索引
 * @param {*} state 
 * @param {*} action 
 */
const getPlayList = (state = [], action) => {
  // console.log('...getPlayList....', action)
  switch (action.type) {
    case 'PLAY_LIST':
      return action.musics
    default:
      return state
  }
}

const music = combineReducers({
  getALLMusic,
  delMusic,
  getHomeStatus,
  getAlbums,
  getHotMusics,
  getHotSearches,
  getPlayIndex,
  getPlayList
})

export default music