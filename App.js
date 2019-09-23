import React, { Component } from 'react';
import { AppState, View, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import store from './store';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ChatRoom from './screens/ChatRoom';
import { loadMessages } from './actions/messages/subscribe'

export default class App extends Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
    YellowBox.ignoreWarnings(['Remote debugger']);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log(nextAppState, this.state)
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      store.dispatch(loadMessages());
    }
    this.setState({appState: nextAppState});
  }

  render() {
    YellowBox.ignoreWarnings(['Warning: ReactNative.createElement'])
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="signIn" component={SignIn} renderBackButton={()=>(null)} title="Sign In" initial={true} />
            <Scene key="signUp" component={SignUp} renderBackButton={()=>(null)} title="Sign Up" />
            <Scene key="chatRoom" component={ChatRoom} renderBackButton={()=>(null)} title=" Chat Room" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}