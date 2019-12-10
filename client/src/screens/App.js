import React, { Component } from 'react';
import AlertForm from './AlertForm';
import AlertList from './AlertList';
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={AlertList} />
          <Route path="/alert" component={AlertForm} />
          <Route path="/alert/:id" component={AlertForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
