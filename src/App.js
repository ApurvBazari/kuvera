import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import List from './pages/list'
import Details from './pages/fund'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <List />
          </Route>
          <Route path="/explore/:fundCode">
            <Details />
          </Route>
          <Route path="/explore">
            <List />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
