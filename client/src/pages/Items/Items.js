import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer'
import styles from './styles'
import ItemCard from '../../components/ItemCard';


const Items = ({ classes }) => {
  return (
<div>
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
  )
}

export default withStyles(styles)(Items)
