import React, { Component } from 'react';
import { View, StyleSheet, BackAndroid } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Firebase from 'firebase';

import Metrics from './metrics';
import Toolbar from './components/toolbar/';
import TabIcon from './components/tab-icon';
import Platform from './utils/platform';

// import Intro from './components/intro';
import Intro from './components/intro';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Historial from './components/historial';
import Info from './components/info';
import Profile from './components/profile';

// Development help
// import Template from './utils/template';

export default class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      loading: false,
      connected: false,
    };
    const config = {
      apiKey: 'AIzaSyDEIZswePLhDXFyeXhFwu-toDhcBFr_OeU',
      authDomain: 'aions-42aa0.firebaseapp.com',
      databaseURL: 'https://aions-42aa0.firebaseio.com',
      storageBucket: 'aions-42aa0.appspot.com',
    };
    Firebase.initializeApp(config);
  }

  componentDidMount() {
    if (Platform.Android && !this.state.mounted) {
      BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  goBack() {
    try {
      Actions.pop();
    } catch (err) {
      BackAndroid.exitApp();
    }
    return true;
  }

  render() {
    const noSwipe = {
      panHandlers: null,
    };

    const navbar = {
      navBar: Toolbar,
    };

    const tab = {
      // ...padding,
      ...navbar,
      icon: TabIcon,
      sceneStyle: { paddingBottom: Metrics.NAVBAR_HEIGHT },
    };

    const navTab = {
      ...navbar,
      icon: TabIcon,
      sceneStyle: { paddingBottom: Metrics.NAVBAR_HEIGHT, paddingTop: Metrics.NAVBAR_HEIGHT },
    };

    const noBack = {
      ...noSwipe,
      renderLeftButton: () => <View />,
    };
    return (
      <Router>
        <Scene key="root">
          <Scene key="intro" hideNavBar component={Intro} />
          <Scene key="login" hideNavBar component={Login} />
          <Scene key="main" type="replace" tabs default="AIONS" hideNavBar tabBarStyle={styles.tabbar} {...noBack} >
            <Scene
              key="dashboard" title="Dashboard" tabBarStyle={styles.tabbar}
              image="line-chart" component={Dashboard} {...tab}
            />
            <Scene
              key="history" title="Historial" tabBarStyle={styles.tabbar}
              image="tasks" component={Historial} {...tab}
            />
            <Scene
              key="info" title="Info" tabBarStyle={styles.tabbar}
              image="info" component={Info} {...tab}
            />
            <Scene
              key="profile" title="Profile" tabBarStyle={styles.tabbar}
              image="user" component={Profile} {...tab}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    backgroundColor: '#F9F9F9',
    paddingBottom: -10,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
  },
  title: {
    color: 'white',
  },
});
