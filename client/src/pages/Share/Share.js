import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <div className={classes.body}>
      <div className={classes.SharePage}>
        <div className={classes.SharePreview}>
          <ShareItemPreview />
        </div>
        <div className={classes.ShareForm}>
          <ShareItemForm />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(Share)
