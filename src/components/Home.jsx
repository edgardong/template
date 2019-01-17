import React from 'react'
import '@/assets/css/home'
import { connect } from 'react-redux'
import { changeHomeStatus } from '@/store/actions'
import Recommend from '@/components/Recommend'
import HotMusics from '@/components/HotMusics'
import MusicSearch from '@/components/MusicSearch'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tabIndex: this.props.status || 0
    }
  }

  componentDidUpdate() {
    // console.log('Homne.jsx...', this.props)
    // this.setState({
    //   tabIndex : this.props.status
    // })
  }

  /**
   * 修改Tab的状态
   * @param {Number} state 当前状态
   */
  changeState(index) {
    this.setState({
      tabIndex: index
    })

    // 修改Store中的状态值
    this.props.changeHomeStatus(index)
  }

  render() {
    return (
      <div className="ick-home">
        <div className="ick-home__tabs ick-common__flex">
          {/* 推荐音乐 Recommend */}
          <div
            className="ick-common__flex1 center"
            onClick={e => this.changeState(0)}
          >
            <div
              className={`tab-item ${
                this.state.tabIndex === 0 ? 'active' : ''
              }`}
            >
              推荐音乐
            </div>
          </div>

          {/* 热搜歌曲  Hot search*/}
          <div
            className="ick-common__flex1 center"
            onClick={e => this.changeState(1)}
          >
            <div
              className={`tab-item ${
                this.state.tabIndex === 1 ? 'active' : ''
              }`}
            >
              热歌榜
            </div>
          </div>
          {/* 搜索音乐 Search*/}
          <div
            className="ick-common__flex1 center"
            onClick={e => this.changeState(2)}
          >
            <div
              className={`tab-item ${
                this.state.tabIndex === 2 ? 'active' : ''
              }`}
            >
              搜索
            </div>
          </div>
        </div>

        {/* 内容区域  组件渲染 */}
        {this.state.tabIndex == 0 ? (
          <Recommend />
        ) : this.state.tabIndex == 1 ? (
          <HotMusics />
        ) : this.state.tabIndex == 2 ? (
          <MusicSearch />
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  status: state.getHomeStatus,
})

const mapDispatchToProps = dispatch => ({
  changeHomeStatus: status => dispatch(changeHomeStatus(status))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
