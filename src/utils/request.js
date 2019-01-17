import axios from 'axios'

/**
 * Http Get 请求
 * @param {String} apiUrl 请求地址
 * @param {Object} params 请求参数
 */
export function get(apiUrl, params) {
  return axios.get(apiUrl, {
    params
  })
}

/**
 * Http Post 请求
 * @param {String} apiUrl 请求地址
 * @param {Object} data 请求参数
 */
export function post(apiUrl, data) {
  return axios.post(apiUrl, data)
}