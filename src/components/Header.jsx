import React from 'react'
import '@/assets/css/header'
import '@/assets/images/logo.svg'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ick-header">
        <div className="ick-header__img">
          <svg className="ick-logo">
            <use xlinkHref="#logo" />
          </svg>
          <span className="ick-name">破冰云音乐</span>
        </div>
        <span className="ick-header__download">下载APP</span>
      </div>
    )
  }
}
