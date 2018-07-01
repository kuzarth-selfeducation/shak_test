import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Main from 'pages/Main';
import Refill from 'pages/Refill';
import logo from './logo.svg';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="app">
        <Header className="app__header">
          <Link to="/">
            <p style={{ color: '#fff' }}>
              <img src={logo} width={40} alt="Logo" />
              Payment terminal
            </p>
          </Link>
        </Header>
        <Content className="app__content">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/refill/:id" component={Refill} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Content>
        <Footer>
          <p style={{ textAlign: 'center', margin: 0 }}>
            Payment terminal © {new Date().getFullYear()}
          </p>
        </Footer>
      </Layout>
    );
  }
}

export default App;
