import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Items from '../pages/Items/Items'
import Profile from '../pages/Profile/Profile'
import Share from '../pages/Share/Share'
import Home from '../pages/Home/Home'
import { ViewerContext } from '../context/ViewerProvider'
import MenuBar from '../components/MenuBar'
export default () => (
  <ViewerContext.Consumer>
    {({ loading, viewer, error }) => {
      if (loading) return 'hello'
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" name="home" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        )
      }
      return (
        <React.Fragment>
          <MenuBar />
          <Switch>
            <Route exact path="/items" component={Items} />

            <Route exact path="/share" component={Share} />

            <Route exact path="/profile" component={Profile} />

            <Route exact path="/profile/:userid" component={Profile} />

            <Redirect to="/items" component={Items} />
          </Switch>
        </React.Fragment>
      )
    }}
  </ViewerContext.Consumer>
)
