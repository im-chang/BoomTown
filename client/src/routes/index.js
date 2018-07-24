import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Items from '../pages/Items/Items'
import Profile from '../pages/Profile/Profile'
import Share from '../pages/Share/Share'
import Welcome from '../pages/Home/Home'

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
      <Switch>
          <Route exact path="/welcome" exact component={Welcome}/>
          <Route path="/items" component={Items} />
          {/* <Route exact path="/items" exact component={(props) => <div>many items here</div>} /> */}
          <Route path="/profile" component={Profile} />
          <Route path="/profile/:userid" component={Profile} />
          <Route path="/share" component={Share} />
        <Redirect from="/old" to="/new"/>
          {/* <Route path="/new" component={New} /> */}
        
      </Switch>
  </Fragment>
)
