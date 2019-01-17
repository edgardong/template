// 音乐专辑列表
import React from 'react'
import { withRouter } from 'react-router-dom'
import { getAlbumDetail, getAlbumComments } from '@/api'
import '@/assets/css/album.styl'
import '@/assets/fonts/iconfont.less'
import ItemDivider from '@/components/base/ItemDivider'
import MusicItems from '@/components/base/MusicItem'

export default withRouter(
  class AlbumList extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        id: '',
        album: {
          playlist: {}
        },
        albumComments: {},
        descStatus: false
      }
    }
    // 生命周期函数
    componentDidMount() {
      let params = this.props.match.params
      // console.log(params)
      this.setState({
        id: params.id
      })

      // 获取专辑信息
      getAlbumDetail(params).then(resp => {
        this.setState({
          album: resp.data
        })
      })

      // 获取专辑评论列表
      getAlbumComments(params).then(resp => {
        // console.log(resp.data)
        this.setState({
          albumComments: resp.data
        })
      })
    }

    formatTime(time) {
      let curTime = new Date(time)
      return `${curTime.getFullYear()}年${curTime.getMonth() +
        1}月${curTime.getDate()}日`
    }

    render() {
      return (
        <div className="ick-albumlist">
          <div className="ick-album__header">
            <div className="album-content ablum-bg" />
            <div className="album-wrapper ick-common__flex">
              {/* 封面图片 */}
              {this.state.album.playlist ? (
                <img
                  src={this.state.album.playlist.coverImgUrl}
                  className="cover-image"
                />
              ) : (
                ''
              )}

              <div className="album-desc">
                {/* 专辑名称  初吻给了BY2  */}
                {this.state.album.playlist ? (
                  <h2 className="album-name">
                    {this.state.album.playlist.name}
                  </h2>
                ) : (
                  ''
                )}
                <div className="album-logo">
                  <div className="album-avatar">
                    <img
                      src="http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.webp?imageView&thumbnail=60x0&quality=75&tostatic=0&type=webp"
                      className="album-avatar__img"
                    />
                    <span className="avatar-icon icon-bg" />
                  </div>
                  破冰云音乐
                </div>
              </div>
            </div>
          </div>

          {/* 专辑介绍区域 */}
          <div className="ick-album__intro">
            <div className="album-tags">
              <div className="label-items">
                <span className="label">标签：</span>
                {this.state.album.playlist.tags
                  ? this.state.album.playlist.tags.map(item => (
                      <span className="tag-item" key={item}>
                        {item}
                      </span>
                    ))
                  : ''}
              </div>
              <p className="desc">
                <span
                  onClick={() => {
                    this.setState({
                      descStatus: !this.state.descStatus
                    })
                  }}
                  className={`ick-common__thide desc__info ${
                    this.state.descStatus ? '' : 'zankai'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: this.state.album.playlist
                      ? '简介：' + this.state.album.playlist.description
                      : '简介：'
                  }}
                />
              </p>
            </div>
          </div>

          <ItemDivider name="歌曲列表" />

          <div className="ick-album__tracks">
            {this.state.album.playlist.tracks ? (
              <MusicItems list={this.state.album.playlist.tracks} rank />
            ) : (
              ''
            )}
          </div>

          <ItemDivider name="精彩评论" />

          {/* 评论区域 */}
          <div className="ick-album__comments">
            {this.state.albumComments.hotComments
              ? this.state.albumComments.hotComments.map((comment, index) => {
                  return (
                    <div className="comment-item" key={comment.commentId}>
                      <div className="user-avatar">
                        <img
                          src={comment.user.avatarUrl}
                          className="avatar-img"
                        />
                      </div>
                      <div className="comment-wrapper ick-common__flex1">
                        <div className="comment-user">
                          {comment.user.nickname}
                          <div className="comment-date">
                            {this.formatTime(comment.time)}
                          </div>
                        </div>
                        <span className="like-count">
                          {comment.likedCount}
                          <i className="icon iconfont icon-dianzan" />
                        </span>
                        <div className="comment-content">{comment.content}</div>
                      </div>
                    </div>
                  )
                })
              : ''}
          </div>
        </div>
      )
    }
  }
)
