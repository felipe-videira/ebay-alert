import './App.scss';

import { Layout } from 'antd';
import AlertForm from '../AlertForm';
import AlertList from '../AlertList';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const { Header, Content } = Layout

class App extends Component {

  render () {
    return (
      <Layout className="app">
        <Header className="app__header">
          {this.props.t('title')}
        </Header>
        <Content className="app__content">
          <BrowserRouter>
            <Switch>
              <Route exact strict path="/" component={AlertList} />
              <Route exact strict path="/alert" component={AlertForm} />
              <Route exact strict path="/alert/:id" component={AlertForm} />
            </Switch>
          </BrowserRouter>
        </Content>
      </Layout>
    );
  }
}

export default withTranslation()(App);
