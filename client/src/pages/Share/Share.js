import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <div>
      <ShareItemForm />
      <p>
        This is the share page located at <code>/share</code>.
      </p>
    </div>
  )
}

export default withStyles(styles)(Share)
