import {
  get,
  post
} from '@/utils/request'
import APIAddress from './config'

/**
 * 获取推荐类别列表
 * @param {Object} params 参数集合
 */
export function getRecommendList(params) {
  return get(APIAddress.RecommendList, params)
}

/**
 * 获取推荐音乐列表
 */
export function getMusicList(params) {
  return get(APIAddress.MusicList, params)
}

/**
 * 获取专辑歌曲列表
 */
export function getAlbumDetail(params) {
  return get(APIAddress.AlbumList, params)
}

/**
 * 获取专辑评论
 */
export function getAlbumComments(params) {
  return get(APIAddress.AlbumComments, params)
}

/**
 * 获取热歌列表
 */
export function getHotMusics(params) {
  return get(APIAddress.HotMusics, params)
}

/**
 * 获取热搜词
 */
export function getHotSearch() {
  return get(APIAddress.HotSearch)
}

/**
 * 获取搜索建议
 * @param {Object} params 参数
 */
export function getSearchSuggest(params) {
  return get(APIAddress.SearchSuggest, params)
}

/**
 * 搜索歌曲
 * @param {Object} params 参数
 */
export function searchMusic(params) {
  return get(APIAddress.Search, params)
}

/**
 * 获取音乐详情
 * @param {Object} params 参数
 */
export function getMusicDetail(params) {
  return get(APIAddress.MusicDetail, params)
}

/**
 * 获取专辑详情
 * @param {Object} params 参数
 */
export function getAlbumInfo(params) {
  return get(APIAddress.AlbumDetail, params)
}

/**
 * 获取音乐地址
 * @param {Object} params 参数
 */
export function getMusicUrl(params) {
  return get(APIAddress.MusicUrl, params)
}

/**
 * 获取音乐歌词
 * @param {Object} params 参数
 */
export function getMusicLyric (params) {
  return get(APIAddress.MusicLyric,params)
}