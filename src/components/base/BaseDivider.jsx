import React from 'react'
import './BaseDividerStyle'

export default class BaseDivider extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ick-basedivider">
        <h2 className="ick-basedivider__content">{this.props.name}</h2>
      </div>
    )
  }
}
