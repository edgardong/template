import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import MuiscStore from './store'

// 引入公用样式
import '@/assets/css/common'
import '@/assets/css/reset'

// 引入项目路由
import AppRouter from '@/AppRouter'

// let store = createStore(MuiscStore)

// console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
// const unsubscribe = store.subscribe(() =>
//   console.log('store监控重心。。。。',store.getState())
// )

render(
  <Provider store={MuiscStore}>
    <AppRouter />
  </Provider>,
  document.getElementById('app')
)
