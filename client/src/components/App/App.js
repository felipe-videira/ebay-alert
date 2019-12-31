import './App.scss';

import React, { Component } from 'react';
import AlertForm from '../AlertForm';
import AlertList from '../AlertList';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const { Header, Content, Footer } = Layout

class App extends Component {

  render () {
    return (
      <Layout className="app">
        <Header className="app__header">Ebay Alert</Header>
        <Content className="app__content">
          <BrowserRouter>
            <Switch>
              <Route exact strict path="/" component={AlertList} />
              <Route exact strict path="/alert" component={AlertForm} />
              <Route exact strict path="/alert/:id" component={AlertForm} />
            </Switch>
          </BrowserRouter>
        </Content>
        <Footer className="app__footer"></Footer>
      </Layout>
    );
  }
}

export default App;
