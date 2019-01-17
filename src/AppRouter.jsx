import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import asyncComponent from './asyncImport'

const asyncApp = asyncComponent(() => import('@/App'))
const asyncAlbumList = asyncComponent(() => import('@/components/AlbumList'))
const asyncMusicDetail = asyncComponent(() =>
  import('@/components/MusicDetail')
)

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={asyncApp} />
          <Route path="/albumlist/:id" component={asyncAlbumList} />
          <Route path="/musicdetail/:id" component={asyncMusicDetail} />
        </div>
      </Router>
    )
  }
}
