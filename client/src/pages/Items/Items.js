import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer'
import styles from './styles'
import ItemCard from '../../components/ItemCard';
import ButtonAppBar from '../../components/ButtonAppBar'


const Items = ({ classes }) => {
  return (
<div>
  <ButtonAppBar/>
  <div className={classes.Items}>
  <ItemsContainer>
    {({ itemsData: { items, loading, error } }) => {
      if (loading) {
        return 'loading';
      }
      if (error) {
        return 'error';
      }

      return items.map(item =>(
        <ItemCard item={item}/>
      )
    )
    }}
  </ItemsContainer>
  </div>
</div>
  )
}

export default withStyles(styles)(Items)
