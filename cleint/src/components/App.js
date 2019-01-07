import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Layout } from 'antd'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import SetupProfile from './SetupProfile'

import history from '../history'
import store from '../redux/store'
import '../css/index.scss'
import 'antd/dist/antd.css';

const Content = Layout.Content

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout className="wrapper">
            <Content className="content">
              <div id="App" className="App">
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/onboarding" component={SetupProfile} />
              </div>
            </Content>
          </Layout>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
