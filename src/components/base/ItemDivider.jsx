import React from 'react'
import './ItemDividerStyle.styl'

export default class ItemDivider extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h3 className="ick-itemdivider"> {this.props.name}</h3>
    )
  }
}