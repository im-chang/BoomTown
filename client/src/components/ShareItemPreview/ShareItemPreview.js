import ItemCard from '../ItemCard'
import { connect } from 'react-redux'
import React from 'react'

const ShareItemPreview = props => {
  return <ItemCard item={props.shareItemPreview} />
}

const mapStatetoProps = state => {
  return {
    shareItemPreview: state.shareItemPreview
  }
}

export default connect(mapStatetoProps)(ShareItemPreview)
