import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer'
import styles from './styles'
import ItemCard from '../../components/ItemCard'
import { Grid } from '@material-ui/core'

const Items = ({ classes }) => {
  return (
    <div className={classes.body}>
      <div className={classes.Items}>
        <Grid
          container
          align="center"
          justify="center"
          className={classes.root}
        >
          <ItemsContainer>
            {({ itemsData: { loading, error, items } }) => {
              console.log(items)
              if (loading) return 'loading'
              if (error) return 'error'
              return items.map(item => (
                <Grid
                  item
                  key={item.id}
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.itemCard}
                >
                  <ItemCard item={item} />
                </Grid>
              ))
            }}
          </ItemsContainer>
        </Grid>
      </div>
    </div>
  )
}

export default withStyles(styles)(Items)
