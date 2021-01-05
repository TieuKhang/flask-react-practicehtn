import React from 'react'
import logo from './logo.svg';
import './App.css';
import {Todo} from './components/Todo';
import {Show} from './components/Show';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Todo/>
          </Route>
          <Route path='/:id'>
            <Show/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
