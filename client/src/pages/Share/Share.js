import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ShareItemForm from '../../components/ShareItemForm/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'
import ButtonAppBar from '../../components/ButtonAppBar'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <div>
      <ButtonAppBar/>
      <div className={classes.SharePage}>
      <ShareItemPreview/>
      <ShareItemForm/>
      </div>
    </div>
  )
}

export default withStyles(styles)(Share)
