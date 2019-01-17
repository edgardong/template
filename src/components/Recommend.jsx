import React from 'react'
import '@/assets/css/recommend'
import { withRouter } from 'react-router-dom'
// import { Button } from 'antd-mobile'
import { Toast } from 'antd-mobile'
import BaseDivider from '@/components/base/BaseDivider'
import { getRecommendList, getMusicList } from '@/api'
import MusicItems from '@/components/base/MusicItem'
import { connect } from 'react-redux'
import { addMusics, addAlbums } from '@/store/actions'

class Recommend extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: this.props.albums,
      musicList: this.props.musics
    }
  }

  // 生命周期函数
  componentDidMount() {
    let params = {
      before: 1503639064232,
      limit: 6
    }

    // console.log('recommend.jsx....', this.props)

    if (this.props.albums.length <= 0) {
      Toast.loading('正在加载数据...', 0)
      getRecommendList(params).then(resp => {
        // console.log(resp.data.playlists)
        this.props.addAlbums(resp.data.playlists)
        // console.log(this.props)
        // console.log(addMusics)
        // console.log(this.store)
        Toast.hide()

        this.setState({
          list: resp.data.playlists
        })
      })
    }

    if (this.state.musicList.length <= 0) {
      getMusicList().then(resp => {
        this.props.addMusic(resp.data.result)
        this.setState({
          musicList: resp.data.result
        })
      })
    }
  }

  render() {
    return (
      <div className="ick-recommend">
        <div className="ick-recommend__content">
          <BaseDivider name="推荐歌单" />

          <div className="remd_songs ick-common__flex">
            {this.state.list.map(item => {
              return (
                <div
                  key={item.id}
                  className="remd_item"
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/albumlist/${item.id}`,
                      state: {
                        id: item.id
                      }
                    })
                  }}
                >
                  <div className="ick-common__flex">
                    <img src={item.coverImgUrl} className="remd_img" />
                    <span className="remd_count">
                      {item.playCount > 10000
                        ? (item.playCount % 10000) + '万'
                        : item.playCount}
                    </span>
                  </div>
                  <p className="remd_desc">{item.description}</p>
                </div>
              )
            })}
          </div>
          {/* <Button type="primary">你好呀</Button> */}
          <BaseDivider name="最新音乐" />

          {/* 最新音乐列表 */}
          <div className="ick-music__list">
            <MusicItems sq list={this.state.musicList} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  // console.log('mapStateToProps.....', state)
  return { musics: state.getALLMusic, albums: state.getAlbums }
}

const mapDispatchToProps = dispatch => {
  return {
    addMusic: musics => dispatch(addMusics(musics)),
    addAlbums: albums => dispatch(addAlbums(albums))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Recommend)
)
