import React from 'react'
import Gravatar from 'react-gravatar'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core'
import styles from './styles'

const ProfileCard = ({ classes, user }) => (
  <Card className={classes.root}>
    <CardHeader
      avatar={<Gravatar email={user.email} />}
      title={<Typography>{user.fullname}</Typography>}
    />

    <CardContent>
      <Typography component="p">
        <strong>{user.items.length} </strong>
        {`Items Shared`}
        <strong>{user.borrowed.length}</strong>
        {`Items Borrowed`}
      </Typography>

      <Typography component="p">{user.bio}</Typography>
    </CardContent>
  </Card>
)

export default withStyles(styles)(ProfileCard)
