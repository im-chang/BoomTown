import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import Icon from '@material-ui/icons/AddCircle'
import { Link } from 'react-router-dom'
const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  }
}

function MenuBar(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="absolute" style={{ boxShadow: 'none' }}>
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
          />

          <Button
            style={{ boxShadow: 'none', backgroundColor: 'transparent' }}
            variant="extendedFab"
            color="inherit"
            component={Link}
            to="/share"
          >
            <Icon style={{ margin: '20px' }}>add_circle</Icon> SHARE SOMETHING
          </Button>
          <IconButton />
        </Toolbar>
      </AppBar>
    </div>
  )
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuBar)
