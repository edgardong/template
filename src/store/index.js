import MuiscStore from './reducers'
import { createStore } from 'redux'

let store = createStore(MuiscStore)

// console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() =>
  console.log('store变化。。。。',store.getState())
)

export default store