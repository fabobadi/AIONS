import React, { Component } from 'react';
import { View, StyleSheet, BackAndroid } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Metrics from './metrics';
import Toolbar from './components/toolbar/';
import TabIcon from './components/tab-icon';
import Platform from './utils/platform';

// import Intro from './components/intro';
import Login from './components/login';

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
          <Scene key="login" hideNavBar component={Login} />
          {/* <Scene
            key="main"
            tabs
            hideNavBar
            default="Grappe"
            direction="vertical"
            tabBarStyle={styles.tabbar}
            // {...noBack}
          /> */}
        </Scene>
        {/* Set this to 'initial' to see it */}
        {/* <Scene key="template" component={Template} title="Template" navigationBarStyle={styles.transparent} /> */}
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
