import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import Button from 'react-native-button';
import renderIf from 'render-if';
import Icon from 'react-native-vector-icons/FontAwesome';
import Firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { Colors } from '../../styles';

/*
  Component life-cycle:
  https://facebook.github.io/react/docs/component-specs.html
 */

export default class Login extends Component {

  static get defaultProps() {
    return {
      message: 'Template',
    };
  }


  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      creating: false,
      connecting: false,
    };

    // ES6 bindings
    // See: https://facebook.github.io/react/docs/reusable-components.html#es6-classes
    // See: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#es6-classes
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signUp() {
    if (this.state.password === this.state.confirmPassword) {
      const auth = Firebase.auth();
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
        user.updateProfile({
          displayName: this.state.name,
        }).then(Actions.main(user)); }, error => {
        this.setState({ error });
      });
    }
  }

  signIn() {
    Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
      Actions.main(user);
    }, error => {
      this.setState({ error });
    });
  }

  render() {
    const { name, email, password, confirmPassword, creating, connecting, error } = this.state;
    // console.log(name, email, password);
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
          style={styles.logoApp}
        />
        <Text style={styles.title}>
          AIONS
        </Text>
        {renderIf(creating)(() =>
          <View style={styles.row}>
            <Icon name="user" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              autoCorrect={false}
              autoCapitalize="words"
              placeholderTextColor={Colors.GRAY}
              returnKeyType="next"
              clearButtonMode="while-editing"
              keyboardType="default"
              onChangeText={text => this.setState({ name: text })}
              value={name}
              editable={!connecting}
              onSubmitEditing={() => this.refs.emailInput.focus()}
            />
          </View>
        )}

        <View style={styles.row}>
          <Icon name="envelope-o" style={styles.icon} />
          <TextInput
            ref="emailInput"
            style={styles.input}
            placeholder="user@email.com"
            autoCorrect={false}
            autoCapitalize="none"
            placeholderTextColor={Colors.GRAY}
            returnKeyType="next"
            clearButtonMode="while-editing"
            keyboardType="email-address"
            onChangeText={text => this.setState({ email: text })}
            value={email}
            editable={!connecting}
            onSubmitEditing={() => this.refs.passwordInput.focus()}
          />
        </View>
        <View style={styles.row}>
          <Icon name="lock" style={styles.icon} />
          <TextInput
            ref="passwordInput"
            style={styles.input}
            placeholder="password"
            autoCapitalize="none"
            placeholderTextColor={Colors.GRAY}
            returnKeyType="send"
            clearButtonMode="while-editing"
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            value={password}
            editable={!connecting}
            onSubmitEditing={() => creating ? this.refs.passwordConfirmInput.focus() : this.signIn()}
          />
        </View>
        {renderIf(creating)(() =>
          <View style={styles.row}>
            <Icon name="lock" style={styles.icon} />
            <TextInput
              ref="passwordConfirmInput"
              style={styles.input}
              placeholder="confirm password"
              autoCapitalize="none"
              placeholderTextColor={Colors.GRAY}
              returnKeyType="send"
              clearButtonMode="while-editing"
              secureTextEntry
              onChangeText={text => this.setState({ confirmPassword: text })}
              value={confirmPassword}
              editable={!connecting}
              onSubmitEditing={() => this.signUp()}
            />
          </View>
        )}

        <Button
          style={styles.buttonText}
          containerStyle={styles.button}
          styleDisabled={{ color: Colors.GRAY }}
          disabled={connecting}
          onPress={creating ? this.signUp : this.signIn}
        >
          {connecting ? 'Connecting...' : (creating ? 'Join' : 'Log in')}
        </Button>


        <Text style={styles.link} onPress={() => this.setState({ creating: !this.state.creating })}>
          {creating ? 'Already have an account?' : 'New here? Create an account'}
        </Text>

        {renderIf(error)(() =>
          <Text style={styles.error}>{error.message}</Text>
        )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column', // row, column
    // flexWrap: 'nowrap' // wrap, nowrap
    alignItems: 'center', // flex-start, flex-end, center, stretch
    // alignSelf: 'auto', // auto, flex-start, flex-end, center, stretch
    justifyContent: 'center', // flex-start, flex-end, center, space-between, space-around
    // position: 'relative', // absolute, relative
    backgroundColor: 'purple',
    // margin: 0,
    // padding: 0,
    // right: 0,
    // top: 0,
    // left: 0,
    // bottom: 0,
  },
  logoApp: {
    width: 400,
    height: 400,
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 2,
  },
  body: {
    paddingTop: 5,
    marginVertical: 22,
    borderTopWidth: 1,
    borderColor: Colors.GRAY,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 50,
    color: Colors.MAIN,
    textAlign: 'center',
    fontWeight: '200',
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 8,
    marginBottom: 2,
  },
  icon: {
    fontSize: 30,
    color: Colors.GRAY,
    marginHorizontal: 10,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    // color: Colors.WHITE,
  },
});
