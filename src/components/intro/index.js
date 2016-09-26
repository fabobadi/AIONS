import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';

export default class Intro extends Component {

  static get defaultProps() {
    return {
      message: 'Template',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      timer: true,
    };

    // ES6 bindings
    // See: https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    // See: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#es6-classes
    this.checkUser = this.checkUser.bind(this);
  }

  componentWillMount() {
    setTimeout(() => this.checkUser(), 2000);
  }

  checkUser() {
    Firebase.auth().onAuthStateChanged(user => {
      console.log('user: ', user);
      this.setState({ timer: false });
      if (user) {
        setTimeout(() => Actions.main({ user }), 2500);
      }
      else {
        setTimeout(() => Actions.login(), 2500);
      }
    });
  }

  render() {
    const { timer } = this.state;
    return (
      <View style={styles.container}>
        <Animatable.Image
          source={require('../../img/logo.png')}
          animation={timer ? 'fadeInUp' : 'zoomOut'}
          resizemode={'stretch'}
        />
      </View>
    );
  }
}

/*
  See: https://facebook.github.io/react/docs/reusable-components.html#prop-validation
 */
// TemplateComponent.propTypes = {
//   message: React.PropTypes.string,
// };

/*
  See: https://facebook.github.io/react-native/docs/flexbox.html
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column', // row, column
    // flexWrap: 'nowrap' // wrap, nowrap
    alignItems: 'center', // flex-start, flex-end, center, stretch
    // alignSelf: 'auto', // auto, flex-start, flex-end, center, stretch
    justifyContent: 'center', // flex-start, flex-end, center, space-between, space-around
    // position: 'relative', // absolute, relative
    // backgroundColor: 'white',
    // margin: 0,
    // padding: 0,
    // right: 0,
    // top: 0,
    // left: 0,
    // bottom: 0,
  },
});
