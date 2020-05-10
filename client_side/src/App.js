import React from 'react';
import LoginPage from './Components/Pages/LoginPage/LoginPage';
import GamePage from './Components/Pages/GamePage/GamePage';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div dir="rtl" className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/game" component={GamePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
