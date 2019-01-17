import React from 'react'
import './MusicItemStyle.styl'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPlayIndex, addPlayList } from '@/store/actions'

class MusicItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ick-musicitem">
        {this.props.list.map((item, index) => {
          return (
            <div
              key={item.id}
              className="music-item ick-common__flex"
              onClick={() => {
                // console.log(this)
                this.props.addPlayList(this.props.list)
                this.props.addPlayIndex(index)
                this.props.history.push({
                  pathname: `/musicdetail/${item.id}`,
                  state: {
                    id: item.id
                  }
                })
              }}
            >
              {this.props.rank ? (
                <div
                  className={`music-rank ${
                    this.props.ranktop && this.props.ranktop > index
                      ? 'ranktop'
                      : ''
                  }`}
                >
                  {index + 1}
                </div>
              ) : (
                ''
              )}
              <div className="music-left">
                <div className="music-name ick-common__thide">
                  {' '}
                  <span className="name">{item.name}</span>
                  <span className="more ick-common__thide">
                    {item.song
                      ? item.song.alias.join('')
                      : item.alia
                      ? item.alia.join('')
                      : ''}
                  </span>{' '}
                </div>
                <div className="ick-common__flex">
                  {this.props.sq ? <span className="music-info" /> : ''}
                  <span className="ick-common__thide mini-font">
                    {item.song
                      ? item.song.artists
                          .map(art => {
                            return art.name
                          })
                          .join('/') +
                        ' - ' +
                        item.song.album.name
                      : item.ar.map(art => art.name).join('') +
                        ' - ' +
                        item.al.name}
                  </span>
                </div>
              </div>
              <div className="music-button ick-common__flex">
                <span className="basebg music-player" />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addPlayList: musics => dispatch(addPlayList(musics)),
  addPlayIndex: index => dispatch(addPlayIndex(index))
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MusicItem)
)
