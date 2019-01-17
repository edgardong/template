import React from 'react'
import { getHotMusics } from '@/api'
import '@/assets/css/hotmusics.styl'
import { Toast } from 'antd-mobile'
import MusicItem from '@/components/base/MusicItem'
import { addHotMusics } from '@/store/actions'
import { connect } from 'react-redux'

class HotMusics extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: this.props.musics // 热歌列表
    }
  }

  // 组件生命周期
  componentDidMount() {
    if (this.state.list.length > 0) {
      return
    }
    Toast.loading('正在加载数据...', 0)
    getHotMusics({ idx: 1 }).then(resp => {
      // console.log(resp.data)
      this.props.addHotMusics(resp.data.playlist.tracks)
      this.setState({
        list: resp.data.playlist.tracks
      })

      Toast.hide()
    })
  }

  getCurrentTime() {
    let date = new Date()
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }

  render() {
    return (
      <div className="ick-hotmusics">
        <div className="hotmusics-header ">
          <div className="bg-wrapper ick-commomn__absolute0">
            <div className="hot-bg bg-img" />
            <span className="hot-time">更新日期：{this.getCurrentTime()}</span>
          </div>
        </div>

        {/* 列表区域 */}
        <div className="musics-wrapper">
          {this.state.list ? (
            <MusicItem sq ranktop={3} rank list={this.state.list} />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  musics: state.getHotMusics
})

const mapDispatchToProps = dispatch => ({
  addHotMusics: musics => dispatch(addHotMusics(musics))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotMusics)
