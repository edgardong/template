import React from 'react'
import '@/assets/css/musicdetail.styl'
import { withRouter } from 'react-router-dom'
import { getMusicDetail, getMusicUrl, getMusicLyric } from '@/api'
import logo from '@/assets/images/album_logo.jpeg'
import { connect } from 'react-redux'
import { addPlayIndex } from '@/store/actions'
import '@/assets/fonts/iconfont.less'

class MusicDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      music: {},
      musicUrl: '',
      lyric: [],
      timespan: 0,
      lyricText: '', // 当前显示的歌词
      rotateDeg: 0, // 旋转角度
      playStatus: 0, // 播放状态 0： 正在播放 1：已暂停 2：已停止  3：已播放完毕
      transformHeight: 0,
      musics: this.props.musics,
      playIndex: this.props.playIndex,
      playModel: 0 // 0: 顺序播放 1: 随机播放 2:单曲循环 3:列表循环
    }
  }

  // 组件卸载时候，停止音乐播放，停止定时器
  componentWillUnmount() {
    this.refs.audioplayer.load()
    clearInterval(this.interval)
  }

  // 组件生命周期
  componentDidMount() {
    this.initPlay()
  }

  /**
   * 调整播放模式
   */
  changePlayModel = index => {
    // 0: 顺序播放 1: 随机播放 2:单曲循环 3:列表循环
    let nextIndex = ++index
    let playModel = nextIndex > 3 ? 0 : nextIndex
    this.setState({
      playModel: playModel
    })
  }

  // 开始播放
  initPlay = id => {
    this.setState({
      playStatus: 0
    })
    this.refs.currenttimeline.style.width = '0'
    this.refs.currenttimeline.style.animationName = 'none'
    // 音乐Id
    let musicId = id || this.props.match.params.id

    // 获取音乐详情
    getMusicDetail({ ids: musicId }).then(resp => {
      // console.log(resp.data.songs[0])
      this.setState({
        music: resp.data.songs[0]
      })

      // 获取音乐url地址
      getMusicUrl({ id: resp.data.songs[0].id }).then(mreps => {
        // console.log(mreps.data.data[0])
        this.setState({
          musicUrl: mreps.data.data[0].url
        })

        // 开始播放音乐
        this.refs.audioplayer.play()
        this.nextIndexStatus = 0
        this.lyricIndex = 0
        this.musicCurrentTime = 0
        // 设置开始播放的时间线的宽度为0
        // this.refs.currenttimeline.style.width = '100%'
        this.refs.currenttimeline.style.animationName = 'lineToFull'
      })
    })

    // 获取音乐歌词
    getMusicLyric({ id: musicId }).then(ricResp => {
      let lyric = ricResp.data.lrc.lyric
      // console.log(lyric)
      let lyricArr = lyric.split('\n')
      // [00:41.791] 仍无可避免
      let tmpArr = []
      lyricArr.forEach(ly => {
        if (ly && ly.length > 0 && ly !== '') {
          let regExp = new RegExp(/\[(\d{1,2})\:(\d{1,2})\.(\d{1,3})](.*)/)
          let arr = regExp.exec(ly)
          if (arr && arr.length > 0) {
            // arr[1] 分
            // arr[2] 秒
            // arr[3] 毫秒
            // console.log('....' + arr[1] + '.....' + arr[2] + '....' + arr[3])
            let key =
              (Number(arr[1]) * 60 + Number(arr[2])) * 1000 + Number(arr[3])
            // console.log(key)
            let value = arr[4].trimLeft()

            value
              ? tmpArr.push({
                  key: key,
                  value: value,
                  time: `${arr[1]}:${arr[2]}`
                })
              : null
          }
        }
      })
      // console.log(tmpArr)
      // let regExp = new RegExp(/\[\d*:\d*\.\d*\]/)
      // let regExp = new RegExp(/\[(\d{2})\:(\d{2})\.(\d{3})\](.*)/)
      this.setState({
        lyric: tmpArr
      })
    })

    // 开始旋转图片
    this.interval = setInterval(this.rotate, 10)
    // 设置当前播放状态为正在播放
    this.setState({
      playStatus: 0,
      rotateDeg: 0
    })
  }

  lyricIndex = 0 // 当前显示的歌词的索引
  lyricScrollHeight = 0
  // 设置定时器Id
  interval = 0
  // 设置获取是否已经获得下一首Id的状态
  nextIndexStatus = 0
  // 歌曲播放时间
  musicDuration = ''
  musicCurrentTime = ''

  formatSecondsToMinute = seconds => {
    let min = parseInt(seconds / 60)
    let secs = Math.floor(seconds % 60)
    return (min < 10 ? '0' + min : min) + ':' + (secs < 10 ? '0' + secs : secs)
  }

  /**
   * 设置旋转
   */
  rotate = () => {
    // 1. 歌曲播放完毕，停止图片旋转，停止定时器 ，清除所有默认状态
    // 2. 歌曲播放中， 定时器启动，图片旋转  根据当前播放时间查找对应需要现实的歌词
    // 3. 歌曲暂停  停止计时器
    // 获取歌词信息
    if (!this.refs.audioplayer) {
      return // 没有播放器的时候，不旋转
    }
    let currentTime = this.refs.audioplayer.currentTime
    let duration = this.refs.audioplayer.duration
    this.musicDuration = duration
    this.musicCurrentTime = this.formatSecondsToMinute(currentTime)

    // 歌曲播放完毕
    if (currentTime >= duration && this.nextIndexStatus == 0) {
      this.setState({
        timespan: 0,
        lyricText: '', // 当前显示的歌词
        rotateDeg: 0, // 旋转角度
        playStatus: 3, // 播放状态 0： 正在播放 1：已暂停 2：已停止  3：已播放完毕
        transformHeight: 0
      })

      // 播放完毕，停止播放
      clearInterval(this.interval) // 清除旋转定时器任务

      this.lyricIndex = 0 // 当前显示的歌词的索引
      this.lyricScrollHeight = 0
      this.handleCheckPlayStatus(3)
    } else {
      // 设置旋转角度
      this.setState({
        rotateDeg: this.state.rotateDeg + 3.5
      })

      // 歌词滚动可见区域距离顶部的高度
      this.lyricScrollHeight = this.refs.lyricscroll.offsetTop
      let currentLyricDoms = document.querySelectorAll('.music-lyric')

      let currentLyricDom = currentLyricDoms[this.lyricIndex]
      // 如果没有当前元素，不做任何操作
      if (!currentLyricDom) {
        return
      }
      // let lastIndex = Math.max(0, this.lyricIndex - 1)
      // 滚动的高度
      let transformHeight = currentLyricDom.offsetTop
      // + currentLyricDoms[lastIndex].offsetHeight
      this.setState({
        transformHeight: transformHeight
      })

      // 获取需要展示的行距离 可见歌词区域的高度
      if (this.lyricIndex >= this.state.lyric.length) {
        return
      }
      let currentTimeSpan = Number(currentTime) * 1000 // 转换为毫秒

      // 当前句还在唱~~~~~~~
      if (
        !this.state.lyric[this.lyricIndex] ||
        currentTimeSpan < this.state.lyric[this.lyricIndex].key
      ) {
        return
      }
      // 如果下一句歌词没有，就是最后一句了 返回
      if (!this.state.lyric[this.lyricIndex + 1] || currentTimeSpan <= 0) {
        return
      }
      // 获取下一句歌词所在的索引
      if (
        this.state.lyric[this.lyricIndex].key <= currentTimeSpan &&
        this.state.lyric[this.lyricIndex + 1].key > currentTimeSpan
      ) {
        // this.state.lyricText =
        let currentLyric = this.state.lyric[this.lyricIndex].value
        // console.log(currentLyric)

        this.setState({
          lyricText: currentLyric
        })
      } else {
        this.lyricIndex++
      }
    }
  }

  getRandomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  /**
   * 获取下一首音乐的索引
   */
  getNextMusicIndex(direction) {
    // direction 1: 默认：下一曲 -1  上一曲
    direction = direction == undefined ? 1 : direction
    // 0: 顺序播放 1: 随机播放 2:单曲循环 3:列表循环
    let playModel = this.state.playModel
    if (playModel == 2) {
      direction = 0
    } else if (playModel == 1) {
      direction = this.getRandomNumber(
        this.state.musics.length - 1 - this.state.playIndex,
        0
      )
    }
    // 顺序播放的下一首
    return this.state.playIndex + direction
  }

  /**
   * 播放上一首歌曲
   */
  playLastMusic() {}

  /**
   * 播放下一首歌曲
   */
  playNextMusic(direction) {
    // 如果只有一首歌曲，不做处理
    if (this.state.musics.length <= 1) {
      return
    }
    //
    if (
      this.state.playIndex < this.state.musics.length - 1 &&
      this.nextIndexStatus <= 0
    ) {
      this.nextIndexStatus = 1
      this.lyricIndex = 0 //清除默认歌词索引
      this.lyricScrollHeight = 0 // 清楚默认歌词滚动高度

      let nextIndex = this.getNextMusicIndex(direction)
      this.props.addPlayIndex(nextIndex)
      this.setState({
        playIndex: nextIndex
      })
      let item = this.state.musics[nextIndex]

      // 播放新歌曲
      this.initPlay(item.id)
      return
    }
  }

  /**
   * 切换播放状态
   */
  handleCheckPlayStatus(status) {
    if (status == 1) {
      // 暂停播放
      this.refs.audioplayer.pause()
      this.refs.currenttimeline.style.animationPlayState = 'paused'
      clearInterval(this.interval)
    } else if (status == 3) {
      this.lyricIndex = 0 //清除默认歌词索引
      this.lyricScrollHeight = 0 // 清楚默认歌词滚动高度
      // 播放完毕,继续播放下一首歌曲
      // console.log('即将播放的歌曲索引', this.state.playIndex)

      // console.log('......nextIndexStatus。。。。。', this.nextIndexStatus)
      // 如果播放状态不是已经停止播放, 返回
      if (this.state.playStatus !== 3) {
        return
      }
      // console.log(this.state.musics)
      if (
        this.state.playIndex < this.state.musics.length - 1 &&
        this.nextIndexStatus <= 0
      ) {
        this.nextIndexStatus = 1

        let nextIndex = this.getNextMusicIndex()
        this.props.addPlayIndex(nextIndex)
        this.setState({
          playIndex: nextIndex
        })
        let item = this.state.musics[nextIndex]

        // 播放新歌曲
        this.initPlay(item.id)
        return
      }
    } else {
      this.refs.audioplayer.play()
      this.refs.currenttimeline.style.animationPlayState = 'running'
      this.interval = setInterval(this.rotate, 10)
    }
    this.setState({
      playStatus: status
    })
  }

  render() {
    return (
      // url(${this.state.music.al.picUrl})
      <div>
        <div
          className={`ick-musicdetail`}
          style={{
            backgroundImage: this.state.music.al
              ? `url(${this.state.music.al.picUrl})`
              : ''
          }}
        />
        <audio ref="audioplayer" src={this.state.musicUrl} />
        <div className="music-wrapper ">
          {/* logo 区域 */}
          <div className="ick-logo ick-common__flex">
            <img src={logo} className="logo-img" />
            破冰云音乐
          </div>

          <div className="song-wrapper">
            <div className="song-disc">
              <div className="song-turn">
                <div className="song-img">
                  <img
                    style={{
                      transform: 'rotate(' + this.state.rotateDeg / 20 + 'deg)'
                    }}
                    src={this.state.music.al ? this.state.music.al.picUrl : ''}
                    className="u-img"
                  />
                </div>
                {/* 播放按钮部分 */}
                {/* <div className="player ick-common__flex">
                  {this.state.playStatus == 0 ? (
                    <i
                      className="iconfont icon-player icon-suspend_icon"
                      onClick={e => this.handleCheckPlayStatus(1)}
                    />
                  ) : this.state.playStatus == 1 ? (
                    <i
                      className="iconfont icon-player icon-bofang"
                      onClick={e => this.handleCheckPlayStatus(0)}
                    />
                  ) : (
                    <i
                      className="iconfont icon-player icon-yitingzhi"
                      onClick={e => this.handleCheckPlayStatus(0)}
                    />
                  )}
                </div> */}
              </div>
            </div>
          </div>

          <div className="ick-music__info">
            <h2 className="music-name_author">
              <b>{this.state.music.name}</b> -{' '}
              <span>
                {this.state.music.ar
                  ? this.state.music.ar.map(item => item.name).join('/')
                  : ''}
                {/* {this.lyricIndex} */}
              </span>
            </h2>

            {/* 滚动歌词区域 */}
            <div className="ick-music__lyric">
              <div
                className="lyric-scroll"
                ref="lyricscroll"
                style={{
                  transform: 'translateY(-' + this.state.transformHeight + 'px)'
                }}
              >
                {this.state.lyric.length > 0
                  ? this.state.lyric.map((lyr, index) => {
                      return (
                        <div
                          key={index}
                          datasrouce={`${index} ${lyr.time}`}
                          ref={index == this.lyricIndex ? 'currentlyric' : ''}
                          className={`music-lyric ${
                            index == this.lyricIndex ? 'current' : ''
                          }`}
                        >
                          {lyr ? lyr.value : null}
                        </div>
                      )
                    })
                  : ''}
              </div>
            </div>
          </div>

          {/* 音乐播放时间线 */}
          <div className="ick-music__timeline ick-common__flex">
            <span className="time start-time ">{this.musicCurrentTime}</span>
            <span className="time-line ick-common__flex1">
              <span
                ref="currenttimeline"
                className="time-line__current"
                style={{
                  animation: `lineToFull ${parseInt(
                    this.musicDuration
                  )}s linear`
                }}
              />
            </span>
            <span className="time end-time ">
              {this.formatSecondsToMinute(this.musicDuration)}
            </span>
          </div>

          {/* 音乐播放控制部分 */}
          <div className="ick-music__control">
            {/* 查看歌曲按钮 */}
            <i className="iconfont iconfont-small icon-liebiao" />
            {/* 上一首按钮 */}
            <i
              onClick={e => this.playNextMusic(-1)}
              className="iconfont iconfont-small icon-shangyishou"
            />
            {/* 0: 播放中显示暂停 其他,显示播放 */}
            {this.state.playStatus == 0 ? (
              <i
                onClick={e => this.handleCheckPlayStatus(1)}
                className="iconfont iconfont-center icon-suspend_icon"
              />
            ) : (
              <i
                onClick={e => this.handleCheckPlayStatus(0)}
                className="iconfont iconfont-center icon-bofang"
              />
            )}
            {/* 下一首 按钮 */}
            <i
              onClick={e => this.playNextMusic()}
              className="iconfont iconfont-small icon-xiayishou"
            />
            {/* 随机播放按钮  // 0: 顺序播放 1: 随机播放 2:单曲循环 3:列表循环 */}
            {this.state.playModel == 0 ? (
              <i
                onClick={e => this.changePlayModel(0)}
                className="iconfont iconfont-small icon-shunxubofang"
              />
            ) : this.state.playModel == 1 ? (
              <i
                onClick={e => this.changePlayModel(1)}
                className="iconfont iconfont-small icon-suijibofang"
              />
            ) : this.state.playModel == 2 ? (
              <i
                onClick={e => this.changePlayModel(2)}
                className="iconfont iconfont-small icon-danquxunhuan"
              />
            ) : this.state.playModel == 3 ? (
              <i
                onClick={e => this.changePlayModel(3)}
                className="iconfont iconfont-small icon-liebiaoxunhuan"
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  musics: state.getPlayList,
  playIndex: state.getPlayIndex
})

const mapDispatchToProps = dispatch => ({
  addPlayIndex: index => dispatch(addPlayIndex(index))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MusicDetail)
)
