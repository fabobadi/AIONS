import React, { Component } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../styles';
import Loading from '../loading';
import Firebase from 'firebase';

/*
  Component life-cycle:
  https://facebook.github.io/react/docs/component-specs.html
 */

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentUser: [],
    };
    this.fetchUser = this.fetchUser.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.fetchUser();
  }

  fetchUser() {
    const currentUser = Firebase.auth().currentUser;
    console.log(currentUser);
    this.setState({ currentUser, loading: false });
  }

  render() {
    const { currentUser, loading } = this.state;
    if (loading) {
      return (<View style={styles.loading}><Loading /></View>);
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.image} source={{ uri: 'http://placehold.it/400x400' }} />
          <Text style={styles.name}>{currentUser.displayName}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>
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
const SIZE = 140;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MAIN,
  },
  header: {
    alignItems: 'center',

    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    padding: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    marginTop: 130,
    paddingTop: 80,
    backgroundColor: Colors.WHITE,
  },
  image: {
     // justifyContent: 'center',
     // margin: 20,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 8,
    margin: 7,
    borderColor: Colors.WHITE,
  },
  name: {
    fontSize: 22,
    fontWeight: '200',
    backgroundColor: 'transparent',
  },
  email: {
    fontSize: 12,
    fontWeight: '100',
    color: 'grey',
    backgroundColor: 'transparent',
  },
});
