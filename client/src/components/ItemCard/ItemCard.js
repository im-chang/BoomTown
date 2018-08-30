import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardHeader } from '@material-ui/core'
import Image from 'material-ui-image'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import styles from './style'

class ItemCard extends Component {
  render() {
    const { classes, item } = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={item.imageurl}
            title={item.title}
            key={item.id}
          />
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title={item.itemowner.fullname}
            subheader={moment(item.created).fromNow()}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {item.title}
            </Typography>
            <Typography variant="caption" gutterBottom align="start" />
            <Typography gutterBottom variant="sub-heading">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="secondary">
              Borrow
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ItemCard)
