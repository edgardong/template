import React from 'react'
import { withRouter } from 'react-router-dom'
import '@/assets/css/musicsearch.styl'
import { getHotSearch, getSearchSuggest, searchMusic } from '@/api'
import { connect } from 'react-redux'
import { addHotSearches } from '@/store/actions'

class MusicSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hots: this.props.hots, // 热搜词
      searchs: [], // 本地搜索历史
      searchSuggest: [], // 搜索建议
      queryValue: '', // 搜索关键词
      musics: [], // 搜索结果
      status: 0 // 当前状态 0:搜索热词 1:搜索建议 2:搜索结果
    }
  }

  componentDidMount() {
    // 设置本地搜索历史
    let searchs = localStorage.getItem('ICKSEARCHLIST')
    if (searchs) {
      this.setState({
        searchs: JSON.parse(searchs)
      })
    }

    if (this.state.hots.length > 0) {
      return
    }
    // 设置热门搜索
    getHotSearch().then(resp => {
      this.props.addHotSearches(resp.data.result.hots)
      this.setState({
        hots: resp.data.result.hots
      })
    })
  }

  /**
   * 缓存搜索关键字到本地，
   * @param {String} value 搜索关键字
   */
  setSearchList(value) {
    let searchList = this.state.searchs.concat()
    let curIndex = searchList.indexOf(value)
    if (curIndex > -1) {
      searchList.splice(curIndex, 1)
    }
    searchList.unshift(value)
    searchList = searchList.slice(0, 10)

    this.setState({
      searchs: searchList
    })
    localStorage.setItem('ICKSEARCHLIST', JSON.stringify(searchList))
  }

  /**
   * 移除搜索历史
   * @param {Number} index 搜索历史索引
   */
  removeHistory(e, index) {
    e.preventDefault()
    let searchList = this.state.searchs.concat()
    searchList.splice(index, 1)

    this.setState({
      searchs: searchList
    })
    localStorage.setItem('ICKSEARCHLIST', JSON.stringify(searchList))
  }

  /**
   * 设置默认状态
   */
  setDefaultStatus() {
    this.setState({
      status: 0,
      musics: []
    })

    this.handleSearchFocus()
  }

  /**
   * 重置默认条件
   */
  handleClearQeruy() {
    this.setState({
      queryValue: ''
    })

    this.setDefaultStatus()
  }

  /**
   * 输入框聚焦
   */
  handleSearchFocus() {
    this.refs.input.focus()
  }

  /**
   * 处理搜索建议
   * @param {event} e 搜索事件
   */
  handleSearchSuggest(e) {
    this.setState({
      queryValue: e.target.value
    })

    if (e.target.value == '') {
      this.setState({
        searchSuggest: {}
      })
      this.setDefaultStatus()
      return
    }
    let params = {
      keywords: e.target.value
    }
    // 显示搜索建议
    this.setState({
      status: 1,
      musics: []
    })

    getSearchSuggest(params).then(resp => {
      this.setState({
        searchSuggest: resp.data.result
      })
    })
  }

  /**
   * 处理搜索事件
   * @param {event} e 键盘事件
   */
  handleSearchMusic(e) {
    this.setState({
      queryValue: e.target.value
    })
    this.handleSearch(e.target.value)
  }

  handleSearch(value) {
    // console.log('here....')
    if (value == '') {
      this.setDefaultStatus()
      return
    }

    this.setState({
      status: 2,
      queryValue: value
    })

    let params = {
      keywords: value
    }
    // 设置搜索历史
    this.setSearchList(value)
    searchMusic(params).then(resp => {
      // console.log(resp.data.result.songs)
      this.setState({
        musics: resp.data.result.songs
      })
      // console.log(this.state)
    })
  }

  /**
   * 处理键盘按下事件
   * @param {Object} e 键盘事件
   */
  handleKeyPress(e) {
    if (e.keyCode == 13) {
      this.handleSearchMusic(e)
    }
  }

  render() {
    return (
      <div className="ick-musicsearch">
        <div className="input-wrapper">
          <div className="input-cover">
            <i className="iconfont icon-sousuo" />
            <input
              autoFocus
              ref="input"
              onKeyUp={e => this.handleKeyPress(e)}
              // onBlur={e => this.handleSearchMusic(e)}
              // onFocus={e => this.handleSearchSuggest(e)}
              onChange={e => this.handleSearchSuggest(e)}
              value={this.state.queryValue}
              type="search"
              className="search"
              placeholder="搜索歌曲、歌手、专辑"
            />
            {this.state.queryValue == '' ? (
              ''
            ) : (
              <i
                className="iconfont icon-guanbi1"
                onClick={e => this.handleClearQeruy()}
              />
            )}
          </div>
        </div>

        {this.state.status == 0 ? (
          <div>
            <div className="hots-wrapper">
              <h3 className="search-title">热门搜索</h3>
              <div className="hot-items">
                {this.state.hots.map(item => {
                  return (
                    <span
                      key={item.first}
                      className="hot-item"
                      onClick={e => this.handleSearch(item.first)}
                    >
                      {item.first}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="ick-searchlist">
              {this.state.searchs.map((search, index) => {
                return (
                  <div className="search-item ick-common__flex" key={search}>
                    <i className="iconfont iconfont-left icon-shijianzhong" />
                    <div className="search-left ick-common__flex">
                      <span
                        className="search-name"
                        onClick={e => this.handleSearch(search)}
                      >
                        {search}
                      </span>
                      <i
                        className="iconfont iconfont-right icon-guanbi"
                        onClick={e => this.removeHistory(e, index)}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : this.state.status == 1 ? (
          <div>
            {/* 搜索建议 */}
            <div className="ick-search__suggest">
              <div
                className="suggest-main"
                onClick={e => this.handleSearch(this.state.queryValue)}
              >
                搜索“{this.state.queryValue}”
              </div>
              {this.state.searchSuggest.songs
                ? this.state.searchSuggest.songs.map(item => {
                    return (
                      <div
                        key={item.id}
                        className="suggest-item ick-common__flex"
                        onClick={e => this.handleSearch(item.name)}
                      >
                        <i className="iconfont icon-sousuo" />
                        <span className="item-name">{item.name}</span>
                      </div>
                    )
                  })
                : ''}
            </div>
          </div>
        ) : this.state.status == 2 ? (
          <div className="ick-searchresult">
            {this.state.musics
              ? this.state.musics.map((music, index) => {
                  return (
                    <div
                      key={music.id}
                      className="result-item ick-common__flex"
                      onClick={e => {
                        this.props.history.push({
                          pathname: `/musicdetail/${music.id}`,
                          state: {
                            id: music.id
                          }
                        })
                      }}
                    >
                      <div className="result-wrapper">
                        <div className="result-name">{music.name}</div>
                        <div className="result-info">
                          <span className="sq" />
                          {music.artists.map(art => art.name).join('/') +
                            '-' +
                            music.album.name}
                        </div>
                      </div>
                      <div className="player">
                        <span className="player-icon" />
                      </div>
                    </div>
                  )
                })
              : ''}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  hots: state.getHotSearches
})

const mapDispatchToProps = dispatch => ({
  addHotSearches: hots => dispatch(addHotSearches(hots))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MusicSearch)
)
