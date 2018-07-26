import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Items from '../pages/Items/Items'
import Profile from '../pages/Profile/Profile'
import Share from '../pages/Share/Share'
import Welcome from '../pages/Home/Home'

export default () => (
  <Fragment>
      <Switch>
          <Route exact path="/welcome" exact component={Welcome}/>
          <Route path="/items" component={Items} />
          <Route path="/profile" component={Profile} />
          <Route path="/profile/:userid" component={Profile} />
          <Route path="/share" component={Share} />
        <Redirect from="/old" to="/new"/>
        
      </Switch>
  </Fragment>
)
