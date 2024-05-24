import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './Components/Home'
import ProtectedRoute from './Components/protectedRoute'
import CourseItemDetails from './Components/CourseItemDetails'
import NotFound from './Components/NotFound'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/courses/:id"
          component={CourseItemDetails}
        />
        <Route path="/bad-path" component={NotFound} />
        <Redirect to="/bad-path" />
      </Switch>
    )
  }
}

export default App
